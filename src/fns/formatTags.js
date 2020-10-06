const R = require('ramda');
const { replaceTagsSynonyms } = require('./replaceTagsSynonyms');
const { sortTags } = require('./sortTags');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').PJPTagsOptions} PJPTagsOptions
 */

/**
 * Formats the tags' names and applies sorting, if enabled, to a list of tags.
 *
 * @callback FormatTagsFn
 * @param {CommentTag[]}   tags     The list to format.
 * @param {PJPTagsOptions} options  The customization options for the formatter.
 */

/**
 * @type {FormatTagsFn}
 */
const formatTags = R.curry((tags, options) => {
  const fns = [];

  if (options.jsdocReplaceTagsSynonyms) {
    fns.push(replaceTagsSynonyms);
  }

  if (options.jsdocSortTags) {
    fns.push(sortTags(R.__, options));
  }

  if (!fns.length) return tags;
  return R.compose(...fns.reverse())(tags);
});

module.exports.formatTags = formatTags;
