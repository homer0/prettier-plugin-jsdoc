const R = require('ramda');
const { findTagIndex } = require('./utils');
const { get, provider } = require('./app');

/**
 * @typedef {import('../types').PJPAccessTagOptions} PJPAccessTagOptions
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Formats and normalizes the use of the access tag based on the plugin options.
 *
 * @callback FormatAccessTagFn
 * @param {CommentTag[]}        tags     The list of tags where the transformations should
 *                                       happen.
 * @param {PJPAccessTagOptions} options  The plugin options for the access tag.
 * @returns {CommentTag[]}
 */

/**
 * @type {FormatAccessTagFn}
 */
const formatAccessTag = R.curry((tags, options) => {
  const useFindTagIndex = get(findTagIndex);
  const indexes = tags.reduce(
    R.compose(
      useFindTagIndex('access', 'accessTag'),
      useFindTagIndex(['public', 'protected', 'private'], 'typeTag'),
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
        result = R.adjust(
          indexes.typeTag,
          (typeTag) => ({
            tag: 'access',
            type: '',
            name: typeTag.tag,
            description: '',
          }),
          tags,
        );
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
      result = R.adjust(
        indexes.accessTag,
        (accessTag) => ({
          tag: accessTag.name,
          type: '',
          name: '',
          description: '',
        }),
        tags,
      );
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
   * for the short circuit is so the implementation can always assume that the method returns
   * a clone, no matter if no modification was made.
   */
  return result || R.clone(tags);
});

module.exports.formatAccessTag = formatAccessTag;
module.exports.provider = provider('formatAccessTag', module.exports);
