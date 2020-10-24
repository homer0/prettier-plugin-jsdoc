/**
 * This fixture will validate the formatting of types with string literals, based on the plugin
 * default options.
 */

//# input

/**
 * @typedef {"batman"  |'superman'  |   "flash"} Superhero
 */

/**
 * @callback IsAvailable
 * @param {"blue"|"red"|"purple"|"orange"} color Something.
 * @returns {boolean}
 */

//# output

/**
 * @typedef {'batman' | 'superman' | 'flash'} Superhero
 */

/**
 * @callback IsAvailable
 * @param {'blue' | 'red' | 'purple' | 'orange'} color  Something.
 * @returns {boolean}
 */
