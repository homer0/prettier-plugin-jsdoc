const R = require('ramda');
const { get, provider } = require('./app');

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Ensures a given object is an array.
 *
 * @param {T | T[]} obj  The object to validate.
 * @returns {T[]}
 * @template T
 */
const ensureArray = (obj) => R.unless(R.is(Array), R.of, obj);

/**
 * Creates a reducer that finds the last index of a tag on a list and saves it on the
 * accumulator using a custom property.
 *
 * @callback FindTagIndexFn
 * @param {string | string[]} targetTag  The name of the tag or tags the function should
 *                                       find.
 * @param {string}            propName   The name of the property that will be used for
 *                                       the accumulator.
 * @returns {Object.<string, number>}
 */

/**
 * @type {FindTagIndexFn}
 */
const findTagIndex = R.curry((targetTag, propName, step) => {
  const targetTags = get(ensureArray)(targetTag);
  return (acc, tag, index) => {
    const nextAcc = targetTags.includes(tag.tag)
      ? R.assocPath([propName], index, acc)
      : acc;
    return step(nextAcc, tag, index);
  };
});

/**
 * Checks if a tag is of an specified type (or types).
 *
 * @callback IsTagFn
 * @param {string | string[]} targetTag  The name of the tag or tags the function should
 *                                       validate against.
 * @param {CommentTag}        tag        The tag to validate.
 * @returns {boolean}
 */

/**
 * @type {IsTagFn}
 */
