const R = require('ramda');

/**
 * Ensures a given object is an array.
 *
 * @callback EnsureArrayFn
 * @param {T|T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */

/**
 * @type {EnsureArrayFn<T>}
 * @template T
 */
const ensureArray = R.unless(R.is(Array), R.of);
/**
 * Creates a reducer that finds the last index of a tag on a list and saves it on the
 * accumulator using a custom property.
 *
 * @callback FindTagIndexFn
 * @param {string|string[]} targetTag  The name of the tag or tags the function should find.
 * @param {string}          propName   The name of the property that will be used for the
 *                                     accumulator.
 * @returns {Object.<string,number>}
 */

/**
 * @type {FindTagIndexFn}
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
 * Adds an item to a list, only if it wasn't already present.
 *
 * @callback AppendIfNotPresentFn
 * @param {*}     item  The item to add.
 * @param {Array} list  The list where it should be added.
 * @returns {Array}
 */

/**
 * @type {AddIfNotPresentFn}
 */
const appendIfNotPresent = R.curry((item, list) => R.unless(
  R.includes(item),
  R.append(item),
  list,
));
/**
 * Takes a list of strings, filters out those that are empty and then joins them together.
 *
 * @callback JoinIfNotEmptyFn
 * @param {string}   glue  The string that will be added between the items on the final result.
 * @param {string[]} strs  The list of strings to join.
 * @returns {string}
 */

/**
 * @type {JoinIfNotEmptyFn}
 */
const joinIfNotEmpty = R.curry((glue, str) => R.pipe(
  R.reject(R.isEmpty),
  R.join(glue),
)(str));

module.exports.ensureArray = ensureArray;
module.exports.findTagIndex = findTagIndex;
module.exports.appendIfNotPresent = appendIfNotPresent;
module.exports.joinIfNotEmpty = joinIfNotEmpty;
