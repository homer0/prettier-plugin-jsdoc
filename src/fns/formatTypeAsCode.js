const { format } = require('prettier');
const R = require('ramda');
const { isMatch } = require('./utils');

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 */

/**
 * Takes a tag type, wraps it inside a TypeScript declaration, sends it to Prettier and then cleans
 * it in order to return it so it can be used on a comment.
 *
 * @callback FormatPrettyTypeFn
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @param {string}          tag      The type will be formatted.
 * @returns {string}
 */

/**
 * @type {FormatPrettyTypeFn}
 */
const formatPrettyType = R.curry((options, type) => {
  let result;
  try {
    const useType = type.replace(/\*/g, 'any');
    const prefix = 'type complex = ';
    const newType = format(`${prefix}${useType}`, {
      ...options,
      parser: 'typescript',
    })
    .substr(prefix.length)
    .trim()
    .replace(/;$/, '');
    result = newType;
  } catch (ignore) {
    result = type;
  }

  return result;
});

/**
 * Checks if a type uses generics/union/intersections/properties in order to format it using
 * Prettier as if it were a regular declaration..
 *
 * @callback FormatTypeAsCodeFn
 * @param {string}          tag     The type to validate and format.
 * @param {PrettierOptions} options The options that were sent to the plugin, to send back to
 *                                  Prettier.
 * @returns {CommentTag}
 */

/**
 * @type {FormatTypeAsCodeFn}
 */
const formatTypeAsCode = R.curry((type, options) => R.when(
  isMatch(/[&<\.\|]/),
  formatPrettyType(options),
  type,
));

module.exports.formatTypeAsCode = formatTypeAsCode;
