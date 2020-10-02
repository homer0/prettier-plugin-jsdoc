const R = require('ramda');
const { TAGS_SYNONYMS } = require('./constants');

/**
 * @typedef {import('./types').PJPDescriptionTagOptions} PJPDescriptionTagOptions
 * @typedef {import('./types').PJPAccessTagOptions} PJPAccessTagOptions
 * @typedef {import('./types').CommentTag} CommentTag
 * @typedef {import('./types').CommentBlock} CommentBlock
 */

/**
 * Replaces the tags synonyms for their "official" version.
 *
 * @param {CommentTag[]} tags  The list of tags where the replacement should happen.
 * @returns {CommentTag[]}
 */
const replaceTagsSynonyms = R.map((tag) => ({
  ...tag,
  tag: R.propOr(tag.tag, tag.tag, TAGS_SYNONYMS),
}));
/**
 * Ensures a given object is an array.
 *
 * @param {T|T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = R.unless(R.is(Array), R.of);
/**
 * Creates a reducer that finds the last index of a tag on a list and saves it on the
 * accumulator using a custom property.
 *
 * @param {string|string[]} targetTag  The name of the tag or tags the function should find.
 * @param {string}          propName   The name of the property that will be used for the
 *                                     accumulator.
 * @returns {Object.<string,number>}
 */
const findTagIndex = R.curry((targetTag, propName, step) => {
  const targetTags = ensureArray(targetTag);
  return (acc, tag, index) => {
    const nextAcc = targetTags.includes(tag.tag) ?
      R.assocPath([propName], index, acc) :
      acc;
    return step(nextAcc, tag, index);
  };
});
/**
 * Formats and normalizes the use of the access tag based on the plugin options.
 *
 * @param {CommentTag[]}        tags     The list of tags where the transformations should happen.
 * @param {PJPAccessTagOptions} options  The plugin options for the access tag.
 * @returns {CommentTag[]}
 */
const formatAccessTag = (tags, options) => {
  const indexes = tags.reduce(
    R.compose(
      findTagIndex('access', 'accessTag'),
      findTagIndex(
        ['public', 'protected', 'private'],
        'typeTag',
      ),
    )(R.identity),
    {
      accessTag: -1,
      typeTag: -1,
    },
  );

  let result;
  // If @access tags are allowed.
  if (options.jsdocAllowAccessTag) {
    // If @access tag needs to be enforced and there's a access type tag.
    if (options.jsdocEnforceAccessTag && indexes.typeTag > -1) {
      // If there's also an @access tag, just remove the access type tag.
      if (indexes.accessTag > -1) {
        result = R.remove(indexes.typeTag, 1, tags);
        indexes.typeTag = -1;
      } else {
        // If there's a access type tag but no @access tag, replace the access type tag with one.
        result = R.adjust(indexes.typeTag, (typeTag) => ({
          tag: 'access',
          type: '',
          name: typeTag.tag,
          description: '',
        }), tags);
      }
    }
  // If @access tags are not allowed but there's one.
  } else if (indexes.accessTag > -1) {
    // If there's also an access type tag, just remove the @access tag.
    if (indexes.typeTag > -1) {
      result = R.remove(indexes.accessTag, 1, tags);
      indexes.accessTag = -1;
    } else {
      // If there's an @access tag but not access type tag, replace the @access tag with one.
      result = R.adjust(indexes.accessTag, (accessTag) => ({
        tag: accessTag.name,
        type: '',
        name: '',
        description: '',
      }), tags);
    }
  }

  /**
   * If for some reason, there's an access tag and an access type tag and the options allow them
   * both, remove the first one declared.
   */
  if (indexes.accessTag > -1 && indexes.typeTag > -1) {
    const removeIndex = R.min(indexes.accessTag, indexes.typeTag);
    result = R.remove(removeIndex, 1, tags);
  }

  /**
   * Return the modified object, if there's one, or just a clone of the tags list. The reason
   * for the short circuit is so the implementation can always asume that the method returns
   * a clone, no matter if no modification was made.
   */
  return result || R.clone(tags);
};
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

module.exports.replaceTagsSynonyms = replaceTagsSynonyms;
module.exports.formatAccessTag = formatAccessTag;
module.exports.formatDescription = formatDescription;
