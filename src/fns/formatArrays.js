const R = require('ramda');
const { isMatch } = require('./utils');
/**
 * @typedef {import('../types').PJPTypesOptions} PJPTypesOptions
 */

/**
 * Depending on whether dots before array generics are allowed or not, this method will remove
 * them or add them if not present.
 *
 * @callback ReplaceDotFn
 * @param {boolean} useDot  Whether or not the dots should be present.
 * @param {string}  type    The actual type where the dots will be added or removed.
 * @returns {string}
 */

/**
 * @type {ReplaceDotFn}
 */
const replaceDot = R.curry((useDot, type) => R.ifElse(
  R.always(useDot),
  R.replace(/([^\w]|^)Array\s*</g, '$1Array.<'),
  R.replace(/([^\w]|^)Array\s*\.\s*</g, '$1Array<'),
)(type));

/**
 * This is the function that actuall processes the types and the options of {@link formatArrays}.
 * The reason this is on a separated function is to avoid adding all this composition inside the
 * `when`.
 *
 * @callback ProcessTypeFn
 * @param {string}          type     The type to format.
 * @param {PJPTypesOptions} options  The customization options.
 * @returns {string}
 */

/**
 * @type {ProcessTypeFn}
 */
const processType = R.curry((options, type) => R.compose(
  R.when(
    R.always(options.jsdocFormatDotForArraysAndObjects),
    replaceDot(options.jsdocUseDotForArraysAndObjects),
  ),
  R.when(
    R.always(options.jsdocUseShortArrays),
    R.replace(/([^\w]|^)Array\s*(?:\.)?\s*<([\w\(\)|]+)>/g, '$1$2[]'),
  ),
)(type));

/**
 * Formats array types depending on the customization options. If the type doesn't contain an
 * array, it will be returned without modifications.
 *
 * @param {string}          type     The type to format.
 * @param {PJPTypesOptions} options  The customization options.
 * @returns {string}
 */
const formatArrays = (type, options) => R.when(
  isMatch(/Array\s*\.?\s*</),
  processType(options),
)(type);

module.exports.formatArrays = formatArrays;
