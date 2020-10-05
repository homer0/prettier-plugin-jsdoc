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
 * @param {Array} list  The list where the item should be added.
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

/**
 * Replaces the last item on an array.
 *
 * @callback ReplaceLastItemFn
 * @param {*}     item  The "new last item".
 * @param {Array} list  The list where the item will be replaced.
 * @returns {Array}
 */

/**
 * @type {ReplaceLastItemFn}
 */
const replaceLastItem = R.curry((item, list) => R.compose(
  R.append(item),
  R.dropLast(1),
)(list));

/**
 * Validates that the `length` of an object is a positive number.
 *
 * @callback HasItemsFn
 * @param {*} item  The item to validate.
 * @returns {boolean}
 */

/**
 * @type {HasItemsFn}
 */
const hasItems = R.compose(
  R.gt(R.__, 0),
  R.length,
);

/**
 * Validates if a string matches a regular expression. This utility function exists because
 * `R.match` returns an array even if there are no matches, so the call to `R.match` has to be
 * composed with a function to validate the result `.length`.
 *
 * @callback IsMatchFn
 * @param {RegExp} expression  The regular expression the string has to match.
 * @param {string} str         The string to validate.
 * @returns {boolean}
 */

/**
 * @type {IsMatchFn}
 */
const isMatch = R.curry((expression, str) => R.compose(
  hasItems,
  R.match(expression),
)(str));

module.exports.ensureArray = ensureArray;
module.exports.findTagIndex = findTagIndex;
module.exports.appendIfNotPresent = appendIfNotPresent;
module.exports.joinIfNotEmpty = joinIfNotEmpty;
module.exports.replaceLastItem = replaceLastItem;
module.exports.hasItems = hasItems;
module.exports.isMatch = isMatch;