const isTag = R.curry((targetTag, tag) => {
  const targetTags = get(ensureArray)(targetTag);
  return R.propSatisfies(R.includes(R.__, targetTags), 'tag', tag);
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
const appendIfNotPresent = R.curry((item, list) =>
  R.unless(R.includes(item), R.append(item), list),
);
/**
 * Takes a list of strings, filters out those that are empty and then joins them together.
 *
 * @callback JoinIfNotEmptyFn
 * @param {string}   glue  The string that will be added between the items on the final
 *                         result.
 * @param {string[]} strs  The list of strings to join.
 * @returns {string}
 */

/**
 * @type {JoinIfNotEmptyFn}
 */
const joinIfNotEmpty = R.curry((glue, str) =>
  R.pipe(R.reject(R.isEmpty), R.join(glue))(str),
);

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
const replaceLastItem = R.curry((item, list) =>
  R.compose(R.append(item), R.dropLast(1))(list),
);

/**
 * Validates that the `length` of an object is a positive number.
 *
 * @param {*} item  The item to validate.
 * @returns {boolean}
 */
const hasItems = (item) => R.compose(R.gt(R.__, 0), R.length)(item);

/**
 * Validates if a string matches a regular expression. This utility function exists
 * because `R.match` returns an array even if there are no matches, so the call to
 * `R.match` has to be composed with a function to validate the result `.length`.
 *
 * @callback IsMatchFn
 * @param {RegExp} expression  The regular expression the string has to match.
 * @param {string} str         The string to validate.
 * @returns {boolean}
 */

/**
 * @type {IsMatchFn}
 */
const isMatch = R.curry((expression, str) =>
  R.compose(get(hasItems), R.match(expression))(str),
);

/**
 * This is a utility function to make regular expression replacements where a group can
 * capture part of other group. The function will replace the text and it won't stop until
 * there are no matches.
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
 * Depending on `useDot`, this function will ensure that the type name and the generics
 * for a target type are separated, or not, with a dot.
 * For the use of generics, JSDoc recommends the use a dot before listing them (i.e.
 * `Array.<string>`), but that is unnecessary if you are using JSDoc for TypeScript
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
const replaceDotOnTypeGeneric = R.curry((targetType, useDot, type) => {
  const useReplaceAdjacent = get(replaceAdjacent);
  return R.ifElse(
    R.always(useDot),
    useReplaceAdjacent(new RegExp(`([^\\w]|^)(${targetType})\\s*<`, 'i'), '$1$2.<'),
    useReplaceAdjacent(new RegExp(`([^\\w]|^)(${targetType})\\s*\\.\\s*<`, 'i'), '$1$2<'),
  )(type);
});

/**
 * Capitalizes a string.
 *
 * @param {string} str  The string to capitalize.
 * @returns {string}
 */
const capitalize = (str) =>
  R.compose(R.join(''), R.juxt([R.compose(R.toUpper, R.head), R.tail]))(str);

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
const getIndexOrFallback = R.curry((list, fallback, item) =>
  R.compose(R.when(R.equals(-1), R.always(fallback)), R.indexOf(item))(list),
);

/**
 * The predicate function that will be used by {@link LimitAdjacentRepetitionsFn} in order
 * to validate the items.
 *
 * @callback LimitAdjacentRepetitionsPredFn
 * @param {*} item  The list item to validate.
 * @returns {boolean}
 */

/**
 * Formats a list in order to remove items repeated items next to each other.
 *
 * @callback LimitAdjacentRepetitionsFn
 * @example
 *
 *   limitAdjacentRepetitions(R.equals('\n'), 1, ['hello', '\n', '\n', 'world']);
 *   // ['hello', '\n', 'world']
 *
 * @param {LimitAdjacentRepetitionsPredFn} pred   The function to validate if an item
 *                                                should be considered and start the
 *                                                count.
 * @param {number}                         limit  How many times an item that was
 *                                                validated with predicate function can be
 *                                                adjacently repeated.
 * @param {Array}                          list   The list to format.
 */

/**
 * @type {LimitAdjacentRepetitionsFn}
 */
const limitAdjacentRepetitions = R.curry((pred, limit, list) =>
  R.compose(
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
  )(list),
);

/**
 * Checks if an object was a specific property and is not _empty_.
 *
 * @callback HasValidPropertyFn
 * @param {string} property  The name of the property to validate.
 * @param {Object} obj       The object where the property will be validated.
 * @returns {boolean}
 */

/**
 * @type {HasValidPropertyFn}
 */
const hasValidProperty = R.curry((property, obj) =>
  R.propSatisfies(R.complement(R.either(R.isEmpty, R.isNil)), property)(obj),
);

/**
 * Adds a prefix on all the lines from a text.
 *
 * @callback PrefixLinesFn
 * @param {string} prefix  The prefix to add on every line.
 * @param {string} text    The target text that will be prefixed.
 * @returns {string}
 */

/**
 * @type {PrefixLinesFn}
 */
const prefixLines = R.curry((prefix, text) =>
  R.compose(R.join('\n'), R.map(R.concat(prefix)), R.split('\n'), R.trim())(text),
);

/**
 * Splits the lines of a text and removes the empty ones.
 *
 * @callback SplitLinesAndCleanFn
 * @param {string | RegExp} splitter  The string or expression to use on `String.split`.
 * @param {string}          text      The text to split.
 * @returns {string[]}
 */

/**
 * @type {SplitLinesAndCleanFn}
 */
const splitLinesAndClean = R.curry((splitter, text) =>
  R.compose(R.reject(R.isEmpty), R.map(R.trim), R.split(splitter))(text),
);

/**
 * Ensures a text starts with an uppercase and ends with a period.
 *
 * @param {string} text  The text to format.
 * @returns {string}
 */
const ensureSentence = (text) =>
  R.compose(
    R.replace(/(\.)?(\s*)$/, (full, dot, padding) => `.${padding}`),
    R.replace(
      /^(\s*)(\w)/,
      (full, padding, letter) => `${padding}${letter.toUpperCase()}`,
    ),
  )(text);
/**
 * Validates if a text is a valid URL.
 *
 * @param {string} text  The text to validate.
 * @returns {boolean}
 */
const isURL = (text) =>
  isMatch(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
    text,
  );

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
module.exports.hasValidProperty = hasValidProperty;
module.exports.prefixLines = prefixLines;
module.exports.splitLinesAndClean = splitLinesAndClean;
module.exports.ensureSentence = ensureSentence;
module.exports.isURL = isURL;
module.exports.provider = provider('utils', module.exports);
