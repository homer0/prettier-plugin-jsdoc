const { provider } = require('./app');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Takes a list of tags and trims the values of the properties the plugins uses (type, name and
 * description).
 *
 * @param {CommentTag[]} tags The list of tags to format.
 * @returns {CommentTag[]}
 */
const trimTagsProperties = (tags) => {
  const knownProperties = ['type', 'name', 'description'];
  return tags.map((tag) => Object.entries(tag).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: knownProperties.includes(key) ? value.trim() : value,
    }),
    {},
  ));
};

module.exports.trimTagsProperties = trimTagsProperties;
module.exports.provider = provider('trimTagsProperties', module.exports);
