const R = require('ramda');
const { formatAccessTag } = require('./formatAccessTag');
const { replaceTagsSynonyms } = require('./replaceTagsSynonyms');
const { sortTags } = require('./sortTags');
const { trimTagsProperties } = require('./trimTagsProperties');
const { formatTagsDescription } = require('./formatTagsDescription');
const { get, provider } = require('./app');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').PJPTagsOptions} PJPTagsOptions
 */

/**
 * Formats the tags' names, trims the values, and applies sorting, if enabled, to a list
 * of tags.
 *
 * @callback FormatTagsFn
 * @param {CommentTag[]}   tags     The list to format.
 * @param {PJPTagsOptions} options  The customization options for the formatter.
 * @returns {CommentTag[]}
 */

/**
 * @type {FormatTagsFn}
 */
const formatTags = R.curry((tags, options) => {
  const fns = [
    get(formatTagsDescription),
    get(trimTagsProperties),
    get(formatAccessTag)(R.__, options),
  ];

  if (options.jsdocReplaceTagsSynonyms) {
    fns.push(get(replaceTagsSynonyms));
  }

  if (options.jsdocSortTags) {
    fns.push(get(sortTags)(R.__, options));
  }

  return R.compose(...fns.reverse())(tags);
});

module.exports.formatTags = formatTags;
module.exports.provider = provider('formatTags', module.exports);
