const R = require('ramda');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

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
 * Checks if a tag is of an specified type (or types).
 *
 * @callback IsTagFn
 * @param {string|string[]} targetTag  The name of the tag or tags the function should validate
 *                                     against.
 * @param {CommentTag}      tag        The tag to validate.
 * @returns {boolean}
 */

/**
 * @type {IsTagFn}
 */
const isTag = R.curry((targetTag, tag) => {
  const targetTags = ensureArray(targetTag);
  return R.propSatisfies(
    R.includes(R.__, targetTags),
    'tag',
    tag,
  );
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

/**
 * This is a utility function to make regular expression replacements where a group can capture
 * part of other group. The function will replace the text and it won't stop until there are no
 * matches.
 *
 * @callback ReplaceAdjacentFn
 * @param {RegExp} expression   The expression to match and replace.
 * @param {string} replacement  The replacement text.
 * @param {string} text         The target text.
 * @returns {string}
 */

/**
 * @type {ReplaceAdjacentFn}
 */
const replaceAdjacent = R.curry((expression, replacement, text) => {
  let useText = text;
  let match = useText.match(expression);
  while (match) {
    useText = useText.replace(expression, replacement);
    match = useText.match(expression);
  }

  return useText;
});

/**
 * Depending on `useDot`, this function will ensure that the type name and the generics for a
 * target type are separated, or not, with a dot.
 * For the use of generics, JSDoc recommends the use a dot before listing them
 * (i.e. `Array.<string>`), but that is unnecessary if you are using JSDoc for TypeScript
 * annotations.
 *
 * @callback ReplaceDotOnTypeGeneric
 * @param {string}  targetType  The type that should/shouldn't have a dot before generics.
 * @param {boolean} useDot      Whether or not the dots should be present.
 * @param {string}  type        The actual type where the dots will be added or removed.
 * @returns {string}
 */

/**
 * @type {ReplaceDotOnTypeGeneric}
 */
const replaceDotOnTypeGeneric = R.curry((targetType, useDot, type) => R.ifElse(
  R.always(useDot),
  replaceAdjacent(new RegExp(`([^\\w]|^)${targetType}\\s*<`), `$1${targetType}.<`),
  replaceAdjacent(new RegExp(`([^\\w]|^)${targetType}\\s*\\.\\s*<`), `$1${targetType}<`),
)(type));

/**
 * Capitalizes a string.
 *
 * @callback CapitalizeFn
 * @param {string} str  The string to capitalize.
 * @returns {string}
 */

/**
 * @type {CapitalizeFn}
 */
const capitalize = R.compose(
  R.join(''),
  R.juxt([R.compose(R.toUpper, R.head), R.tail]),
);

/**
 * Gets the item of an item of a list or a fallback value.
 *
 * @callback GetIndexOrFallbackFn
 * @param {Array}  list      The list where the function will look for the item.
 * @param {number} fallback  The fallback index in case one is not found for the item.
 * @param {*}      item      The item to look for.
 * @returns {number}
 */

/**
 * @type {GetIndexOrFallbackFn}
 */
const getIndexOrFallback = R.curry((list, fallback, item) => R.compose(
  R.when(
    R.equals(-1),
    R.always(fallback),
  ),
  R.indexOf(item),
)(list));

/**
 * The predicate function that will be used by {@link LimitAdjacentRepetitionsFn} in order to
 * validate the items.
 *
 * @callback LimitAdjacentRepetitionsPredFn
 * @param {*} item  The list item to validate.
 * @returns {boolean}
 */

/**
 * Formats a list in order to remove items repeated items next to each other.
 *
 * @example
 * limitAdjacentRepetitions(
 *   R.equals('\n'),
 *   1,
 *   ['hello', '\n', '\n', 'world'],
 * );
 * // ['hello', '\n', 'world']
 *
 * @callback LimitAdjacentRepetitionsFn
 * @param {LimitAdjacentRepetitionsPredFn} pred   The function to validate if an item should be
 *                                                considered and start the count.
 * @param {number}                         limit  How many times an item that was validated with
 *                                                predicate function can be adjacently repeated.
 * @param {Array}                          list   The list to format.
 */

/**
 * @type {LimitAdjacentRepetitionsFn}
 */
const limitAdjacentRepetitions = R.curry((pred, limit, list) => R.compose(
  R.prop('list'),
  R.reduce(
    (acc, item) => {
      if (pred(item)) {
        const newCount = acc.count + 1;
        if (newCount <= limit) {
          acc.count = newCount;
          acc.list.push(item);
        }
      } else {
        acc.count = 0;
        acc.list.push(item);
      }

      return acc;
    },
    {
      count: 0,
      list: [],
    },
  ),
)(list));

module.exports.ensureArray = ensureArray;
module.exports.findTagIndex = findTagIndex;
module.exports.isTag = isTag;
module.exports.appendIfNotPresent = appendIfNotPresent;
module.exports.joinIfNotEmpty = joinIfNotEmpty;
module.exports.replaceLastItem = replaceLastItem;
module.exports.hasItems = hasItems;
module.exports.isMatch = isMatch;
module.exports.replaceDotOnTypeGeneric = replaceDotOnTypeGeneric;
module.exports.capitalize = capitalize;
module.exports.getIndexOrFallback = getIndexOrFallback;
module.exports.limitAdjacentRepetitions = limitAdjacentRepetitions;
