import * as R from 'ramda';
import { getTagsSynonyms } from './constants.js';
import { get, createProvider } from './app.js';

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Replaces the tags synonyms for their "official" version.
 *
 * @param {CommentTag[]} tags  The list of tags where the replacement should happen.
 * @returns {CommentTag[]}
 */
export const replaceTagsSynonyms = (tags) => {
  const synonyms = get(getTagsSynonyms)();
  return R.map(
    (tag) => ({
      ...tag,
      tag: R.propOr(tag.tag, tag.tag, synonyms),
    }),
    tags,
  );
};

export const provider = createProvider('replaceTagsSynonyms', {
  replaceTagsSynonyms,
});
