import * as R from 'ramda';
import { ensureSentence, hasValidProperty, isTag } from './utils.js';
import {
  getTagsWithNameAsDescription,
  getTagsWithDescriptionThatCannotBeSentences,
} from './constants.js';
import { get, createProvider } from './app.js';

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Takes a tag property, transforms it into a sentence and updates the tag.
 *
 * @callback MakePropertyIntoSentenceFn
 * @param {string}     property  The name of the property to transform.
 * @param {CommentTag} tag       The tag where the property will be updated.
 * @returns {CommentTag}
 */

/**
 * @type {MakePropertyIntoSentenceFn}
 */
export const makePropertyIntoSentence = R.curry((property, tag) =>
  R.compose(R.assoc(property, R.__, tag), get(ensureSentence), R.prop(property))(tag),
);

/**
 * Prepares the description of a tag in order for it to be rendered.
 *
 * @param {CommentTag} tag  The tag which description will be formatted.
 * @returns {CommentTag}
 */
export const prepareTagDescription = (tag) => {
  const useHasValidProperty = get(hasValidProperty);
  const useIsStag = get(isTag);
  const useMakePropertyIntoSentence = get(makePropertyIntoSentence);
  const useCannotBeSentence = get(getTagsWithDescriptionThatCannotBeSentences)();
  return R.unless(
    useIsStag(useCannotBeSentence),
    R.when(
      R.complement(useIsStag(['example', 'examples'])),
      R.compose(
        R.when(
          useHasValidProperty('description'),
          useMakePropertyIntoSentence('description'),
        ),
        R.when(
          R.allPass([
            useIsStag(get(getTagsWithNameAsDescription)()),
            useHasValidProperty('name'),
          ]),
          useMakePropertyIntoSentence('name'),
        ),
      ),
    ),
  )(tag);
};

export const provider = createProvider('prepareTagDescription', {
  prepareTagDescription,
  makePropertyIntoSentence,
});
