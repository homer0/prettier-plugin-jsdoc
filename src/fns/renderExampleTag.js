/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Renders an `example` tag by just adding the code below the tag.
 *
 * @param {CommentTag} tag The tag to render.
 * @returns {string[]}
 */
const renderExampleTag = (tag) => [
  `@${tag.tag}`,
  ...tag.description.split('\n'),
];

module.exports.renderExampleTag = renderExampleTag;
