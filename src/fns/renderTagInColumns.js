const R = require('ramda');
const { splitText } = require('./splitText');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Renders a JSDoc tag using the `columns` style: there's a column for the tag, the type, the
 * name and the description, and if the description is longer than the available space, it will
 * be splitted in multiple lines, with padding for the other columns on each new line.
 *
 * @callback RenderTagInColumnsFn
 * @param {number}     tagColumnWidth          The width of the column for the tag, including the
 *                                             `@` symbol.
 * @param {number}     typeColumnWidth         The width of the column for the type, it will only
 *                                             be used if the tag has a `type` property.
 * @param {number}     nameColumnWidth         The width of the column for the name, it will only
 *                                             be used if the tag has a `name` property.
 * @param {number}     descriptionColumnWidth  The width of the column for th description.
 * @param {CommentTag} tag                     The tag to render.
 * @returns {string[]}
 */

/**
 * @type {RenderTagInColumnsFn}
 * @todo Add option to keep the space of the type column even if there's no type.
 */
const renderTagInColumns = R.curry((
  tagColumnWidth,
  typeColumnWidth,
  nameColumnWidth,
  descriptionColumnWidth,
  tag,
) => {
  const descriptionLines = tag.description ?
    splitText(tag.description, descriptionColumnWidth) :
    [''];

  const firstLineParts = [
    `@${tag.tag}`.padEnd(tagColumnWidth, ' '),
  ];

  let descriptionPaddingWidth = tagColumnWidth;
  if (tag.type) {
    firstLineParts.push(`{${tag.type}}`.padEnd(typeColumnWidth));
    descriptionPaddingWidth += typeColumnWidth;
  }

  if (tag.name) {
    firstLineParts.push(tag.name.padEnd(nameColumnWidth));
    descriptionPaddingWidth += nameColumnWidth;
  }

  firstLineParts.push(descriptionLines.shift());
  const firstLine = firstLineParts.join('').trim();
  const descriptionPadding = ' '.repeat(descriptionPaddingWidth);
  return [
    firstLine,
    ...descriptionLines.map((line) => `${descriptionPadding}${line}`),
  ];
});

module.exports.renderTagInColumns = renderTagInColumns;
