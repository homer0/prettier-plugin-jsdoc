module.exports = {
  jsdocPrintWidth: 95,
  jsdocUseColumns: false,
};

//# input

/**
 * @param {foo} bar baz
 * @returns {number} Returns how the node is positioned relatively to the reference node
 * according to the bitmask. 0 if reference node and given node are the same.
 * @todo Refactor how the multiline names are handled. And some extra text to make the line longer.
 */

//# output

/**
 * @param {foo} bar
 * Baz.
 * @returns {number}
 * Returns how the node is positioned relatively to the reference node according to the
 * bitmask. 0 if reference node and given node are the same.
 * @todo Refactor how the multiline names are handled. And some extra text to make the line
 *       longer.
 */
