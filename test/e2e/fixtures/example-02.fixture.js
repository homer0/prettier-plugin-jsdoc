/**
 * This fixture will validate the formatting of example tags, without indenting the formatted code.
 */

module.exports = {
  jsdocIndentFormattedExamples: false,
};

//# input

/**
 * Ensures a given object is an array.
 *
 * @example
 * ensureArray('something'); // ['something']
 * @param {T|T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => Array.isArray(obj) ? obj : [obj];

//# output

/**
 * Ensures a given object is an array.
 *
 * @example
 *
 * ensureArray('something'); // ['something']
 *
 * @param {T | T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => (Array.isArray(obj) ? obj : [obj]);
