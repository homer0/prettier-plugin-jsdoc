import * as R from 'ramda';
import { splitText } from './splitText.js';
import { get, createProvider } from './app.js';

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * @typedef {Object} RenderTagInLineOptions
 * @property {number}  width                       The available width for the lines.
 * @property {number}  typePadding                 The amount of padding between the tag
 *                                                 and a type.
 * @property {number}  namePadding                 The amount of padding between a type or
 *                                                 a tag, and a name.
 * @property {number}  descriptionPadding          The amount of padding between a name
 *                                                 and a description.
 * @property {boolean} descriptionInTheSameLine    Whether to attempt to keep the
 *                                                 description in the same line as the
 *                                                 tag, if it fits.
 * @property {number}  inlineDescriptionMinLength  The minimum length a description must
 *                                                 have to be kept in the same line as the
 *                                                 tag when `descriptionInTheSameLine` is
 *                                                 `true`.
 */

/**
 * Renders a JSDoc tag using the `inline` style: one line with the tag, type and name, and
 * then the description can be in the same line or not, depending on the
 * `descriptionInTheSameLine` parameter and if it fits in the available width.
 *
 * This is an internal function because the feature to keep the description in the same
 * line was introduced in a minor version, so it avoid breaking changes in the current
 * version, a new render function was added, but internally, both functions use the same
 * implementation. In a future major release, the new render function and this internal
 * will be removed, and the logic will remain only in the `renderTagInLine` function.
 *
 * @param {RenderTagInLineOptions} options  The options for rendering the tag.
 * @param {CommentTag}             tag      The tag to render.
 * @returns {string[]}
 * @ignore
 */
const renderTagInLineInternal = (options, tag) => {
  const {
    width,
    typePadding,
    namePadding,
    descriptionPadding,
    descriptionInTheSameLine,
    inlineDescriptionMinLength,
  } = options;
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
      const topLine = `${tagHeaderWithSpace}${nameFirstLine}`.trimEnd();
      if (topLine.length > width) {
        result = [tagHeaderWithSpace.trimEnd(), nameFirstLine];
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
    result = [`${tagHeaderWithSpace}${nameLines.shift()}`.trimEnd()];
    if (nameLines.length) {
      const namePaddingForLine = ' '.repeat(tagHeaderWithSpace.length);
      result.push(...nameLines.map((line) => `${namePaddingForLine}${line}`));
    }
  }

  if (!tag.description) {
    return result;
  }

  if (descriptionInTheSameLine) {
    const lastLine = result.at(-1);
    const availableWidth = width - lastLine.length - descriptionPadding;
    if (availableWidth >= inlineDescriptionMinLength) {
      const descriptionLines = get(splitText)(tag.description, availableWidth);
      const firstDescriptionLine = descriptionLines.shift();
      result[result.length - 1] =
        `${lastLine}${' '.repeat(descriptionPadding)}${firstDescriptionLine}`;
      if (descriptionLines.length) {
        const descriptionPaddingForLine = ' '.repeat(
          lastLine.length + descriptionPadding,
        );
        result.push(
          ...descriptionLines.map((line) => `${descriptionPaddingForLine}${line}`),
        );
      }
    } else {
      result.push(...splitText(tag.description, width));
    }
  } else {
    result.push(...splitText(tag.description, width));
  }

  return result;
};

/**
 * Renders a JSDoc tag using the `inline` style: one line with the tag, type and name, and
 * then the description is moved to another line. This is used when there's not enough
 * space to add the description as a column.
 *
 * @callback RenderTagInLineFn
 * @param {number}     width        The available width for the lines.
 * @param {number}     typePadding  The amount of padding between the tag and a type.
 * @param {number}     namePadding  The amount of padding between a type or a tag, and a
 *                                  name.
 * @param {CommentTag} tag          The tag to render.
 * @returns {string[]}
 */

/**
 * @type {RenderTagInLineFn}
 * @todo Refactor how the multiline names are handled.
 */
export const renderTagInLine = R.curry((width, typePadding, namePadding, tag) =>
  renderTagInLineInternal(
    {
      width,
      typePadding,
      namePadding,
      descriptionPadding: 0,
      descriptionInTheSameLine: false,
      inlineDescriptionMinLength: 0,
    },
    tag,
  ),
);

/**
 * Renders a JSDoc tag using the `inline` style: one line with the tag, type and name, and
 * then the description can be in the same line or not, depending on the
 * `descriptionInTheSameLine` parameter and if it fits in the available width.
 *
 * @callback RenderTagInLineWithDescriptionFn
 * @param {RenderTagInLineOptions} options  The options for rendering the tag.
 * @param {CommentTag}             tag      The tag to render.
 * @returns {string[]}
 */

/**
 * @type {RenderTagInLineWithDescriptionFn}
 */
export const renderTagInLineWithDescription = R.curry((options, tag) =>
  renderTagInLineInternal(options, tag),
);
export const provider = createProvider('renderTagInLine', {
  renderTagInLine,
  renderTagInLineWithDescription,
});
