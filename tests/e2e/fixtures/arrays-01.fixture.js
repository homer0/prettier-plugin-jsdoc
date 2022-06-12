/**
 * This fixture will validate the formatting of array types, based on the plugin default options.
 */

//# input

/**
 * Gets a list of names.
 *
 * @callback GetNames
 * @param {Array<Array<string>>} filters A list of "filters".
 * @return {Array<string>}
 */

//# output

/**
 * Gets a list of names.
 *
 * @callback GetNames
 * @param {Array.<string[]>} filters  A list of "filters".
 * @returns {string[]}
 */
