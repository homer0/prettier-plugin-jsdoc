const R = require('ramda');
const { splitText } = require('./splitText');
const { isTag, ensureSentence } = require('./utils');
const { renderExampleTag } = require('./renderExampleTag');
const { renderTagInLine } = require('./renderTagInLine');
const { renderTagInColumns } = require('./renderTagInColumns');
const { renderTagOriginal } = require('./renderTagOriginal');
const {
  getTagsWithNameAsDescription,
  getTagsThatRequireColumns,
} = require('./constants');
const { get, provider } = require('./app');

/**
 * @typedef {import('../types').CommentBlock} CommentBlock
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 */

/**
 * @typedef {Object} TagColumnsWidthData
 * @property {boolean}                 canUseColumns  Whether or not the tag can use
 *                                                    columns.
 * @property {Object.<string, number>} columnsWidth   A dictionary of the columns' width
 *                                                    for the tag.
 */

/**
 * @typedef {Object} LengthData
 * @property {number}  tag                       The length of the longest tag name, in
 *                                               the current context.
 * @property {number}  type                      The length of the longest type, in the
 *                                               current context.
 * @property {number}  name                      The length of the longest name, in the
 *                                               current context.
 * @property {boolean} hasMultilineType          Whether or not, one of the types is
 *                                               multiline.
 * @property {boolean} hasADescriptionParagraph  Whether or not, one of the descriptions
 *                                               is ona new paragraph (detected with the
 *                                               `descriptionParagraph` flag).
 */

/**
 * @typedef {LengthData & BlockLengthDataProperties} BlockLengthData
 */

/**
 * @typedef {Object} BlockLengthDataProperties
 * @property {Object.<string, LengthData>} byTag  A dictionary with the properties length
 *                                                information by tag.
 */

/**
 * The length of the at symbol (`@`); this is used as a reference when calculating the
 * width of the column for a tag.
 *
 * @type {number}
 */
const TAG_SYMBOL_LENGTH = 1;
/**
 * The length of the opening and closing curly brackets (`{}`); this is ued as a reference
 * when calculating the widget of the column for a type.
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
const renderTagsInLines = (width, options, tags) => {
  const useIsTag = get(isTag);
  return R.compose(
    R.flatten,
    R.map(
      R.ifElse(
        useIsTag([...options.jsdocIgnoreTags]),
        get(renderTagOriginal),
        R.ifElse(
          useIsTag('example'),
          get(renderExampleTag)(R.__, width, options),
          get(renderTagInLine)(
            width,
            options.jsdocMinSpacesBetweenTagAndType,
            options.jsdocMinSpacesBetweenTypeAndName,
          ),
        ),
      ),
    ),
  )(tags);
};

/**
 * Renders a list of tags using the columns format.
 *
 * @param {Object.<string, number>} columnsWidth  A dictionary of the columns' widths.
 * @param {number}                  fullWidth     The full width available, for content
 *                                                that can't be rendered on a column.
 * @param {PrettierOptions}         options       The options sent to the plugin.
 * @param {CommentTag[]}            tags          The list of tags to render.
 * @returns {string[]} The list of lines.
 */
const renderTagsInColumns = (columnsWidth, fullWidth, options, tags) => {
  const useIsTag = get(isTag);
  return R.compose(
    R.flatten,
    R.map(
      R.ifElse(
        useIsTag([...options.jsdocIgnoreTags]),
        get(renderTagOriginal),
        R.ifElse(
          useIsTag('example'),
          get(renderExampleTag)(R.__, fullWidth, options),
          get(renderTagInColumns)(
            columnsWidth.tag,
            columnsWidth.type,
            columnsWidth.name,
            columnsWidth.description,
          ),
        ),
      ),
    ),
  )(tags);
};

/**
 * Renders a list of tags while trying to use the columns format, but if is not possible
 * (based on `tagsData`), it will fallback to the in lines format.
 *
 * @param {Object.<string, TagColumnsWidthData>} tagsData
 * A dictionary with the information of the columns for each tag type found on the block.
 * @param {number} width
 * The available width for the JSDoc block.
 * @param {PrettierOptions} options
 * The options sent to the plugin.
 * @param {CommentTag[]} tags
 * The list of tags to render.
 * @returns {string[]}
 * The list of lines.
 */
const tryToRenderTagsInColumns = (tagsData, width, options, tags) => {
  const useIsTag = get(isTag);
  return R.compose(
    R.flatten,
    R.map(
      R.ifElse(
        useIsTag([...options.jsdocIgnoreTags]),
        get(renderTagOriginal),
        R.ifElse(
          useIsTag('example'),
          get(renderExampleTag)(R.__, width, options),
          (tag) => {
            const data = tagsData[tag.tag];
            return data.canUseColumns
              ? get(renderTagInColumns)(
                  data.columnsWidth.tag,
                  data.columnsWidth.type,
                  data.columnsWidth.name,
                  data.columnsWidth.description,
                  tag,
                )
              : get(renderTagInLine)(
                  width,
                  options.jsdocMinSpacesBetweenTagAndType,
                  options.jsdocMinSpacesBetweenTypeAndName,
                  tag,
                );
          },
        ),
      ),
    ),
  )(tags);
};

