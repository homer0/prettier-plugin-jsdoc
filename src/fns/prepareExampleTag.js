const { format } = require('prettier');
const R = require('ramda');
const { isTag, prefixLines, splitLinesAndClean } = require('./utils');

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').CommentTagExample} CommentTagExample
 */

/**
 * This is the length of ` * `, so the formatter can calculate the `printWidth` - `column` - this
 * in order to get the real available width.
 *
 * @type {number}
 */
const COMMENT_PADDING_LENGTH = 3;

/**
 * Attempts to format a example code using Prettier.
 *
 * @param {PrettierOptions} options  The options sent to the plugin, needed for the formatter.
 * @param {number}          column   The column where the comment will be rendered.
 * @param {string}          example  The example code.
 * @returns {string}
 */
const formatExample = (options, column, example) => {
  let code;
  let indent;
  try {
    let printWidth = options.printWidth - column - COMMENT_PADDING_LENGTH;
    indent = options.jsdocIndentFormattedExamples;
    if (indent) {
      printWidth -= options.tabWidth;
    }

    code = format(example, {
      ...options,
      printWidth,
    });
  } catch (ignore) {
    code = example;
    indent = options.jsdocIndentUnformattedExamples;
  }

  if (indent) {
    code = prefixLines(' '.repeat(options.tabWidth), code);
  }

  return code;
};

/**
 * Takes an example code block that may or may not contain multiple `<caption>` blocks and split
 * them into a list of examples, each one with its `code` and `caption` properties.
 *
 * @param {PrettierOptions} options  The options sent to the plugin, needed for the formatter.
 * @param {number}          column   The column where the comment will be rendered.
 * @param {string}          example  The example code.
 * @returns {CommentTagExample[]}
 */
const splitExamples = (options, column, example) => R.compose(
  R.map(R.compose(
    ([caption, code]) => ({
      caption,
      code: formatExample(options, column, code),
    }),
    splitLinesAndClean(/<\s*\/\s*caption\s*>/i),
  )),
  splitLinesAndClean(/<\s*caption\s*>/i),
)(example);

/**
 * Checks if an example tag uses a `<caption>` tag in order to, either format the code if the
 * tag is not present, or extract all captions and codes and then format the codes.
 *
 * @callback FormatExampleTagFn
 * @param {PrettierOptions} options  The options sent to the plugin, needed for the formatter.
 * @param {number}          column   The column where the comment will be rendered.
 * @param {CommentTag}      tag      The tag to format.
 * @returns {CommentTag}
 */

/**
 * @type {FormatExampleTagFn}
 */
const formatExampleTag = R.curry((options, column, tag) => {
  const examples = tag.description.match(/<\s*caption\s*>/i) ?
    splitExamples(options, column, tag.description) :
    [{ code: formatExample(options, column, tag.description) }];

  return {
    ...tag,
    description: '',
    examples,
  };
});

/**
 * Checks if a tag is an `example` and attemps to format it using Prettier.
 *
 * @callback PrepareExampleTagFn
 * @param {PrettierOptions} options  The options sent to the plugin, needed for the formatter.
 * @param {CommentTag}      tag      The tag to validate and format.
 * @param {number}          column   The column where the comment will be rendered; this is
 *                                   necessary for the formatter.
 * @returns {CommentTag}
 */

/**
 * @type {PrepareExampleTagFn}
 */
const prepareExampleTag = R.curry((tag, options, column) => R.when(
  isTag('example'),
  formatExampleTag(options, column),
  tag,
));

module.exports.prepareExampleTag = prepareExampleTag;
