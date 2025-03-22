const R = require('ramda');
const {
  ensureArray,
  replaceLastItem,
  limitAdjacentRepetitions,
  isTableRow,
} = require('./utils');
const { get, provider } = require('./app');

/**
 * This is used when splitting lines that contain linebreaks; it's used as a filter so a
 * text won't include multiple empty lines.
 *
 * @type {number}
 */
const ADJACENT_LINEBREAKS_LIMIT = 2;
/**
 * When parsing text, if the a Markdown table row is found (starts and ends with a pipe),
 * it will be replaced with a key that starts with this prefix, and after all the parsing,
 * it the key will be replaced again with the original row. This whole thing is to avoid
 * the "words parsing"
 * to mess up the Markdown formatting.
 *
 * @type {string}
 */
const TABLE_ROW_PREFIX = `@jsdoc-table-row:${new Date().getTime()}:`;

/**
 * This is a utility used inside the reducers in order to take "words" that include line
 * breaks and split them into multiple "words".
 *
 * @param {string} text  The text to process.
 * @returns {string[]}
 */
const splitLineBreaks = (text) =>
  R.compose(
    get(limitAdjacentRepetitions)(R.equals('\n'), ADJACENT_LINEBREAKS_LIMIT),
    R.dropLast(1),
    R.reduce((sacc, item) => [...sacc, item, '\n'], []),
    R.map(R.when(R.isEmpty, R.always('\n'))),
    R.split('\n'),
  )(text);
/**
 * This is a reducer function that validates words before adding them to a list. By
 * "validates",
 * it checks if the words include a line break, in order to process them with
 * {@link splitLineBreaks} before adding them.
 *
 * @param {string[]} list  The list where the words are added (the accumulator).
 * @param {string}   word  The word to validate.
 * @returns {string[]}
 */
const reduceWordsList = (list, word) =>
  R.concat(
    list,
    R.ifElse(R.includes('\n'), get(splitLineBreaks), get(ensureArray))(word),
  );

/**
 * This is a reducer that generates a list of lines with a specific length. The function
 * tries to add the each new word on the same line, unless it would cause the line to
 * exceed the _length limit_, in which case it will create a new line.
 *
 * @callback ReduceSentencesFn
 * @param {number}   length  The length the lines can have.
 * @param {string[]} list    The current list of words (the accumulator).
 * @param {string}   word    The word to process.
 * @param {number}   index   The current iteration index; needed in order to check if it's
 *                           the first iteration and avoid looking for the previous line.
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
      get(replaceLastItem)(newLine),
    )(list);
  } else {
    newList = [word];
  }

  return newList;
});
/**
 * This is a reducer that processes a list of lines and puts them together on a single
 * text by validating if they should be added on a new line or not.
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
 * @todo The support for Markdown table needs to be "Ramdafied".
 */
const splitText = (text, length) => {
  const useIsTableRow = get(isTableRow);
  const linesList = text.split('\n');
  const { lines, rows } = linesList.reduce(
    (acc, line, index) => {
      if (useIsTableRow(line)) {
        const slug = line.replace(/\s+/g, '-');
        const suffix = `id:${index}-${slug}`;
        const space = '-'.repeat(
          Math.max(length - (TABLE_ROW_PREFIX.length + suffix.length), 1),
        );
        const key = `${TABLE_ROW_PREFIX}${space}${suffix}`;
        acc.rows[key] = line;
        const prevIndex = acc.lines.length - 1;
        const prevLine = acc.lines[prevIndex];
        if (prevLine) {
          acc.lines[prevIndex] = `${prevLine} ${key}`;
        } else {
          acc.lines.push(key);
        }
      } else {
        acc.lines.push(line || ' ');
      }

      return acc;
    },
    {
      lines: [],
      rows: {},
    },
  );

  let result = R.compose(
    R.addIndex(R.reduce)(get(reduceSentences)(length), ['']),
    R.reduce(get(reduceWordsList), []),
    R.split(/(?<!\{@\w+[^}]*) /),
    R.reduce(get(reduceText), ''),
  )(lines);

  result = Object.entries(rows).reduce(
    (acc, [key, value]) =>
      acc.reduce((sAcc, line) => {
        if (line.includes(key)) {
          const [before, after] = line.split(key);
          sAcc.push(...[before, value, after].filter((part) => part.trim()));
        } else {
          sAcc.push(line);
        }

        return sAcc;
      }, []),
    result,
  );

  return result;
};

module.exports.splitText = splitText;
module.exports.splitLineBreaks = splitLineBreaks;
module.exports.reduceWordsList = reduceWordsList;
module.exports.reduceSentences = reduceSentences;
module.exports.reduceText = reduceText;
module.exports.provider = provider('splitText', module.exports);
