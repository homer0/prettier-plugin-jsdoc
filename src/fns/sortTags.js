const R = require('ramda');
const { getIndexOrFallback } = require('./utils');
const { getFn, provider } = require('../app');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').PJPTagsOptions} PJPTagsOptions
 */

/**
 * Creates the function used by `Array.sort` to actually sort the tags based on a reference list.
 *
 * @param {string[]} ref  The reference list with the order for the tags.
 * @returns {Function}
 */
const createSorter = (ref) => {
  const useGetIndexOrFallback = getFn(getIndexOrFallback);
  const fallback = useGetIndexOrFallback(ref, ref.length, 'other');
  const getTagWeight = useGetIndexOrFallback(ref, fallback);
  return (a, b) => getTagWeight(a.tag) - getTagWeight(b.tag);
};

/**
 * Sorts a list of tags based on reference list from the plugin options.
 *
 * @param {CommentTag[]}   tags     The list of tags to sort.
 * @param {PJPTagsOptions} options  The options that tell the function how to sort them.
 * @returns {CommentTag[]}
 */
const sortTags = R.curry((tags, options) => R.sort(
  getFn(createSorter)(options.jsdocTagsOrder),
)(tags));

module.exports.sortTags = sortTags;
module.exports.createSorter = createSorter;
module.exports.provider = provider('sortTags', module.exports);
