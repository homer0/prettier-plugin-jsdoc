/**
 * This fixture will validate the formatting for the access tag, based on the plugin default
 * options.
 */

//# input

/**
 * A public function.
 * @public
 */
const publicFn = () => {};

/**
 * A private function.
 * @private
 */
const privateFn = () => {};

/**
 * A protected function.
 * @protected
 */
const protectedFn = () => {};

/**
 * A function that shouldn't be modified.
 *
 * @access private
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
 * @access public
 */
const publicFn = () => {};

/**
 * A private function.
 *
 * @access private
 */
const privateFn = () => {};

/**
 * A protected function.
 *
 * @access protected
 */
const protectedFn = () => {};

/**
 * A function that shouldn't be modified.
 *
 * @access private
 */
const fnWithAccessTag = () => {};

/**
 * A function with both access tag and public tag.
 *
 * @access public
 */
const fnWithBothTags = () => {};
