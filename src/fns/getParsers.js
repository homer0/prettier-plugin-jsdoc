import { parsers as babelParsers } from 'prettier/parser-babel';
import { parsers as flowParsers } from 'prettier/parser-flow';
import { parsers as tsParsers } from 'prettier/parser-typescript';
import * as R from 'ramda';
import { parse as commentParser } from 'comment-parser';
import { isMatch, composeWithPromise, reduceWithPromise } from './utils.js';
import { formatDescription } from './formatDescription.js';
import { formatTags } from './formatTags.js';
import { formatTagsTypes } from './formatTagsTypes.js';
import { prepareTags } from './prepareTags.js';
import { render } from './render';
import { get, createProvider } from './app.js';
/**
 * @typedef {import('../types').PrettierParser} PrettierParser
 * @typedef {import('../types').PrettierParseFn} PrettierParseFn
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 * @typedef {import('../types').CommentBlock} CommentBlock
 */

/**
 * Validates whether an AST node is a valid comment block or not.
 *
 * @param {Object} node  The node to validate.
 * @returns {boolean}
 */
export const isComment = (node) =>
  R.compose(R.includes(R.__, ['CommentBlock', 'Block']), R.prop('type'))(node);

/**
 * @typedef {Object} LocationCoordinates
 * @property {number} column  The column on the AST.
 */

/**
 * @typedef {Object} CommentNodeLocation
 * @property {LocationCoordinates} start  The coordinates of where the block starts.
 */

/**
 * @typedef {Object} CommentNode
 * @property {string}              value  The content of the block. Without the leading
 *                                        `/*` and trailing `*\/`.
 * @property {CommentNodeLocation} loc    The location of the block on the AST.
 */

/**
 * Validates whether a comment block is formatted like a JSDoc block.
 *
 * @param {CommentNode} node  The node to validate.
 * @returns {boolean}
 */
