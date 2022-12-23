module.exports = {
  jsdocEnsureDescriptionsAreSentences: false,
};

//# input

/**
 * @type {Object} Something
 * @description don't transform this into a sentence
 */

/**
 * @typedef {{
 *   'Sr No': number;
 *   'Program name': string;
 *   Seniority: number | null;
 *   "Speaker's name": string;
 * }} MemoriesRow
 */

//# output

/**
 * don't transform this into a sentence
 *
 * @type {Object} Something
 */

/**
 * @typedef {{
 *   'Sr No': number;
 *   'Program name': string;
 *   Seniority: number | null;
 *   "Speaker's name": string;
 * }} MemoriesRow
 */
