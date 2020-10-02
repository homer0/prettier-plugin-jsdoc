const R = require('ramda');
const {
  ensureArray,
  joinIfNotEmpty,
  appendIfNotPresent,
} = require('./utils');
/**
 * @typedef {import('../types').PJPDescriptionTagOptions} PJPDescriptionTagOptions
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').CommentBlock} CommentBlock
 */

/**
 * @callback FindTagHandlerFn
 * @param {T}          acc    The reducer accumulator.
 * @param {CommentTag} tag    The current tag for the iteration.
 * @param {number}     index  The index of the tag in the list.
 * @returns {T}
 * @template T
 */

/**
 * Creates a reducer that finds the last index of a tag on a list and saves it on the
 * accumulator using a custom property.
 * Creates a reducer that will try to match a tag (or a list of them) and execute a function
 * if it matches, or another if it doesn't.
 *
 * @callback FindTagFn
 * @param {string|string[]}  targetTag            The name of the tag or tags the function should
 *                                                find.
 * @param {FindTagHandlerFn<*>} matchHandlerFn    The function called when the current tag matches
 *                                                with the one(s) the reducer is looking for.
 * @param {FindTagHandlerFn<*>} unmatchHandlerFn  The function called when the current tag doesn't
 *                                                match with the one(s) the reducer is looking for.
 * @returns {Function}
 */

/**
 * @type {FindTagFn}
 */
const findTag = R.curry((
  targetTag,
  matchHandlerFn,
  unmatchHandlerFn,
  step,
) => {
  const targetTags = ensureArray(targetTag);
  return (acc, tag, index) => {
    const nextAcc = targetTags.includes(tag.tag) ?
      matchHandlerFn(acc, tag, index) :
      unmatchHandlerFn(acc, tag, index);

    return step(nextAcc, tag, index);
  };
});

/**
 * @typedef {Object} ProcessTagAccumulator
 * @property {string[]}     parts     All the description "parts" the reducer has found. One can
 *                                    be from the block body, other from a description tag, other
 *                                    from a typedef tag, etc.
 * @property {CommentTag[]} tags      The list of tags processed by the reducer.
 * @property {number}       tagIndex  The index, if found, of a descriptiont ag.
 */

/**
 * Generates a reducer handler for specific tags.
 *
 * @param {string|string[]} descriptionProperty  The property or properties that make the
 *                                               description of a tag.
 * @param {boolean}         saveIndex            Whether or not the tag index should be saved as
 *                                               the accumulator `tagIndex` property.
 * @returns {FindTagHandlerFn<ProcessTagAccumulator>}
 */
const processTag = (descriptionProperty, saveIndex = false) => {
  const descriptionProperties = ensureArray(descriptionProperty);
  const generateDescription = R.compose(
    joinIfNotEmpty(' '),
    R.values,
    R.pick(descriptionProperties),
  );

  const emptyProps = descriptionProperties.reduce(
    (acc, prop) => ({ ...acc, [prop]: '' }),
    {},
  );

  return (acc, tag, index) => R.evolve(
    {
      parts: appendIfNotPresent(generateDescription(tag)),
      tags: R.append(R.mergeRight(tag, emptyProps)),
      tagIndex: R.when(R.always(saveIndex), R.always(index)),
    },
    acc,
  );
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
  /**
   * A handler for when a tag wasn't match; it just pushes it to the accumulator.
   *
   * @type {FindTagHandlerFn<ProcessTagAccumulator>}
   */
  const pushTag = (acc, tag) => R.evolve({ tags: R.append(tag) }, acc);
  const { parts, tags, tagIndex } = block.tags.reduce(
    R.compose(
      findTag(
        ['typedef', 'callback', 'function'],
        processTag('description'),
        R.identity,
      ),
      findTag(
        'description',
        processTag(['name', 'description'], true),
        R.identity,
      ),
      findTag(
        ['description', 'typedef', 'callback', 'function'],
        R.identity,
        pushTag,
      ),
    )(R.identity),
    {
      parts: [block.description],
      tags: [],
      tagIndex: -1,
    },
  );

  const description = joinIfNotEmpty('\n\n', parts);
  let blockDescription = block.description;
  let blockTags = tags;
  if (options.jsdocAllowDescriptionTag) {
    if (tagIndex > -1) {
      blockDescription = '';
      blockTags = R.adjust(tagIndex, R.evolve({
        description: R.always(description),
      }))(blockTags);
    } else if (options.jsdocUseDescriptionTag) {
      blockDescription = '';
      const descriptionTag = {
        tag: 'description',
        name: '',
        description,
        type: '',
      };
      blockTags = R.ifElse(
        R.pipe(R.prop('length'), R.gt(R.__, 1)),
        R.insert(1, descriptionTag),
        R.append(descriptionTag),
      )(blockTags);
    } else {
      blockDescription = description;
    }
  } else {
    if (tagIndex > -1) {
      blockTags = R.remove(tagIndex, 1, blockTags);
    }

    blockDescription = description;
  }

  return {
    description: blockDescription,
    tags: blockTags,
  };
};

module.exports.formatDescription = formatDescription;
