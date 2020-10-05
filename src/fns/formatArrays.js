/**
 * @typedef {import('../types').PJPTypesOptions} PJPTypesOptions
 */

/**
 * Formats array types depending on the customization options. If the type doesn't contain an
 * array, it will be returned without modifications.
 *
 * @param {string}          type     The type to format.
 * @param {PJPTypesOptions} options  The customization options.
 * @returns {string}
 */
const formatArrays = (type, options) => {
  if (!type.match(/Array\.?\s*</)) return type;
  let result = type;
  if (options.jsdocUseShortArrays) {
    result = result.replace(/([^\w]|^)Array\s*(?:\.)?\s*<([\w\(\)|]+)>/g, '$1$2[]');
  }

  if (options.jsdocFormatDotForArraysAndObjects) {
    result = options.jsdocUseDotForArraysAndObjects ?
      result.replace(/([^\w]|^)Array\s*</g, '$1Array.<') :
      result.replace(/([^\w]|^)Array\s*\.\s*</g, '$1Array<');
  }

  return result;
};

module.exports.formatArrays = formatArrays;
