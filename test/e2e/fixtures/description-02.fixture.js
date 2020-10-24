/**
 * This fixture will validate the formatting of block descriptions when the tag is allowed.
 */

module.exports = {
  jsdocAllowDescriptionTag: true,
};

//# input

/**
 * @typedef {Object} MyType
 * @description Lorem ipsum dolor.
 */

const context = () => {
  /**
   * @typedef {Object} MyType
   * @description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis enim sed mattis vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus ipsum. Vivamus dapibus sollicitudin lobortis. Nunc cursus sollicitudin dolor sagittis tincidunt. Pellentesque ac dui finibus, vehicula nunc quis, ultrices odio.
   */
};

/**
 * @callback MyCallbackFn Lorem ipsum dolor.
 */

//# output

/**
 * @typedef {Object} MyType
 * @description Lorem ipsum dolor.
 */

const context = () => {
  /**
   * @typedef {Object} MyType
   * @description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis enim
   *              sed mattis vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus
   *              ipsum. Vivamus dapibus sollicitudin lobortis. Nunc cursus sollicitudin dolor
   *              sagittis tincidunt. Pellentesque ac dui finibus, vehicula nunc quis, ultrices
   *              odio.
   */
};

/**
 * Lorem ipsum dolor.
 *
 * @callback MyCallbackFn
 */
