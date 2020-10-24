/**
 * This fixture will validate the formatting of block descriptions, based on the plugin default
 * options.
 */

//# input

/**
 * @typedef {Object} MyType
 * @description Lorem ipsum dolor.
 */

/**
 * @typedef {Object} MyType Lorem ipsum inline dolor.
 */

/**
 * @typedef {Object} MyType Some other description.
 * @description Lorem ipsum dolor.
 */

/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis enim sed mattis vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus ipsum. Vivamus dapibus sollicitudin lobortis. Nunc cursus sollicitudin dolor sagittis tincidunt. Pellentesque ac dui finibus, vehicula nunc quis, ultrices odio.
 *
 * @typedef {Object} MyType
 */

/**
 * @callback SomeRandomFunc Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Enim sed mattis vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus ipsum.
 * @param {string} name Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis enim sed mattis vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus ipsum. Vivamus dapibus sollicitudin lobortis. Nunc cursus sollicitudin dolor sagittis tincidunt. Pellentesque ac dui finibus, vehicula nunc quis, ultrices odio.
 */

//# output

/**
 * Lorem ipsum dolor.
 *
 * @typedef {Object} MyType
 */

/**
 * Lorem ipsum inline dolor.
 *
 * @typedef {Object} MyType
 */

/**
 * Some other description.
 *
 * Lorem ipsum dolor.
 *
 * @typedef {Object} MyType
 */

/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis enim sed mattis
 * vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus ipsum. Vivamus dapibus
 * sollicitudin lobortis. Nunc cursus sollicitudin dolor sagittis tincidunt. Pellentesque ac dui
 * finibus, vehicula nunc quis, ultrices odio.
 *
 * @typedef {Object} MyType
 */

/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Enim sed mattis
 * vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus ipsum.
 *
 * @callback SomeRandomFunc
 * @param {string} name  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis
 *                       enim sed mattis vulputate. Fusce velit dui, commodo eget ex sed, rutrum
 *                       finibus ipsum. Vivamus dapibus sollicitudin lobortis. Nunc cursus
 *                       sollicitudin dolor sagittis tincidunt. Pellentesque ac dui finibus,
 *                       vehicula nunc quis, ultrices odio.
 */
