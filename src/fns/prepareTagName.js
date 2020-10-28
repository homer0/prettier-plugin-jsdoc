const R = require('ramda');
const { getFn, provider } = require('../app');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Formats the name of an optional tag, validating if it has a default value. The idea is to add
 * the brackets and the value, if present, for the tag to be rendered.
 *
 * @param {CommentTag} tag  The tag to format.
 * @returns {string} The new name for the tag.
 */
const formatNameForOptionalTag = (tag) => ({
  ...tag,
  name: tag.default ? `[${tag.name}=${tag.default}]` : `[${tag.name}]`,
});
/**
 * If a tag is `optional`, it formats its `name` property in order to include the brackets (and
 * a possible default value) when rendered.
 *
 * @param {CommentTag} tag The tag to validate and format.
 * @returns {CommentTag}
 */
const prepareTagName = (tag) => R.when(
  R.prop('optional'),
  getFn(formatNameForOptionalTag),
  tag,
);

module.exports.prepareTagName = prepareTagName;
module.exports.formatNameForOptionalTag = formatNameForOptionalTag;
module.exports.provider = provider('prepareTagName', module.exports);
