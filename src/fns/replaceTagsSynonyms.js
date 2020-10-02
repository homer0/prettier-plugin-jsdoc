const R = require('ramda');
const { TAGS_SYNONYMS } = require('../constants');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Replaces the tags synonyms for their "official" version.
 *
 * @param {CommentTag[]} tags  The list of tags where the replacement should happen.
 * @returns {CommentTag[]}
 */
const replaceTagsSynonyms = R.map((tag) => ({
  ...tag,
  tag: R.propOr(tag.tag, tag.tag, TAGS_SYNONYMS),
}));

module.exports.replaceTagsSynonyms = replaceTagsSynonyms;
