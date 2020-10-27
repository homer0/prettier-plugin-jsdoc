/**
 * This fixture will validate the formatting of "inline tags", where instead of using columns,
 * tags render one line with the tag, type and name, and then the descriptions on lines taking
 * the full width.
 */

module.exports = {
  jsdocUseColumns: false,
};

//# input

/**
 * @callback MyFn
 * @param {String} name the description for the name
 * @param {Number} age the description for the age
 * @return {{ id:number, data: {
 * name: string, age: number} }}
 * @see Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis enim sed mattis vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus ipsum. Vivamus dapibus sollicitudin lobortis.
 * @throws {Error} If something goes wrong
 * @yields {Object} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis enim sed mattis vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus ipsum. Vivamus dapibus sollicitudin lobortis.
 */

//# output

/**
 * @callback MyFn
 * @param {string} name
 * The description for the name.
 * @param {number} age
 * The description for the age.
 * @returns {{
 *   id: number;
 *   data: {
 *     name: string;
 *     age: number;
 *   };
 * }}
 * @throws {Error}
 * If something goes wrong.
 * @yields {Object} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis enim
 *                  sed mattis vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus
 *                  ipsum. Vivamus dapibus sollicitudin lobortis.
 * @see Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis enim sed mattis
 *      vulputate. Fusce velit dui, commodo eget ex sed, rutrum finibus ipsum. Vivamus dapibus
 *      sollicitudin lobortis.
 */
