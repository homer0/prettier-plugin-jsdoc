//# input

/**
 * @external Jimple
 * @see https://yarnpkg.com/en/package/jimple
 */

/**
 * @type {Object} Something
 * @description transform this into a sentence
 * @see {@link SomethingElse} to see how this is not broken, as the parser thinks the link is a type.
 */

/**
 * @description logs something.
 * @param {string} [name='batman'] the name
 * @param {Logger} [logger] the logger instance
 * @see Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 * @license
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 */
const log = (name = 'batman', logger) => {};

/**
 * @callback FunctionWithComplexTypes
 * @param {{ id:number, data: {
 * name: string, age: number} }} oldUser something random.
 * @param {{ id:number, data: {
 * name: string, age: number} }} newUser something else.
 * @summary
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 * @summary
 * something else
 * @returns {User} some description for the return value
 */

/**
 * @typedef {StaticsControllerOptions & StaticsControllerWrapperOptionsProperties} StaticsControllerWrapperOptions
 * @parent module:controllers
 */

//# output

/**
 * @external Jimple
 * @see https://yarnpkg.com/en/package/jimple
 */

/**
 * Transform this into a sentence.
 *
 * @type {Object} Something
 * @see {@link SomethingElse} to see how this is not broken, as the parser thinks the link is a
 *      type.
 */

/**
 * Logs something.
 *
 * @param {string} [name='batman']  The name.
 * @param {Logger} [logger]         The logger instance.
 * @see Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh,
 *      sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus
 *      luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 * @license
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed
 * aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus
 * auctor a venenatis ante. In hac habitasse platea dictumst.
 */
const log = (name = 'batman', logger) => {};

/**
 * @callback FunctionWithComplexTypes
 * @param {{
 *   id: number;
 *   data: {
 *     name: string;
 *     age: number;
 *   };
 * }} oldUser
 * Something random.
 * @param {{
 *   id: number;
 *   data: {
 *     name: string;
 *     age: number;
 *   };
 * }} newUser
 * Something else.
 * @returns {User} Some description for the return value.
 * @summary
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed
 * aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus
 * auctor a venenatis ante. In hac habitasse platea dictumst.
 * @summary
 * Something else.
 */

/**
 * @typedef {StaticsControllerOptions & StaticsControllerWrapperOptionsProperties}
 * StaticsControllerWrapperOptions
 * @parent module:controllers
 */
