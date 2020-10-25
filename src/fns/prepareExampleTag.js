const { format } = require('prettier');
const R = require('ramda');
const { isTag, prefixLines, splitLinesAndClean } = require('./utils');

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').CommentTagExample} CommentTagExample
 */

/**
 * Attempts to format a example code using Prettier.
 *
 * @param {PrettierOptions} options  The options sent to the plugin, needed for the formatter.
 * @param {string}          example  The example code.
 * @returns {string}
 */
const formatExample = (options, example) => {
  let code;
  let indent;
  try {
    code = format(example, options);
    indent = options.jsdocIndentFormattedExamples;
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
 * @param {string}          example  The example code.
 * @returns {CommentTagExample[]}
 */
const splitExamples = (options, example) => R.compose(
  R.map(R.compose(
    ([caption, code]) => ({
      caption,
      code: formatExample(options, code),
    }),
    splitLinesAndClean(/<\s*\/\s*caption\s*>/i),
  )),
  splitLinesAndClean(/<\s*caption\s*>/i),
)(example);

/**
 * Attempts to format the code inside an example tag using Prettier.
 *
 * @callback FormatExampleTagFn
 * @param {PrettierOptions} options  The options sent to the plugin, needed for the formatter.
 * @param {CommentTag}      tag      The tag to format.
 * @returns {CommentTag}
 */

/**
 * @type {FormatExampleTagFn}
 */
const formatExampleTag = R.curry((options, tag) => {
  const examples = tag.description.match(/<\s*caption\s*>/i) ?
    splitExamples(options, tag.description) :
    [{ code: formatExample(options, tag.description) }];

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
 * @returns {CommentTag}
 */

/**
 * @type {PrepareExampleTagFn}
 */
const prepareExampleTag = R.curry((tag, options) => R.when(
  isTag('example'),
  formatExampleTag(options),
  tag,
));

module.exports.prepareExampleTag = prepareExampleTag;
