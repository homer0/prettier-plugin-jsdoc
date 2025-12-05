import * as R from 'ramda';
import { get, createProvider } from './app.js';

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Formats the name of an optional tag, validating if it has a default value. The idea is
 * to add the brackets and the value, if present, for the tag to be rendered.
 *
 * @param {CommentTag} tag  The tag to format.
 * @returns {string} The new name for the tag.
 */
export const formatNameForOptionalTag = (tag) => ({
  ...tag,
  name: tag.default ? `[${tag.name}=${tag.default}]` : `[${tag.name}]`,
});
/**
 * If a tag is `optional`, it formats its `name` property in order to include the brackets
 * (and a possible default value) when rendered.
 *
 * @param {CommentTag} tag  The tag to validate and format.
 * @returns {CommentTag}
 */
export const prepareTagName = (tag) =>
  R.when(R.prop('optional'), get(formatNameForOptionalTag), tag);

export const provider = createProvider('prepareTagName', {
  prepareTagName,
  formatNameForOptionalTag,
});
