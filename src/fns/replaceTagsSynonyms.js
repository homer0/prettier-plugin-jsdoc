const R = require('ramda');
const { getTagsSynonyms } = require('./constants');
const { get, provider } = require('../app');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Replaces the tags synonyms for their "official" version.
 *
 * @param {CommentTag[]} tags  The list of tags where the replacement should happen.
 * @returns {CommentTag[]}
 */
const replaceTagsSynonyms = (tags) => {
  const synonyms = get(getTagsSynonyms)();
  return R.map(
    (tag) => ({
      ...tag,
      tag: R.propOr(tag.tag, tag.tag, synonyms),
    }),
    tags,
  );
};

module.exports.replaceTagsSynonyms = replaceTagsSynonyms;
module.exports.provider = provider('replaceTagsSynonyms', module.exports);
