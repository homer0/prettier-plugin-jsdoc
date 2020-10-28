const R = require('ramda');
const { splitText } = require('./splitText');
const { getFn, provider } = require('../app');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * When a tag has a multiline description and/or multiline name, this function will take care of
 * rendering the rest of lines, respecting each property column space and add the necessary padding.
 *
 * @param {number}   column            The column where the lines should start.
 * @param {boolean}  hasName           Whether or not there was a valid `name` property. Based on
 *                                     that, the function will decide if the space for the 'name
 *                                     column' should be padding or if it should be just removed.
 * @param {number}   nameColumnWidth   The width of the column for the name.
 * @param {string[]} nameLines         The lines for the name.
 * @param {string[]} descriptionLines  The lines for the description.
 * @returns {string[]}
 */
const renderRest = (
  column,
  hasName,
  nameColumnWidth,
  nameLines,
  descriptionLines,
) => {
  const result = [];
  const limit = Math.max(nameLines.length, descriptionLines.length);
  const padding = ' '.repeat(column);
  const namePadding = hasName ? ' '.repeat(nameColumnWidth) : '';
  for (let i = 0; i < limit; i++) {
    const nameLine = nameLines[i] ?
      nameLines[i].padEnd(nameColumnWidth) :
      namePadding;
    const descriptionLine = descriptionLines[i] ?
      descriptionLines[i] :
      '';

    result.push(`${padding}${nameLine}${descriptionLine}`);
  }

  return result;
};

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
  const useSplitText = getFn(splitText);
  const descriptionLines = tag.description ?
    useSplitText(tag.description, descriptionColumnWidth) :
    [''];
  const descriptionFirstLine = descriptionLines.shift();
  let nameLines = [];

  const firstLineParts = [
    `@${tag.tag}`.padEnd(tagColumnWidth, ' '),
  ];

  let restColumn = tagColumnWidth;
  if (tag.type) {
    firstLineParts.push(`{${tag.type}}`.padEnd(typeColumnWidth));
    restColumn += typeColumnWidth;
  }

  if (tag.name) {
    nameLines = useSplitText(tag.name, nameColumnWidth);
    firstLineParts.push(nameLines.shift().padEnd(nameColumnWidth));
  }

  firstLineParts.push(descriptionFirstLine);
  const firstLine = firstLineParts.join('').trim();
  return [
    firstLine,
    ...getFn(renderRest)(
      restColumn,
      !!tag.name,
      nameColumnWidth,
      nameLines,
      descriptionLines,
    ),
  ]
  .map((line) => line.trimEnd());
});

module.exports.renderTagInColumns = renderTagInColumns;
module.exports.renderRest = renderRest;
module.exports.provider = provider('renderTagInColumns', module.exports);
