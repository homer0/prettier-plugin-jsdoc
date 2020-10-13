const { format } = require('prettier');
const R = require('ramda');
const { isMatch } = require('./utils');

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Checks whether a tag type uses "complex" features, like generics, union, intercection, etc.
 *
 * @callback HasComplexTypeFn
 * @param {CommentTag} tag  The tag which type will be validated.
 * @returns {boolean}
 */

/**
 * @type {HasComplexTypeFn}
 */
const hasComplexType = R.compose(
  isMatch(/[&<\.\|]/),
  R.prop('type'),
);

/**
 * Takes the type of a tag, creates some fake TS code, sends it to Prettier, cleans the result
 * and sets it up as the new type of the tag.
 *
 * @callback PreparePrettyTypeFn
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @param {CommentTag}      tag      The tag which type will be formatted.
 * @returns {CommentTag}
 */

/**
 * @type {PreparePrettyTypeFn}
 */
const preparePrettyType = R.curry((options, tag) => {
  let result;
  try {
    const useType = tag.type.replace(/\*/g, 'any');
    const prefix = 'type complex = ';
    const newType = format(`${prefix}${useType}`, {
      ...options,
      parser: 'typescript',
    })
    .substr(prefix.length)
    .trim()
    .replace(/;$/, '');
    result = R.assocPath(['type'], newType, tag);
  } catch (ignore) {
    // Ignore the error because if it failed, it's an issue with Pettier.
    result = R.clone(tag);
  }

  return result;
});

/**
 * Checks if tag type uses generics/union/intersections/properties in order to format it using
 * Prettier as if it were code.
 *
 * @callback PrepareTagPrettyType
 * @param {CommentTag}      tag     The tag to validate and format.
 * @param {PrettierOptions} options The options that were sent to the plugin, to send back to
 *                                  Prettier.
 * @returns {CommentTag}
 */

/**
 * @type {PrepareTagPrettyType}
 */
const prepareTagPrettyType = R.curry((tag, options) => R.when(
  hasComplexType,
  preparePrettyType(options),
  tag,
));

module.exports.prepareTagPrettyType = prepareTagPrettyType;
