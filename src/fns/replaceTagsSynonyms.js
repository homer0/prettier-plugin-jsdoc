const R = require('ramda');
const { TAGS_SYNONYMS } = require('../constants');
const { provider } = require('../app');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Replaces the tags synonyms for their "official" version.
 *
 * @param {CommentTag[]} tags  The list of tags where the replacement should happen.
 * @returns {CommentTag[]}
 */
const replaceTagsSynonyms = (tags) => R.map(
  (tag) => ({
    ...tag,
    tag: R.propOr(tag.tag, tag.tag, TAGS_SYNONYMS),
  }),
  tags,
);

module.exports.replaceTagsSynonyms = replaceTagsSynonyms;
module.exports.provider = provider('replaceTagsSynonyms', module.exports);
