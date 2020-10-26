const R = require('ramda');
const { splitText } = require('./splitText');
const { isTag, ensureSentence } = require('./utils');
const { renderExampleTag } = require('./renderExampleTag');
const { renderTagInLine } = require('./renderTagInLine');
const { renderTagInColumns } = require('./renderTagInColumns');

/**
 * @typedef {import('../types').CommentBlock} CommentBlock
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 */

/**
 * @typedef {Object} TagColumnsWidthData
 * @property {boolean}                canUseColumns  Whether or not the tag can use columns.
 * @property {Object.<string,number>} columnsWidth   A dictionary of the columns' width for the tag.
 */

/**
 * @typedef {Object} LengthData
 * @property {number}  tag                       The length of the longest tag name, in the current
 *                                               context.
 * @property {number}  type                      The length of the longest type, in the current
 *                                               context.
 * @property {number}  name                      The length of the longest name, in the current
 *                                               context.
 * @property {boolean} hasMultilineType          Whether or not, one of the types is multiline.
 * @property {boolean} hasADescriptionParagraph  Whether or not, one of the descriptions is ona new
 *                                               paragraph (detected with the `descriptionParagraph`
 *                                               flag).
 */

/**
 * @typedef {LengthData & BlockLengthDataProperties} BlockLengthData
 */

/**
 * @typedef {Object} BlockLengthDataProperties
 * @property {Object.<string,LengthData>} byTag  A dictionary with the properties length
 *                                               information by tag.
 */

/**
 * The length of the at symbol (`@`); this is used as a reference when calculating the width of
 * the column for a tag.
 *
 * @type {number}
 */
const TAG_SYMBOL_LENGTH = 1;
/**
 * The length of the opening and closing curly brackets (`{}`); this is ued as a reference when
 * calculating the widget of the column for a type.
 *
 * @type {number}
 */
const TYPE_WRAPPERS_LENGTH = 2;

/**
 * Renders a list of tags with the description below the tag, name and type (in-lines).
 *
 * @param {number}          width    The available width for the JSDoc block.
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @param {CommentTag[]}    tags     The list of tags to render.
 * @returns {string[]} The list of lines.
 */
const renderTagsInlines = (width, options, tags) => R.compose(
  R.flatten,
  R.map(
    R.ifElse(
      isTag('example'),
      renderExampleTag(R.__, width, options),
      renderTagInLine(
        width,
        options.jsdocMinSpacesBetweenTagAndType,
        options.jsdocMinSpacesBetweenTypeAndName,
      ),
    ),
  ),
)(tags);

/**
 * Renders a list of tags using the columns format.
 *
 * @param {Object.<string,number>} columnsWidth  A dictionary of the columns' widths.
 * @param {number}                 fullWidth     The full width available, for content that can't
 *                                               be rendered on a column.
 * @param {PrettierOptions}        options       The options sent to the plugin.
 * @param {CommentTag[]}           tags          The list of tags to render.
 * @returns {string[]} The list of lines.
 */
const renderTagsInColumns = (columnsWidth, fullWidth, options, tags) => R.compose(
  R.flatten,
  R.map(
    R.ifElse(
      isTag('example'),
      renderExampleTag(R.__, fullWidth, options),
      renderTagInColumns(
        columnsWidth.tag,
        columnsWidth.type,
        columnsWidth.name,
        columnsWidth.description,
      ),
    ),
  ),
)(tags);

/**
 * Renders a list of tags while trying to use the columns format, but if is not possible (based
 * on `tagsData`), it will falback to the in lines format.
 *
 * @param {Object.<string,TagColumnsWidthData>} tagsData  A dictionary with the information of the
 *                                                        columns for each tag type found on the
 *                                                        block.
 * @param {number}                              width     The available width for the JSDoc block.
 * @param {PrettierOptions}                     options   The options sent to the plugin.
 * @param {CommentTag[]}                        tags      The list of tags to render.
 * @returns {string[]} The list of lines.
 */
const tryToRenderTagsInColums = (tagsData, width, options, tags) => R.compose(
  R.flatten,
  R.map(
    R.ifElse(
      isTag('example'),
      renderExampleTag(R.__, width, options),
      (tag) => {
        const data = tagsData[tag.tag];
        return data.canUseColumns ?
          renderTagInColumns(
            data.columnsWidth.tag,
            data.columnsWidth.type,
            data.columnsWidth.name,
            data.columnsWidth.description,
            tag,
          ) :
          renderTagInLine(
            width,
            options.jsdocMinSpacesBetweenTagAndType,
            options.jsdocMinSpacesBetweenTypeAndName,
            tag,
          );
      },
    ),
  ),
)(tags);

/**
 * Given a list of tags, it calculates the longest tag, type and name in the context of the block
 * and for each tag.
 *
 * @param {CommentTag[]} tags  The list of tags.
 * @returns {BlockLengthData}
 */
