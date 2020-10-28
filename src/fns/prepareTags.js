const R = require('ramda');
const { prepareExampleTag } = require('./prepareExampleTag');
const { prepareTagDescription } = require('./prepareTagDescription');
const { prepareTagName } = require('./prepareTagName');
const { getFn, provider } = require('../app');

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Takes a list of tags and runs them through all the preparations needed for them to be rendered.
 * Preparations include adding the brackes for optional parameters and running Prettier for
 * complex types.
 *
 * @callback PrepareTagsFn
 * @param {CommentTag[]}    tags    The list of tags to format.
 * @param {PrettierOptions} options The options sent to the plugin, in case they're needed for
 *                                  Prettier.
 * @param {number}          column  The column where the comment will be rendered; this is necessary
 *                                  for some of the functions that may need to call Prettier.
 * @returns {CommentTag[]}
 */

/**
 * @type {PrepareTagsFn}
 */
const prepareTags = R.curry((tags, options, column) => {
  const fns = [getFn(prepareTagName)];

  if (options.jsdocFormatExamples) {
    fns.push(getFn(prepareExampleTag)(R.__, options, column));
  }

  if (options.jsdocEnsureDescriptionsAreSentences) {
    fns.push(getFn(prepareTagDescription));
  }

  return R.map(
    R.compose(...fns.reverse()),
    tags,
  );
});

module.exports.prepareTags = prepareTags;
module.exports.provider = provider('prepareTags', module.exports);
