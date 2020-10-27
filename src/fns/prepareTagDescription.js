const R = require('ramda');
const { ensureSentence, hasValidProperty, isTag } = require('./utils');

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
  R.allPass([hasValidProperty('description'), R.complement(isTag(['example', 'examples']))]),
  R.compose(
    R.assoc('description', R.__, tag),
    ensureSentence,
    R.prop('description'),
  ),
  tag,
);

module.exports.prepareTagDescription = prepareTagDescription;
