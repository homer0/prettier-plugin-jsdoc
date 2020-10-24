/**
 * This fixture will validate that the formatting of types with string literals won't be executed
 * if the option is disabled. There are changes on the output because, even if the option is
 * disabled, a type with a pipe (`|`) will also be formatted with Prettier.
 */

module.exports = {
  jsdocFormatStringLiterals: false,
};

//# input

/**
 * @typedef {"batman"  |'superman'  |   "flash"} Superhero
 */

/**
 * @callback IsAvailable
 * @param {'blue'  | 'red'  | 'purple'  | 'orange'} color Something.
 * @returns {boolean}
 */

//# output

/**
 * @typedef {"batman" | "superman" | "flash"} Superhero
 */

/**
 * @callback IsAvailable
 * @param {"blue" | "red" | "purple" | "orange"} color  Something.
 * @returns {boolean}
 */
