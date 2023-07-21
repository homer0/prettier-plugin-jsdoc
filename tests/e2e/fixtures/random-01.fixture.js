//# input

/**
 * @external Jimple
 * @see https://www.npmjs.com/package/jimple
 */

/**
 * @type {Object} Something
 * @description transform this into a sentence
 * @see {@link SomethingElse} to see how this is not broken, as the parser thinks the link is a type.
 */

/**
 * @type {Object} SomethingToIgnore
 * @description transform this into a sentence
 * @see {@link SomethingElse} to see how this is not broken, as the parser thinks the link is a type.
 * @prettierignore
 */

/**
 * @description logs something.
 * @param {string} [name='batman'] the name
 * @param {Logger} [logger] the logger instance
 * @see Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 * @license
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 */
export function log(name = 'batman', logger) {}

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

/**
 * @remarks Some of the Prisma scalars do not have a natural standard representation in GraphQL. For these case Nexus Prisma generates code that references type names matching those scalar names in Prisma. Then, you are expected to define those custom scalar types in your GraphQL API.
 */

/**
 * @return A function that is used to analyze the value and the index and determine whether or not to increment the count. Return `true` to increment the count, and return `false` to keep the count the same. If the predicate is not provided, every value will be counted.
 */
export function foo(predicate) {
  console.log(predicate);
}

//# output

/**
 * @external Jimple
 * @see https://www.npmjs.com/package/jimple
 */

/**
 * Transform this into a sentence.
 *
 * @type {Object} Something
 * @see {@link SomethingElse} to see how this is not broken, as the parser thinks the link is a
 *      type.
 */

/**
 * @type {Object} SomethingToIgnore
 * @description transform this into a sentence
 * @see {@link SomethingElse} to see how this is not broken, as the parser thinks the link is a type.
 * @prettierignore
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
export function log(name = 'batman', logger) {}

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
 * @returns {User}
 * Some description for the return value.
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

/**
 * @remarks Some of the Prisma scalars do not have a natural standard representation in
 *          GraphQL. For these case Nexus Prisma generates code that references type names
 *          matching those scalar names in Prisma. Then, you are expected to define those
 *          custom scalar types in your GraphQL API.
 */

/**
 * @returns A function that is used to analyze the value and the index and determine whether or
 *          not to increment the count. Return `true` to increment the count, and return
 *          `false` to keep the count the same. If the predicate is not provided, every value
 *          will be counted.
 */
export function foo(predicate) {
  console.log(predicate);
}
