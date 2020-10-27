/**
 * This fixture will validate that if a "complex" type can't be formatted with Prettier, it will
 * remain with the same value.
 */

//# input

/**
 * @type {some|1nval id&ty''pe}
 */

//# output

/**
 * @type {some|1nval id&ty''pe}
 */
