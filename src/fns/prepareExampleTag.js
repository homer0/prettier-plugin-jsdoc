const { format } = require('prettier');
const R = require('ramda');
const { isTag } = require('./utils');

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 * @typedef {import('../types').CommentTag} CommentTag
 */

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
  const example = `${tag.name} ${tag.description}`;
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
    code = R.compose(
      R.join('\n'),
      R.map(R.concat(' '.repeat(options.tabWidth))),
      R.split('\n'),
      R.trim(),
    )(code);
  }

  return {
    ...tag,
    name: '',
    description: code,
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