const getLengthsData = (tags) => tags.reduce(
  (acc, tag) => {
    const tagLength = tag.tag.length;
    const typeLength = tag.type.length;
    const hasMultilineType = tag.type.includes('\n');
    const hasADescriptionParagraph = tag.descriptionParagrah;
    const nameLength = tag.name.length;
    if (tagLength > acc.tag) {
      acc.tag = tagLength;
    }
    if (typeLength > acc.type) {
      acc.type = typeLength;
    }
    if (hasMultilineType) {
      acc.hasMultilineType = hasMultilineType;
    }
    if (hasADescriptionParagraph) {
      acc.hasADescriptionParagraph = hasADescriptionParagraph;
    }
    if (nameLength > acc.name) {
      acc.name = nameLength;
    }

    if (acc.byTag[tag.tag]) {
      const tagInfo = acc.byTag[tag.tag];
      if (typeLength > tagInfo.type) {
        tagInfo.type = typeLength;
      }
      if (nameLength > tagInfo.name) {
        tagInfo.name = nameLength;
      }
      if (hasMultilineType) {
        tagInfo.hasMultilineType = hasMultilineType;
      }
      if (hasADescriptionParagraph) {
        tagInfo.hasADescriptionParagraph = hasADescriptionParagraph;
      }
    } else {
      acc.byTag[tag.tag] = {
        tag: tagLength,
        type: typeLength,
        name: nameLength,
        hasMultilineType,
        hasADescriptionParagraph,
      };
    }

    return acc;
  },
  {
    tag: 0,
    type: 0,
    name: 0,
    hasMultilineType: false,
    hasADescriptionParagraph: false,
    byTag: {},
  },
);
/**
 * Calculates the width of the columns for a specific context (`data`).
 *
 * @param {PrettierOptions} options The options sent to the plugin.
 * @param {LengthData}      data    The information for the longest properties.
 * @param {number}          width   The available space for the JSDoc block.
 * @returns {Object.<string,number>}
 */
const calculateColumnsWidth = (options, data, width) => {
  const {
    jsdocMinSpacesBetweenTagAndType,
    jsdocMinSpacesBetweenTypeAndName,
    jsdocMinSpacesBetweenNameAndDescription,
  } = options;
  const longestLineLength =
    TAG_SYMBOL_LENGTH +
    data.tag +
    jsdocMinSpacesBetweenTagAndType +
    data.type +
    TYPE_WRAPPERS_LENGTH +
    jsdocMinSpacesBetweenTypeAndName +
    data.name +
    jsdocMinSpacesBetweenNameAndDescription;
  const description = width - longestLineLength;
  const tag = TAG_SYMBOL_LENGTH + data.tag + jsdocMinSpacesBetweenTagAndType;
  const type = TYPE_WRAPPERS_LENGTH + data.type + jsdocMinSpacesBetweenTypeAndName;
  const name = data.name + jsdocMinSpacesBetweenNameAndDescription;
  return {
    tag,
    type,
    name,
    description,
  };
};
/**
 * Generates a dictionary with the columns width information for each tag.
 *
 * @param {Object.<string,LengthData>} lengthByTag  A dictionary with the properties length
 *                                                  information by tag.
 * @param {number}                     width        The available space for the JSDoc block.
 * @param {PrettierOptions}            options      The options sent to the plugin.
 * @returns {Object.<string,TagColumnsWidthData>}
 */
const getTagsData = (lengthByTag, width, options) => Object.entries(lengthByTag).reduce(
  (acc, [tagName, tagInfo]) => {
    const columnsWidth = calculateColumnsWidth(options, tagInfo, width);
    return {
      ...acc,
      [tagName]: {
        canUseColumns: (
          !tagInfo.hasMultilineType &&
          (
            !options.jsdocAllowDescriptionOnNewLinesForTags.includes(tagName) ||
            !tagInfo.hasADescriptionParagraph
          ) &&
          columnsWidth.description >= options.jsdocDescriptionColumnMinLength
        ),
        columnsWidth,
      },
    };
  },
  {},
);

/**
 * Renders a JSDoc block in a list of lines.
 *
 * @callback RenderFn
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @param {number}          column   The column where the lines should start. This is used to
 *                                   calculate the available space for the texts.
 * @param {CommentBlock}    block    The block to render.
 * @returns {string[]}
 */

/**
 * @type {RenderFn}
 */
const render = R.curry((options, column, block) => {
  const prefix = `${' '.repeat(column)} * `;
  const usePrintWidth = options.jsdocPrintWidth || options.printWidth;
  const width = usePrintWidth - prefix.length;
  const lines = [];

  if (block.description) {
    let { description } = block;
    if (options.jsdocEnsureDescriptionsAreSentences) {
      description = ensureSentence(description);
    }

    lines.push(...splitText(description, width));
    lines.push(...(new Array(options.jsdocLinesBetweenDescriptionAndTags)).fill(''));
  }

  if (options.jsdocUseColumns) {
    const data = getLengthsData(block.tags);
    if (options.jsdocGroupColumnsByTag) {
      const tagsData = getTagsData(data.byTag, width, options);
      const atLeastOneCannot = Object.entries(tagsData).find(([tagName, info]) => (
        !options.jsdocAllowDescriptionOnNewLinesForTags.includes(tagName) &&
        !info.canUseColumns
      ));
      if (atLeastOneCannot && options.jsdocConsistentColumns) {
        lines.push(...renderTagsInlines(width, options, block.tags));
      } else {
        lines.push(...tryToRenderTagsInColums(tagsData, width, options, block.tags));
      }
    } else {
      const columnsWidth = calculateColumnsWidth(options, data, width);
      if (columnsWidth.description >= options.jsdocDescriptionColumnMinLength) {
        lines.push(...renderTagsInColumns(columnsWidth, width, options, block.tags));
      } else {
        lines.push(...renderTagsInlines(width, options, block.tags));
      }
    }
  } else {
    lines.push(...renderTagsInlines(width, options, block.tags));
  }

  return lines;
});

module.exports.render = render;
