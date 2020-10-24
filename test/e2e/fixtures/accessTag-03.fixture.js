/**
 * This fixture will validate the formatting for the access tag when both the tag and type tag
 * are allowed.
 */

module.exports = {
  jsdocEnforceAccessTag: false,
};

//# input

/**
 * A public function.
 * @access public
 * @public
 */
const publicFn = () => {};

//# output

/**
 * A public function.
 *
 * @public
 */
const publicFn = () => {};
