/**
 * This fixture will validate the formatting for the access tag when the tag is not allowed.
 */

module.exports = {
  jsdocAllowAccessTag: false,
};

//# input

/**
 * A public function.
 * @access public
 */
const publicFn = () => {};

/**
 * A private function.
 * @access private
 */
const privateFn = () => {};

/**
 * A protected function.
 * @access protected
 */
const protectedFn = () => {};

/**
 * A function that shouldn't be modified.
 *
 * @private
 */
const fnWithAccessTag = () => {};

/**
 * A function with both access tag and public tag.
 *
 * @access public
 * @public
 */
const fnWithBothTags = () => {};

//# output

/**
 * A public function.
 *
 * @public
 */
const publicFn = () => {};

/**
 * A private function.
 *
 * @private
 */
const privateFn = () => {};

/**
 * A protected function.
 *
 * @protected
 */
const protectedFn = () => {};

/**
 * A function that shouldn't be modified.
 *
 * @private
 */
const fnWithAccessTag = () => {};

/**
 * A function with both access tag and public tag.
 *
 * @public
 */
const fnWithBothTags = () => {};
