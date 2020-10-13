const R = require('ramda');
const { prepareTagName } = require('./prepareTagName');
const { prepareTagPrettyType } = require('./prepareTagPrettyType');

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
const prepareTags = R.curry((tags, options) => R.map(
  R.compose(
    prepareTagPrettyType(R.__, options),
    prepareTagName,
  ),
  tags,
));

module.exports.prepareTags = prepareTags;
