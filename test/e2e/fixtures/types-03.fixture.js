/**
 * This fixture will validate the formatting of types, only for objects.
 */

module.exports = {
  jsdocUseTypeScriptTypesCasing: false,
  jsdocFormatComplexTypesWithPrettier: false,
  jsdocFormatStringLiterals: false,
  jsdocUseShortArrays: false,
};

//# input

/**
 * @type {object} MyType
 * @property {Array<Array<string>>} listOfLists  a list of lists
 * @property {object<string,number>} dict    A dictionary of numbers
 */

//# output

/**
 * @type {object} MyType
 * @property {Array.<Array.<string>>} listOfLists  A list of lists.
 * @property {object.<string,number>} dict         A dictionary of numbers.
 */
