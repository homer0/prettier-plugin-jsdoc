const R = require('ramda');
const { splitText } = require('./splitText');
const { get, provider } = require('./app');

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
 * @todo Refactor how the multiline names are handled.
 */
const renderTagInLine = R.curry((width, typePadding, namePadding, tag) => {
  const tagHeader = `@${tag.tag}`;
  const useNamePadding = ' '.repeat(namePadding);
  let result;
  if (tag.type) {
    const useTypePadding = ' '.repeat(typePadding);
    if (tag.type.includes('\n')) {
      const typeLines = tag.type.split('\n');
      const typeFirstLine = typeLines.shift();
      const typeLastLine = typeLines.pop();
      const header = `${tagHeader}${useTypePadding}`;
      result = [
        `${header}{${typeFirstLine}`,
        ...typeLines,
        `${typeLastLine}}${useNamePadding}${tag.name}`,
      ];
    } else {
      const tagHeaderWithSpace = `${tagHeader}${useTypePadding}{${tag.type}}${useNamePadding}`;
      const nameWidth = width - tagHeaderWithSpace.length;
      const nameLines = get(splitText)(tag.name, nameWidth);
      const nameFirstLine = nameLines.shift();
      const topLine = `${tagHeaderWithSpace}${nameFirstLine}`.trimRight();
      if (topLine.length > width) {
        result = [
          tagHeaderWithSpace.trimRight(),
          nameFirstLine,
        ];
      } else {
        result = [topLine];
      }
      if (nameLines.length) {
        const namePaddingForLine = ' '.repeat(tagHeaderWithSpace.length);
        result.push(...nameLines.map((line) => `${namePaddingForLine}${line}`));
      }
    }
  } else {
    const tagHeaderWithSpace = `${tagHeader}${useNamePadding}`;
    const nameWidth = width - tagHeaderWithSpace.length;
    const nameLines = get(splitText)(tag.name, nameWidth);
    result = [`${tagHeaderWithSpace}${nameLines.shift()}`.trimRight()];
    if (nameLines.length) {
      const namePaddingForLine = ' '.repeat(tagHeaderWithSpace.length);
      result.push(...nameLines.map((line) => `${namePaddingForLine}${line}`));
    }
  }

  if (tag.description) {
    result.push(...splitText(tag.description, width));
  }

  return result;
});

module.exports.renderTagInLine = renderTagInLine;
module.exports.provider = provider('renderTagInLine', module.exports);