export const matchesBlock = (node) =>
  R.compose(
    get(isMatch)(/\/\*\*[\s\S]+?\*\//),
    (value) => `/*${value}*/`,
    R.prop('value'),
  )(node);

/**
 * @typedef {Object} ParsingInformation
 * @property {CommentNode}  comment  The original AST node for the comment.
 * @property {CommentBlock} block    The information of the block and the tags.
 * @property {number}       column   The column where the block should start.
 */

/**
 * Generates the information needed to format a comment.
 *
 * @param {CommentNode} comment  The AST of the comment that will be formatted.
 * @returns {ParsingInformation}
 * @todo Update hotfix for the comment parser with a more Ramda-like approach.
 */
export const generateCommentData = (comment) => {
  const {
    loc: {
      start: { column },
    },
  } = comment;
  const commentText = comment.value
    .replace(/^(\s*\*\s*@[a-z]+){/gim, (_, group) => `${group} {`)
    .replace(/(\s*\*\s*@[a-z]+\s+\{.*?\})\n(\s*\*)\s*(\w+)(?:\n|$)/gi, '$1 $3\n$2');
  const [block] = commentParser(`/*${commentText}*/`, {
    dotted_names: false,
    spacing: 'preserve',
  });

  block.description = block.description.trim();
  block.tags = block.tags.map((tag) => ({
    ...tag,
    description: tag.description.replace(/^\s+$/, ''),
  }));

  return {
    comment,
    block,
    column,
  };
};

/**
 * Checks if the tag that tells the plugin to ignore the comment is present.
 *
 * @param {ParsingInformation} info  The parsed information of the comment.
 * @returns {boolean}
 */
export const hasIgnoreTag = (info) =>
  R.compose(
    R.any(R.propSatisfies(R.equals('prettierignore'), 'tag')),
    R.path(['block', 'tags']),
  )(info);

/**
 * Checks if a comment is empty or not (it doesn't have tags).
 *
 * @param {ParsingInformation} info  The parsed information of the comment.
 * @returns {boolean}
 */
export const hasNoTags = (info) =>
  R.compose(R.equals(0), R.path(['block', 'tags', 'length']))(info);

/**
 * Checks whether or not a comment should be ignored.
 *
 * @callback ShouldIgnoreCommentFn
 * @param {PrettierOptions}    options  The options sent to the plugin.
 * @param {ParsingInformation} info     The parsed information of the comment.
 */

/**
 * @type {ShouldIgnoreCommentFn}
 */
export const shouldIgnoreComment = R.curry((options, info) =>
  R.allPass([
    R.anyPass([get(hasNoTags), get(hasIgnoreTag)]),
    R.always(!options.jsdocExperimentalFormatCommentsWithoutTags),
  ])(info),
);

/**
 * A function that formats the block and/or tags on a comment before being processed and
 * rendered.
 *
 * @callback CommentFormatterFn
 * @param {ParsingInformation} info  The parsed information of the comment.
 * @returns {ParsingInformation}
 */

/**
 * A function that will receive a validated, parsed and formatted comment. The idea is for
 * the function to actually do the final changes and update the AST.
 *
 * @callback CommentProcessorFn
 * @param {ParsingInformation} info  The parsed information of the comment.
 */

/**
 * @callback ProcessCommentsFn
 * @param {PrettierOptions}    options      The options sent to the plugin.
 * @param {Array}              nodes        The list comments found on the AST.
 * @param {CommentFormatterFn} formatterFn  The function that formats and prepares the
 *                                          parsed information so it can be processed.
 * @param {CommentProcessorFn} processorFn  The function that processed the comments after
 *                                          they are validated, parsed and formatted.
 */

/**
 * @type {ProcessCommentsFn}
 */
export const processComments = R.curry(
  async (options, nodes, formatterFn, processorFn) => {
    const useNodes = nodes.filter(R.allPass([get(isComment), get(matchesBlock)]));
    const shouldIgnoreFn = shouldIgnoreComment(options);
    const generateCommentDataFn = get(generateCommentData);
    return get(reduceWithPromise)(useNodes, async (node) => {
      const info = generateCommentDataFn(node);
      const formatted = await formatterFn(info);
      const shouldIgnore = await shouldIgnoreFn(formatted);
      if (shouldIgnore) {
        return formatted;
      }

      return processorFn(formatted);
    });
  },
);

/**
 * Runs all the formatting functions that require the context of a comment block, not only
 * the tags. For example, formats the block main description.
 *
 * @callback FormatCommentBlockFn
 * @param {PrettierOptions}    options  The options sent to the plugin.
 * @param {ParsingInformation} info     The parsed information of the comment.
 * @returns {ParsingInformation}
 */

/**
 * @type {FormatCommentBlockFn}
 */
export const formatCommentBlock = R.curry((options, info) =>
  R.compose(
    R.mergeRight(info),
    R.assocPath(['block'], R.__, {}),
    get(formatDescription)(R.__, options),
    R.prop('block'),
  )(info),
);

/**
 * Runs all the formatting functions for a block tags.
 *
 * @callback FormatCommentTagsFn
 * @param {PrettierOptions}    options  The options sent to the plugin.
 * @param {ParsingInformation} info     The parsed information of the comment.
 * @returns {Promise<ParsingInformation>}
 */

/**
 * @type {FormatCommentTagsFn}
 */
export const formatCommentTags = R.curry((options, info) =>
  get(composeWithPromise)(
    R.assocPath(['block', 'tags'], R.__, info),
    get(formatTagsTypes)(R.__, options, info.column),
    get(formatTags)(R.__, options),
    R.path(['block', 'tags']),
  )(info),
);

/**
 * Runs all the formatting functions that prepare the block tags in order to be rendered.
 * They're not together with the other formatting functions because the "prepare
 * functions" can change properties just for the rendering. For example, an optional
 * parameter would end up with a name `[name]`.
 *
 * @callback PrepareCommentTagsFn
 * @param {PrettierOptions}    options  The options sent to the plugin.
 * @param {ParsingInformation} info     The parsed information of the comment.
 * @returns {ParsingInformation}
 */

/**
 * @type {PrepareCommentTagsFn}
 */
export const prepareCommentTags = R.curry((options, info) =>
  get(composeWithPromise)(
    R.assocPath(['block', 'tags'], R.__, info),
    get(prepareTags)(R.__, options, info.column),
    R.path(['block', 'tags']),
  )(info),
);

/**
 * @callback RenderBlockFn
 * @param {number}       column  The column where the comment should start.
 * @param {CommentBlock} block   The information of the block to render.
 * @returns {string}
 */

/**
 * Generates the render function that will be called for each block in order to get the
 * formatted comment.
 *
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @returns {RenderBlockFn}
 */
export const getRenderer = (options) => {
  const renderer = get(render)(options);
  return (column, block) => {
    const padding = ' '.repeat(column + 1);
    const prefix = `${padding}* `;
    const lines = renderer(column, block);

    if (
      lines.length === 1 &&
      options.jsdocUseInlineCommentForASingleTagBlock &&
      (block.tags.length > 0 ||
        !options.jsdocExperimentalIgnoreInlineForCommentsWithoutTags)
    ) {
      return `* ${lines[0]} `;
    }

    const useLines = lines.map((line) => `${prefix}${line}`).join('\n');

    return `*\n${useLines}\n${padding}`;
  };
};

/**
 * Generates the parser that will modify the comments.
 *
 * @param {PrettierParseFn} originalParser     The Prettier built in parser the plugin
 *                                             will use to extract the AST.
 * @param {boolean}         checkExtendOption  Whether or not to check for the option that
 *                                             tells the plugin that it's being extended.
 * @returns {PrettierParseFn}
 */
export const createParser =
  (originalParser, checkExtendOption) => async (text, parsers, options) => {
    const ast = originalParser(text, parsers, options);
    if (
      options &&
      options.jsdocPluginEnabled &&
      (!checkExtendOption || !options.jsdocPluginExtended)
    ) {
      const formatter = get(composeWithPromise)(
        get(prepareCommentTags)(options),
        get(formatCommentTags)(options),
        get(formatCommentBlock)(options),
      );
      const renderer = get(getRenderer)(options);
      if (ast.comments && ast.comments.length) {
        await get(processComments)(options, ast.comments, formatter, (info) => {
          const { comment, column, block } = info;
          const value = renderer(column, block);
          comment.value = value;
          return info;
        });
      }
    }

    return ast;
  };

/**
 * Extends an existing parser using one generated by {@link createParser}.
 *
 * @callback ExtendParserFn
 * @param {PrettierParser} parser             The original parser.
 * @param {boolean}        checkExtendOption  Whether or not the parser should check the
 *                                            option that tells the plugin that it's being
 *                                            extended.
 * @returns {PrettierParser}
 */

/**
 * @type {ExtendParserFn}
 */
export const extendParser = R.curry((parser, checkExtendOption) => ({
  ...parser,
  parse: get(createParser)(parser.parse, checkExtendOption),
}));

/**
 * A dictionary with the supported parsers the plugin can use.
 *
 * @param {boolean} [checkExtendOption]  Whether or not, the function that creates the
 *                                       parsers should check for the option that tells
 *                                       the plugin that it's being extended.
 * @returns {Object.<string, PrettierParser>}
 */
export const getParsers = (checkExtendOption) => {
  const useExtendParser = get(extendParser)(R.__, checkExtendOption);
  return {
    get babel() {
      return useExtendParser(babelParsers.babel);
    },
    get typescript() {
      return useExtendParser(tsParsers.typescript);
    },
    /* istanbul ignore next */
    get 'babel-flow'() {
      return useExtendParser(babelParsers['babel-flow']);
    },
    /* istanbul ignore next */
    get 'babel-ts'() {
      return useExtendParser(babelParsers['babel-ts']);
    },
    /* istanbul ignore next */
    get flow() {
      return useExtendParser(flowParsers.flow);
    },
  };
};

export const provider = createProvider('getParsers', {
  isComment,
  matchesBlock,
  generateCommentData,
  hasIgnoreTag,
  hasNoTags,
  shouldIgnoreComment,
  processComments,
  formatCommentBlock,
  formatCommentTags,
  prepareCommentTags,
  getRenderer,
  createParser,
  extendParser,
  getParsers,
});
