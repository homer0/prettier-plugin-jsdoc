/**
 * This fixture will validate that there's no formatting when the plugin is disabled in order to be
 * extended.
 */

module.exports = {
  jsdocPluginExtended: true,
};

//# input

/**
 * @throws {Error} If something goes wrong.
 * @description Creates a person.
 * @param {String} name The name of the person.
 * @return {Person}
 * @author homer0
 * @param {number} age  The person's age.
 * @callback CreatePersonFn
 */

//# output

/**
 * @throws {Error} If something goes wrong.
 * @description Creates a person.
 * @param {String} name The name of the person.
 * @return {Person}
 * @author homer0
 * @param {number} age  The person's age.
 * @callback CreatePersonFn
 */
