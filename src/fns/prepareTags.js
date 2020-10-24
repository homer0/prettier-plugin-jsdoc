const R = require('ramda');
const { prepareExampleTag } = require('./prepareExampleTag');
const { prepareTagName } = require('./prepareTagName');

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
 * @returns {CommentTag[]}
 */

/**
 * @type {PrepareTagsFn}
 */
const prepareTags = R.curry((tags, options) => {
  const fns = [
    prepareTagName,
  ];

  if (options.jsdocFormatExamples) {
    fns.push(prepareExampleTag(R.__, options));
  }

  return R.map(
    R.compose(...fns.reverse()),
    tags,
  );
});

module.exports.prepareTags = prepareTags;
