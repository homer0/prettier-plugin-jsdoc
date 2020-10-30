const R = require('ramda');
const { ensureSentence, hasValidProperty, isTag } = require('./utils');
const { getTagsWithNameAsDescription } = require('./constants');
const { get, provider } = require('./app');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Takes a tag property, transforms it into a sentence and updates the tag.
 *
 * @callback MakePropertyIntoSentenceFn
 * @param {string}     property The name of the property to transform.
 * @param {CommentTag} tag      The tag where the property will be updated.
 * @returns {CommentTag}
 */

/**
 * @type {MakePropertyIntoSentenceFn}
 */
const makePropertyIntoSentence = R.curry((property, tag) => R.compose(
  R.assoc(property, R.__, tag),
  get(ensureSentence),
  R.prop(property),
)(tag));

/**
 * Prepares the description of a tag in order for it to be rendered.
 *
 * @param {CommentTag} tag The tag which description will be formatted.
 * @returns {CommentTag}
 */
const prepareTagDescription = (tag) => {
  const useHasValidProperty = get(hasValidProperty);
  const useIsStag = get(isTag);
  const useMakePropertyInstoSentence = get(makePropertyIntoSentence);
  return R.when(
    R.complement(useIsStag(['example', 'examples'])),
    R.compose(
      R.when(
        useHasValidProperty('description'),
        useMakePropertyInstoSentence('description'),
      ),
      R.when(
        R.allPass([
          useIsStag(get(getTagsWithNameAsDescription)()),
          useHasValidProperty('name'),
        ]),
        useMakePropertyInstoSentence('name'),
      ),
    ),
    tag,
  );
};

module.exports.prepareTagDescription = prepareTagDescription;
module.exports.provider = provider('prepareTagDescription', module.exports);
