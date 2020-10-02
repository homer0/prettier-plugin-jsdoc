const R = require('ramda');

/**
 * @typedef {import('../types').PJPDescriptionTagOptions} PJPDescriptionTagOptions
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').CommentBlock} CommentBlock
 */

/**
 * Finds all possible descriptions of a block (body, description tag, after a definition, etc.),
 * puts them together, and, depending on the options, it adds it on the body or a description tag.
 *
 * @param {CommentBlock}             block    The block to format.
 * @param {PJPDescriptionTagOptions} options  The options that will tell the method how to handle
 *                                            the description.
 * @returns {CommentBlock}
 */
const formatDescription = (block, options) => {
  const result = R.clone(block);
  const { parts, tags, tagIndex } = result.tags.reduce(
    (acc, tag, index) => {
      let nextAcc;
      if (['typedef', 'callback', 'function'].includes(tag.tag)) {
        nextAcc = {
          parts: acc.parts.includes(tag.description) ?
            acc.parts :
            [...acc.parts, tag.description],
          tags: [...acc.tags, { ...tag, description: '' }],
          tagIndex: acc.tagIndex,
        };
      } else if (tag.tag === 'description') {
        const value = `${tag.name} ${tag.description}`.trim();
        nextAcc = {
          parts: acc.parts.includes(value) ?
            acc.parts :
            [...acc.parts, value],
          tags: [...acc.tags, { ...tag, name: '', description: '' }],
          tagIndex: index,
        };
      } else {
        nextAcc = {
          ...acc,
          tags: [...acc.tags, tag],
        };
      }

      return nextAcc;
    },
    {
      parts: [result.description],
      tags: [],
      tagIndex: -1,
    },
  );

  const description = parts
  .filter((part) => part.trim())
  .join('\n\n');

  if (options.jsdocAllowDescriptionTag) {
    if (tagIndex > -1) {
      result.description = '';
      tags[tagIndex].description = description;
    } else if (options.jsdocUseDescriptionTag) {
      result.description = '';
      const descriptionTag = {
        tag: 'description',
        name: '',
        description,
        type: '',
      };
      if (tags.length > 1) {
        tags.splice(1, 0, descriptionTag);
      } else {
        tags.push(descriptionTag);
      }
    } else {
      result.description = description;
    }
  } else {
    if (tagIndex > -1) {
      tags.splice(tagIndex, 1);
    }

    result.description = description;
  }

  result.tags = tags;
  return result;
};

module.exports.formatDescription = formatDescription;
