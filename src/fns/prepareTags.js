import * as R from 'ramda';
import { prepareExampleTag } from './prepareExampleTag.js';
import { prepareTagDescription } from './prepareTagDescription.js';
import { prepareTagName } from './prepareTagName.js';
import { get, createProvider } from './app.js';
import { composeWithPromise, reduceWithPromise } from './utils.js';

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Takes a list of tags and runs them through all the preparations needed for them to be
 * rendered. Preparations include adding the brackets for optional parameters and running
 * Prettier for complex types.
 *
 * @callback PrepareTagsFn
 * @param {CommentTag[]}    tags     The list of tags to format.
 * @param {PrettierOptions} options  The options sent to the plugin, in case they're
 *                                   needed for Prettier.
 * @param {number}          column   The column where the comment will be rendered; this
 *                                   is necessary for some of the functions that may need
 *                                   to call Prettier.
 * @returns {Promise<CommentTag[]>}
 */

/**
 * @type {PrepareTagsFn}
 */
export const prepareTags = R.curry(async (tags, options, column) => {
  const fns = [get(prepareTagName)];

  if (options.jsdocFormatExamples) {
    fns.push(get(prepareExampleTag)(R.__, options, column));
  }

  if (options.jsdocEnsureDescriptionsAreSentences) {
    fns.push(get(prepareTagDescription));
  }

  const pipeline = get(composeWithPromise)(...fns.reverse());
  return get(reduceWithPromise)(tags, pipeline);
});

export const provider = createProvider('prepareTags', {
  prepareTags,
});
