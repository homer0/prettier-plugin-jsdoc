/**
 * This fixture will validate the formatting of columns, changing the option that ignores tags with
 * descriptions on new paragraph for "consistent columns".
 */

module.exports = {
  jsdocIgnoreNewLineDescriptionsForConsistentColumns: false,
};

//# input

/**
 * @callback SomeFn
 * @param {string} name something
 * @license
 * Some license.
 */

//# output

/**
 * @callback SomeFn
 * @param {string} name
 * Something.
 * @license
 * Some license.
 */
