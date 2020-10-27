/**
 * This fixture will validate that the formatting of types won't be executed if the options are
 * disabled.
 */

module.exports = {
  jsdocUseTypeScriptTypesCasing: false,
  jsdocFormatComplexTypesWithPrettier: false,
  jsdocFormatStringLiterals: false,
  jsdocUseShortArrays: false,
  jsdocFormatDotForArraysAndObjects: false,
};

//# input

/**
 * @type {object} MyType
 * @property {React.FC<{   message:string}   >} component    some component.
 * @property {"a"|"b"|"c"}    letter the letter description
 * @property {Array<string>} names  a list of names
 * @property {Array<Array<string>>} listOfLists  a list of lists
 * @property {object<string,number>} dict    A dictionary of numbers
 */

//# output

/**
 * @type {object} MyType
 * @property {React.FC<{   message:string}   >} component    Some component.
 * @property {"a"|"b"|"c"}                      letter       The letter description.
 * @property {Array<string>}                    names        A list of names.
 * @property {Array<Array<string>>}             listOfLists  A list of lists.
 * @property {object<string,number>}            dict         A dictionary of numbers.
 */
