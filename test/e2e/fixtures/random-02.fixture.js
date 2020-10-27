module.exports = {
  jsdocEnsureDescriptionsAreSentences: false,
};

//# input

/**
 * @type {Object} Something
 * @description don't transform this into a sentence
 */

//# output

/**
 * don't transform this into a sentence
 *
 * @type {Object} Something
 */
