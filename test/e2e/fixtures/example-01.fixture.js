/**
 * This fixture will validate the formatting of example tags, based on the plugin default options.
 */

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

/**
 * Ensures a given object is an array.
 *
 * @example <caption>First example</caption>
 * ensureArray('something'); // ['something']
 * @param {T|T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => Array.isArray(obj) ? obj : [obj];

/**
 * Ensures a given object is an array.
 *
 * @example <caption>First example</caption>
 * ensureArray('something'); // ['something']
 *
 * <caption>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu urna gravida, porttitor est quis, suscipit nulla. Donec iaculis magna ex, eu suscipit nisi fermentum id. Vestibulum eu velit nec eros dictum bibendum in non erat. Praesent ut vestibulum massa. Etiam at pulvinar sem.</caption>
 * ensureArray(['something']); // ['something']
 * @param {T|T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => Array.isArray(obj) ? obj : [obj];

/**
 * Ensures a given object is an array.
 *
 * @example
 * Pseudo code: isArray(x) ? x : [x];
 *
 * @param {T|T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => Array.isArray(obj) ? obj : [obj];

/**
 * Ensures a given object is an array.
 *
 * @example
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
 *   ensureArray('something'); // ['something']
 *
 * @param {T | T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => (Array.isArray(obj) ? obj : [obj]);

/**
 * Ensures a given object is an array.
 *
 * @example
 *
 * <caption>First example</caption>
 *
 *   ensureArray('something'); // ['something']
 *
 * @param {T | T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => (Array.isArray(obj) ? obj : [obj]);

/**
 * Ensures a given object is an array.
 *
 * @example
 *
 * <caption>First example</caption>
 *
 *   ensureArray('something'); // ['something']
 *
 * <caption>
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu urna gravida, porttitor est
 *   quis, suscipit nulla. Donec iaculis magna ex, eu suscipit nisi fermentum id. Vestibulum eu
 *   velit nec eros dictum bibendum in non erat. Praesent ut vestibulum massa. Etiam at pulvinar
 *   sem.
 * </caption>
 *
 *   ensureArray(['something']); // ['something']
 *
 * @param {T | T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => (Array.isArray(obj) ? obj : [obj]);

/**
 * Ensures a given object is an array.
 *
 * @example
 *
 * Pseudo code: isArray(x) ? x : [x];
 *
 * @param {T | T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => (Array.isArray(obj) ? obj : [obj]);

/**
 * Ensures a given object is an array.
 *
 * @example
 *
 * @param {T | T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => (Array.isArray(obj) ? obj : [obj]);