/**
 * Given a list of tags, it calculates the longest tag, type and name in the context of
 * the block and for each tag.
 *
 * @param {CommentTag[]}    tags     The list of tags.
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @returns {BlockLengthData}
 */
const getLengthsData = (tags, options) =>
  tags.reduce(
    (acc, tag) => {
      if (options.jsdocIgnoreTags.includes(tag.tag)) {
        return acc;
      }

      const tagLength = tag.tag.length;
      const typeLength = tag.type.length;
      const hasMultilineType = tag.type.includes('\n');
      const hasADescriptionParagraph = tag.descriptionParagraph;
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
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @param {LengthData}      data     The information for the longest properties.
 * @param {number}          width    The available space for the JSDoc block.
 * @returns {Object.<string, number>}
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
 * @param {Object.<string, LengthData>} lengthByTag  A dictionary with the properties
 *                                                   length information by tag.
 * @param {number}                      width        The available space for the JSDoc
 *                                                   block.
 * @param {PrettierOptions}             options      The options sent to the plugin.
 * @returns {Object.<string, TagColumnsWidthData>}
 */
const getTagsData = (lengthByTag, width, options) => {
  const tagsWithNameAsDesc = get(getTagsWithNameAsDescription)();
  const tagsThatRequireColumns = get(getTagsThatRequireColumns)();
  return Object.entries(lengthByTag).reduce((acc, [tagName, tagInfo]) => {
    const columnsWidth = get(calculateColumnsWidth)(options, tagInfo, width);
    if (tagsWithNameAsDesc.includes(tagName)) {
      columnsWidth.description = 0;
      columnsWidth.name = width - columnsWidth.tag - columnsWidth.type;
    }

    const canUseColumns =
      tagsThatRequireColumns.includes(tagName) ||
      (!tagInfo.hasMultilineType &&
        (!options.jsdocAllowDescriptionOnNewLinesForTags.includes(tagName) ||
          !tagInfo.hasADescriptionParagraph) &&
        (columnsWidth.description <= 0 ||
          columnsWidth.description >= options.jsdocDescriptionColumnMinLength) &&
        width - columnsWidth.tag - columnsWidth.type - columnsWidth.name >= 0);

    return {
      ...acc,
      [tagName]: {
        canUseColumns,
        columnsWidth,
      },
    };
  }, {});
};

/**
 * Renders a JSDoc block in a list of lines.
 *
 * @callback RenderFn
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @param {number}          column   The column where the lines should start. This is used
 *                                   to calculate the available space for the texts.
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
      description = get(ensureSentence)(description);
    }

    lines.push(...get(splitText)(description, width));
    if (block.tags.length) {
      lines.push(...new Array(options.jsdocLinesBetweenDescriptionAndTags).fill(''));
    }
  }

  if (options.jsdocUseColumns) {
    const data = get(getLengthsData)(block.tags, options);
    if (options.jsdocGroupColumnsByTag) {
      const tagsData = get(getTagsData)(data.byTag, width, options);
      let atLeastOneCannot;
      if (options.jsdocIgnoreNewLineDescriptionsForConsistentColumns) {
        atLeastOneCannot = Object.entries(tagsData).find(
          ([tagName, info]) =>
            !options.jsdocAllowDescriptionOnNewLinesForTags.includes(tagName) &&
            !info.canUseColumns,
        );
      } else {
        atLeastOneCannot = Object.values(tagsData).find((info) => !info.canUseColumns);
      }

      if (atLeastOneCannot && options.jsdocConsistentColumns) {
        lines.push(...get(renderTagsInLines)(width, options, block.tags));
      } else {
        lines.push(
          ...get(tryToRenderTagsInColumns)(tagsData, width, options, block.tags),
        );
      }
    } else {
      const columnsWidth = get(calculateColumnsWidth)(options, data, width);
      if (columnsWidth.description >= options.jsdocDescriptionColumnMinLength) {
        lines.push(...get(renderTagsInColumns)(columnsWidth, width, options, block.tags));
      } else {
        lines.push(...get(renderTagsInLines)(width, options, block.tags));
      }
    }
  } else {
    lines.push(...get(renderTagsInLines)(width, options, block.tags));
  }

  return lines;
});

module.exports.render = render;
module.exports.renderTagsInLines = renderTagsInLines;
module.exports.renderTagsInColumns = renderTagsInColumns;
module.exports.tryToRenderTagsInColumns = tryToRenderTagsInColumns;
module.exports.getLengthsData = getLengthsData;
module.exports.calculateColumnsWidth = calculateColumnsWidth;
module.exports.getTagsData = getTagsData;
module.exports.provider = provider('render', module.exports);
