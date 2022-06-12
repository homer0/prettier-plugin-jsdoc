/**
 * This fixture will validate the formatting of types, only for arrays.
 */

module.exports = {
  jsdocUseTypeScriptTypesCasing: false,
  jsdocFormatComplexTypesWithPrettier: false,
  jsdocFormatStringLiterals: false,
  jsdocUseShortArrays: true,
  jsdocFormatDotForArraysAndObjects: false,
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
 * @property {Array<string[]>}       listOfLists  A list of lists.
 * @property {object<string,number>} dict         A dictionary of numbers.
 */
