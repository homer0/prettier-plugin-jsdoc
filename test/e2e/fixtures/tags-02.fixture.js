/**
 * This fixture will validate that the formatting of tags won't be executed when if the options are
 * disabled.
 */

module.exports = {
  jsdocSortTags: false,
  jsdocReplaceTagsSynonyms: false,
};

//# input

/**
 * @description Creates a person.
 * @param {String} name The name of the person.
 * @return {Person}
 * @param {number} age  The person's age.
 * @callback CreatePersonFn
 */

//# output

/**
 * Creates a person.
 *
 * @param {string} name  The name of the person.
 * @return {Person}
 * @param {number} age   The person's age.
 * @callback CreatePersonFn
 */
