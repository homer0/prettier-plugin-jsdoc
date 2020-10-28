const R = require('ramda');
const { ensureSentence, hasValidProperty, isTag } = require('./utils');
const { getFn, provider } = require('../app');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Prepares the description of a tag in order for it to be rendered.
 *
 * @param {CommentTag} tag The tag which description will be formatted.
 * @returns {CommentTag}
 */
const prepareTagDescription = (tag) => R.when(
  R.allPass([
    getFn(hasValidProperty)('description'),
    R.complement(getFn(isTag)(['example', 'examples'])),
  ]),
  R.compose(
    R.assoc('description', R.__, tag),
    getFn(ensureSentence),
    R.prop('description'),
  ),
  tag,
);

module.exports.prepareTagDescription = prepareTagDescription;
module.exports.provider = provider('prepareTagDescription', module.exports);
