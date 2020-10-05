const R = require('ramda');
const { isMatch, replaceDotOnTypeGeneric } = require('./utils');
/**
 * @typedef {import('../types').PJPTypesOptions} PJPTypesOptions
 */

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
    replaceDotOnTypeGeneric('Array', options.jsdocUseDotForArraysAndObjects),
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
 * @callback FormatArraysFn
 * @param {string}          type     The type to format.
 * @param {PJPTypesOptions} options  The customization options.
 * @returns {string}
 */

/**
 * @type {FormatArraysFn}
 */
const formatArrays = R.curry((type, options) => R.when(
  isMatch(/Array\s*\.?\s*</),
  processType(options),
)(type));

module.exports.formatArrays = formatArrays;
