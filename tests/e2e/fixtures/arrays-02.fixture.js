/**
 * This fixture will validate the formatting of array types, keeping their long version
 * (`Array<type>`) and removing the dots before the generics.
 */

module.exports = {
  jsdocUseShortArrays: false,
  jsdocUseDotForArraysAndObjects: false,
};

//# input

/**
 * Gets a list of names.
 *
 * @callback GetNames
 * @param {Array.<Array.<string>>} filters A list of "filters".
 * @return {Array<string>}
 */

//# output

/**
 * Gets a list of names.
 *
 * @callback GetNames
 * @param {Array<Array<string>>} filters  A list of "filters".
 * @returns {Array<string>}
 */
