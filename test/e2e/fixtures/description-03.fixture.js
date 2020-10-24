/**
 * This fixture will validate the formatting of block descriptions when the tag is allowed and
 * should be used as fallback.
 */

module.exports = {
  jsdocAllowDescriptionTag: true,
  jsdocUseDescriptionTag: true,
};

//# input

/**
 * @typedef {Object} MyType Lorem ipsum dolor.
 */

const context = () => {
  /**
   * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis enim sed mattis vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus ipsum. Vivamus dapibus sollicitudin lobortis. Nunc cursus sollicitudin dolor sagittis tincidunt. Pellentesque ac dui finibus, vehicula nunc quis, ultrices odio.
   *
   * @typedef {Object} MyType
   */
};

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
