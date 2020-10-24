/**
 * This fixture will validate the formatting of types with string literals, using custom options
 * for the quotes and the spacing.
 */

module.exports = {
  jsdocUseSingleQuotesForStringLiterals: false,
  jsdocSpacesBetweenStringLiterals: 0,
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
 * @typedef {"batman"|"superman"|"flash"} Superhero
 */

/**
 * @callback IsAvailable
 * @param {"blue"|"red"|"purple"|"orange"} color  Something.
 * @returns {boolean}
 */
