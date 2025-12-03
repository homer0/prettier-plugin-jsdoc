import * as R from 'ramda';
import { isMatch, replaceDotOnTypeGeneric } from './utils.js';
import { get, createProvider } from './app.js';
/**
 * @typedef {import('../types').PJPTypesOptions} PJPTypesOptions
 */

/**
 * This is the function that actual processes the types and the options of
 * {@link formatArrays}.
 * The reason this is on a separated function is to avoid adding all this composition
 * inside the `when`.
 *
 * @callback ProcessTypeFn
 * @param {string}          type     The type to format.
 * @param {PJPTypesOptions} options  The customization options.
 * @returns {string}
 */

/**
 * @type {ProcessTypeFn}
 */
export const processType = R.curry((options, type) =>
  R.compose(
    R.when(
      R.always(options.jsdocFormatDotForArraysAndObjects),
      get(replaceDotOnTypeGeneric)('Array', options.jsdocUseDotForArraysAndObjects),
    ),
    R.when(
      R.always(options.jsdocUseShortArrays),
      R.replace(/([^\w]|^)Array\s*(?:\.)?\s*<([\w\(\)|]+)>/g, '$1$2[]'),
    ),
  )(type),
);

/**
 * Formats array types depending on the customization options. If the type doesn't contain
 * an array, it will be returned without modifications.
 *
 * @callback FormatArraysFn
 * @param {string}          type     The type to format.
 * @param {PJPTypesOptions} options  The customization options.
 * @returns {string}
 */

/**
 * @type {FormatArraysFn}
 */
export const formatArrays = R.curry((type, options) =>
  R.when(get(isMatch)(/Array\s*\.?\s*</), get(processType)(options))(type),
);

export const provider = createProvider('formatArrays', {
  formatArrays,
  processType,
});
