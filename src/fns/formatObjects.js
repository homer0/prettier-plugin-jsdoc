const R = require('ramda');
const { isMatch, replaceDotOnTypeGeneric } = require('./utils');
const { get, provider } = require('./app');

/**
 * @typedef {import('../types').PJPTypesOptions} PJPTypesOptions
 */

/**
 * This is the function that actuall processes the types and the options of
 * {@link formatObjects}.
 * The reason this is on a separated function is to avoid adding composition inside the
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
const processType = R.curry((options, type) =>
  R.when(
    R.always(options.jsdocFormatDotForArraysAndObjects),
    get(replaceDotOnTypeGeneric)('Object', options.jsdocUseDotForArraysAndObjects),
  )(type),
);

/**
 * Formats array types depending on the customization options. If the type doesn't contain
 * an array, it will be returned without modifications.
 *
 * @callback FormatObjectsFn
 * @param {string}          type     The type to format.
 * @param {PJPTypesOptions} options  The customization options.
 * @returns {string}
 */

/**
 * @type {FormatObjectsFn}
 */
const formatObjects = R.curry((type, options) =>
  R.when(get(isMatch)(/Object\s*\.?\s*</i), get(processType)(options))(type),
);

module.exports.formatObjects = formatObjects;
module.exports.processType = processType;
module.exports.provider = provider('formatObjects', module.exports);
