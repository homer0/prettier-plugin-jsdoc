const R = require('ramda');
const { ensureArray, replaceLastItem, limitAdjacentRepetitions } = require('./utils');

/**
 * This is used when splitting lines that contain linebreaks; it's used as a filter so a text won't
 * include multiple empty lines.
 *
 * @type {number}
 */
const ADJACENT_LINEBREAKS_LIMIT = 2;

/**
 * This is a utility used inside the reducers in order to take "words" that include line breaks
 * and split them into multiple "words".
 *
 * @callback SplitLineBreaksFn
 * @param {string} text  The text to process.
 * @returns {string[]}
 */

/**
 * @type {SplitLineBreaksFn}
 */
const splitLineBreaks = R.compose(
  limitAdjacentRepetitions(R.equals('\n'), ADJACENT_LINEBREAKS_LIMIT),
  R.dropLast(1),
  R.reduce((sacc, item) => [...sacc, item, '\n'], []),
  R.map(R.when(R.isEmpty, R.always('\n'))),
  R.split('\n'),
);
/**
 * This is a reducer function that validates words before adding them to a list. By "validates",
 * it checks if the words include a line break, in order to process them with
 * {@link splitLineBreaks} before adding them.
 *
 * @param {string[]} list  The list where the words are added (the accumulator).
 * @param {string}   word  The word to validate.
 * @returns {string[]}
 */
const reduceWordsList = (list, word) => R.concat(
  list,
  R.ifElse(
    R.includes('\n'),
    splitLineBreaks,
    ensureArray,
  )(word),
);

/**
 * This is a reducer that generates a list of lines with a specific length. The function tries
 * to add the each new word on the same line, unless it would cause the line to exceed the
 * _length limit_, in which case it will create a new line.
 *
 * @callback ReduceSentencesFn
 * @param {number}   length  The length the lines can have.
 * @param {string[]} list    The current list of words (the accumulator).
 * @param {string}   word    The word to process.
 * @param {number}   index   The current interation index; needed in order to check if it's the
 *                           first iteration and avoid looking for the previous line.
 * @returns {string[]}
 */

/**
 * @type {ReduceSentencesFn}
 */
const reduceSentences = R.curry((length, list, word, index) => {
  let newList;
  if (word === '\n') {
    newList = R.append('', list);
  } else if (index) {
    const currentLine = R.last(list).trim();
    const newLine = `${currentLine} ${word}`.trim();
    newList = R.ifElse(
      R.always(newLine.length > length),
      R.append(word),
      replaceLastItem(newLine),
    )(list);
  } else {
    newList = [word];
  }

  return newList;
});
/**
 * This is a reducer that processes a list of lines and puts them together on a single text by
 * validating if they should be added on a new line or not.
 *
 * @param {string} text  The text where the line will be added (the accumulator).
 * @param {string} line  The line to process.
 * @returns {string}
 */
const reduceText = (text, line) => {
  const useLine = line.trim();
  let newText;
  if (text) {
    const glue = text.substr(-1).match(/\w/) ? ' ' : '\n';
    newText = `${text}${glue}${useLine}`;
  } else {
    newText = useLine;
  }

  return newText;
};

/**
 * Splits a text on a list of lines where none of them exceeds the specified `length`.
 *
 * @param {string} text    The text to split.
 * @param {number} length  The max length a line cannot exceed.
 * @returns {string[]}
 */
const splitText = (text, length) => R.compose(
  R.addIndex(R.reduce)(reduceSentences(length), ['']),
  R.reduce(reduceWordsList, []),
  R.split(/(?<!\{@\w+) /),
  R.reduce(reduceText, ''),
  R.split('\n'),
)(text);

module.exports.splitText = splitText;
