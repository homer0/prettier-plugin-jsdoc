const R = require('ramda');
const commentParser = require('comment-parser');
const { isMatch } = require('./utils');
const { formatDescription } = require('./formatDescription');
const { formatTags } = require('./formatTags');
const { formatTagsTypes } = require('./formatTagsTypes');
const { prepareTags } = require('./prepareTags');
const { render } = require('./render');

/**
 * @typedef {import('../types').PrettierParseFn} PrettierParseFn
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 * @typedef {import('../types').CommentBlock} CommentBlock
 */

/**
 * Validates whether an AST node is a valid comment block or not.
 *
 * @callback IsCommentFn
 * @param {Object} node  The node to validate.
 * @returns {boolean}
 */

/**
 * @type {IsCommentFn}
 */
const isComment = R.compose(
  R.includes(R.__, ['CommentBlock', 'Block']),
  R.prop('type'),
);

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
 * @property {string}              value  The content of the block. Without the leading `/*` and
 *                                        trailing `*\/`.
 * @property {CommentNodeLocation} loc    The location of the block on the AST.
 */

/**
 * Validates whether a comment block is formatted like a JSDoc block.
 *
 * @callback MatchesBlockFn
 * @param {CommentNode} node  The node to validate.
 * @returns {boolean}
 */

/**
 * @type {MatchesBlockFn}
 */
const matchesBlock = R.compose(
  isMatch(/\/\*\*[\s\S]+?\*\//),
  (value) => `/*${value}*/`,
  R.prop('value'),
);

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
 * @callback HasIgnoreTagFn
 * @param {ParsingInformation} info  The parsed information of the comment.
 * @returns {boolean}
 */

/**
 * @type {HasIgnoreTagFn}
 */
const hasIgnoreTag = R.compose(
  R.any(R.propSatisfies(R.equals('prettierignore'), 'tag')),
  R.path(['block', 'tags']),
);

/**
 * Checks if a comment is empty or not (it doesn't have tags).
 *
 * @callback HasNoTagsFn
 * @param {ParsingInformation} info  The parsed information of the comment.
 * @returns {boolean}
 */

/**
 * @type {HasNoTagsFn}
 */
const hasNoTags = R.compose(
  R.equals(0),
  R.path(['block', 'tags', 'length']),
);

/**
 * Checks whether or not a comment should be ignored.
 *
 * @callback ShouldIgnoreCommentFn
 * @param {ParsingInformation} info  The parsed information of the comment.
 * @returns {boolean}
 */

/**
 * @type {ShouldIgnoreCommentFn}
 */
const shouldIgnoreComment = R.anyPass([hasNoTags, hasIgnoreTag]);

/**
 * A function that formats the block and/or tags on a comment before being processed and
 * rendered.
 *
 * @callback CommentFormatterFn
 * @param {ParsingInformation} info  The parsed information of the comment.
 * @returns {ParsingInformation}
 */

/**
 * A function that will recieve a validated, parsed and formatted comment. The idea is for the
 * function to actually do the final changes and update the AST.
 *
 * @callback CommentProcessorFn
 * @param {ParsingInformation} info  The parsed information of the comment.
 */

/**
 * @callback ProcessCommentsFn
 * @param {Array}              nodes        The list comments found on the AST.
 * @param {CommentFormatterFn} formatterFn  The function that formats and prepares the parsed
 *                                          information so it can be processed.
 * @param {CommentProcessorFn} processorFn  The function that processed the comments after they
 *                                          are validated, parsed and formatted.
 */

/**
 * @type {ProcessCommentsFn}
 */
const processComments = R.curry((nodes, formatterFn, processorFn) => R.compose(
  R.forEach(R.compose(
    R.ifElse(
      shouldIgnoreComment,
      R.identity,
      processorFn,
    ),
    formatterFn,
    generateCommentData,
  )),
  R.filter(R.and(isComment, matchesBlock)),
)(nodes));

/**
 * Runs all the formatting functions that require the context of a comment block, not only the
 * tags. For example, formats the block main description.
 *
 * @callback FormatCommentBlockFn
 * @param {PrettierOptions}    options  The options sent to the plugin.
 * @param {ParsingInformation} info     The parsed information of the comment.
 * @returns {ParsingInformation}
 */

/**
 * @type {FormatCommentBlockFn}
 */
const formatCommentBlock = R.curry((options, info) => R.compose(
  R.mergeRight(info),
  R.assocPath(['block'], R.__, {}),
  formatDescription(R.__, options),
  R.prop('block'),
)(info));

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
const formatCommentTags = R.curry((options, info) => R.compose(
  R.assocPath(['block', 'tags'], R.__, info),
  formatTagsTypes(R.__, options, info.column),
  formatTags(R.__, options),
  R.path(['block', 'tags']),
)(info));

/**
 * Runs all the formatting functions that prepare the block tags in order to be rendered. They're
 * not together with the other formatting functions because the "prepare functions" can change
 * properties just for the rendering. For example, an optional parameter would end up with a name
 * `[name]`.
 *
 * @callback PrepareCommentTagsFn
 * @param {PrettierOptions}    options  The options sent to the plugin.
 * @param {ParsingInformation} info     The parsed information of the comment.
 * @returns {ParsingInformation}
 */

/**
 * @type {PrepareCommentTagsFn}
 */
const prepareCommentTags = R.curry((options, info) => R.compose(
  R.assocPath(['block', 'tags'], R.__, info),
  prepareTags(R.__, options, info.column),
  R.path(['block', 'tags']),
)(info));

/**
 * @callback RenderBlockFn
 * @param {number}       column  The column where the comment should start.
 * @param {CommentBlock} block   The information of the block to render.
 * @returns {string}
 */

/**
 * Generates the render function that will be called for each block in order to get the formatted
 * comment.
 *
 * @param {PrettierOptions} options The options sent to the plugin.
 * @returns {RenderBlockFn}
 */
const getRenderer = (options) => {
  const renderer = render(options);
  return (column, block) => {
    const padding = ' '.repeat(column + 1);
    const prefix = `${padding}* `;
    const lines = renderer(column, block)
    .map((line) => `${prefix}${line}`)
    .join('\n');
    return `*\n${lines}\n${padding}`;
  };
};

/**
 * Generates the parser that will modify the comments.
 *
 * @param {PrettierParseFn} originalParser The Prettier built in parser the plugin will use to
 *                                         extract the AST.
 * @returns {PrettierParseFn}
 */
const createParser = (originalParser) => (text, parsers, options) => {
  const ast = originalParser(text, parsers, options);
  const formatter = R.compose(
    prepareCommentTags(options),
    formatCommentTags(options),
    formatCommentBlock(options),
  );
  const renderer = getRenderer(options);

  if (ast.comments && ast.comments.length) {
    processComments(ast.comments, formatter, (info) => {
      const { comment, column, block } = info;
      comment.value = renderer(column, block);
    });
  }

  return ast;
};

module.exports.createParser = createParser;
