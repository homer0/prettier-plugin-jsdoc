const R = require('ramda');
const { splitText } = require('./splitText');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Renders a JSDoc tag using the `inline` style: one line with the tag, type and name, and then
 * the description is moved to another line. This is used when there's not enough space to add
 * the description as a column.
 *
 * @callback RenderTagInLineFn
 * @param {number}     width        The available width for the lines.
 * @param {number}     typePadding  The amount of padding between the tag and a type.
 * @param {number}     namePadding  The amount of padding between a type or a tag, and a name.
 * @param {CommentTag} tag          The tag to render.
 * @returns {string[]}
 */

/**
 * @type {RenderTagInLineFn}
 */
const renderTagInLine = R.curry((width, typePadding, namePadding, tag) => {
  const useNamePadding = ' '.repeat(namePadding);
  const headerRest = tag.type ?
    `${' '.repeat(typePadding)}{${tag.type}}${useNamePadding}${tag.name}` :
    `${useNamePadding}${tag.name}`;
  const header = `@${tag.tag}${headerRest}`;

  const result = [header.trimRight()];
  if (tag.description) {
    result.push(...splitText(tag.description, width));
  }

  return result;
});

module.exports.renderTagInLine = renderTagInLine;
