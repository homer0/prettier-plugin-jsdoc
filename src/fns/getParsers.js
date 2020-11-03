const R = require('ramda');
const commentParser = require('comment-parser');
const babelParser = require('prettier/parser-babel');
const flowParser = require('prettier/parser-flow');
const tsParser = require('prettier/parser-typescript');
const { isMatch } = require('./utils');
const { formatDescription } = require('./formatDescription');
const { formatTags } = require('./formatTags');
const { formatTagsTypes } = require('./formatTagsTypes');
const { prepareTags } = require('./prepareTags');
const { render } = require('./render');
const { get, provider } = require('./app');
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
const isComment = (node) =>
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
const matchesBlock = (node) =>
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
 */
const generateCommentData = (comment) => {
  const {
    loc: {
      start: { column },
    },
  } = comment;
  const [block] = commentParser(`/*${comment.value}*/`, {
    dotted_names: false,
  });

  return {
    comment,
    block,
    column,
  };
};

/**
 * Checks if the tag that tells the plugin to ingore the comment is present.
 *
 * @param {ParsingInformation} info  The parsed information of the comment.
 * @returns {boolean}
 */
const hasIgnoreTag = (info) =>
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
const hasNoTags = (info) =>
  R.compose(R.equals(0), R.path(['block', 'tags', 'length']))(info);

/**
 * Checks whether or not a comment should be ignored.
 *
 * @param {ParsingInformation} info  The parsed information of the comment.
 * @returns {boolean}
 */
const shouldIgnoreComment = (info) =>
  R.anyPass([get(hasNoTags), get(hasIgnoreTag)])(info);

/**
 * A function that formats the block and/or tags on a comment before being processed and
 * rendered.
 *
 * @callback CommentFormatterFn
 * @param {ParsingInformation} info  The parsed information of the comment.
 * @returns {ParsingInformation}
 */

/**
 * A function that will recieve a validated, parsed and formatted comment. The idea is for
 * the function to actually do the final changes and update the AST.
 *
 * @callback CommentProcessorFn
 * @param {ParsingInformation} info  The parsed information of the comment.
 */

/**
 * @callback ProcessCommentsFn
 * @param {Array}              nodes        The list comments found on the AST.
 * @param {CommentFormatterFn} formatterFn  The function that formats and prepares the
 *                                          parsed information so it can be processed.
 * @param {CommentProcessorFn} processorFn  The function that processed the comments after
 *                                          they are validated, parsed and formatted.
 */

/**
 * @type {ProcessCommentsFn}
 */
const processComments = R.curry((nodes, formatterFn, processorFn) =>
  R.compose(
    R.forEach(
      R.compose(
        R.ifElse(shouldIgnoreComment, R.identity, processorFn),
        formatterFn,
        get(generateCommentData),
      ),
    ),
    R.filter(R.allPass([get(isComment), get(matchesBlock)])),
  )(nodes),
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
const formatCommentBlock = R.curry((options, info) =>
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
 * @returns {ParsingInformation}
 */

/**
 * @type {FormatCommentTagsFn}
 */
const formatCommentTags = R.curry((options, info) =>
  R.compose(
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
const prepareCommentTags = R.curry((options, info) =>
  R.compose(
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
const getRenderer = (options) => {
  const renderer = get(render)(options);
  return (column, block) => {
    const padding = ' '.repeat(column + 1);
    const prefix = `${padding}* `;
    const lines = renderer(column, block);

    if (lines.length === 1 && options.jsdocUseInlineCommentForASingleTagBlock) {
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
const createParser = (originalParser, checkExtendOption) => (text, parsers, options) => {
  const ast = originalParser(text, parsers, options);
  if (
    options.jsdocPluginEnabled &&
    (!checkExtendOption || !options.jsdocPluginExtended)
  ) {
    const formatter = R.compose(
      get(prepareCommentTags)(options),
      get(formatCommentTags)(options),
      get(formatCommentBlock)(options),
    );
    const renderer = getRenderer(options);

    if (ast.comments && ast.comments.length) {
      get(processComments)(ast.comments, formatter, (info) => {
        const { comment, column, block } = info;
        comment.value = renderer(column, block);
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
const extendParser = R.curry((parser, checkExtendOption) => ({
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
const getParsers = (checkExtendOption) => {
  const useExtendParser = get(extendParser)(R.__, checkExtendOption);
  return {
    get babel() {
      return useExtendParser(babelParser.parsers.babel);
    },
    get 'babel-flow'() {
      return useExtendParser(babelParser.parsers['babel-flow']);
    },
    get 'babel-ts'() {
      return useExtendParser(babelParser.parsers['babel-ts']);
    },
    get flow() {
      return useExtendParser(flowParser.parsers.flow);
    },
    get typescript() {
      return useExtendParser(tsParser.parsers.typescript);
    },
  };
};

module.exports.getParsers = getParsers;
module.exports.createParser = createParser;
module.exports.isComment = isComment;
module.exports.matchesBlock = matchesBlock;
module.exports.generateCommentData = generateCommentData;
module.exports.hasIgnoreTag = hasIgnoreTag;
module.exports.hasNoTags = hasNoTags;
module.exports.shouldIgnoreComment = shouldIgnoreComment;
module.exports.processComments = processComments;
module.exports.formatCommentBlock = formatCommentBlock;
module.exports.formatCommentTags = formatCommentTags;
module.exports.prepareCommentTags = prepareCommentTags;
module.exports.getRenderer = getRenderer;
module.exports.extendParser = extendParser;
module.exports.provider = provider('getParsers', module.exports);
