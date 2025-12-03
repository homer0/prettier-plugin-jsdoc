import * as R from 'ramda';
import { formatAccessTag } from './formatAccessTag.js';
import { replaceTagsSynonyms } from './replaceTagsSynonyms.js';
import { sortTags } from './sortTags.js';
import { trimTagsProperties } from './trimTagsProperties.js';
import { formatTagsDescription } from './formatTagsDescription.js';
import { get, createProvider } from './app.js';

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
export const formatTags = R.curry((tags, options) => {
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

export const provider = createProvider('formatTags', {
  formatTags,
});
