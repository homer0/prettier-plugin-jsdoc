/**
 * This fixture will validate the formatting of types, based on the plugin default options.
 */

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
 * @type {Object} MyType
 * @property {React.FC<{ message: string }>} component    Some component.
 * @property {'a' | 'b' | 'c'}               letter       The letter description.
 * @property {string[]}                      names        A list of names.
 * @property {Array.<string[]>}              listOfLists  A list of lists.
 * @property {Object.<string, number>}       dict         A dictionary of numbers.
 */
