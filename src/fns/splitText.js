/**
 * Splits a text on a list of lines where none of them exceeds the specified `length`.
 *
 * @param {string} text    The text to split.
 * @param {number} length  The max length a line cannot exceed.
 * @returns {string[]}
 */
const splitText = (text, length) => text
.split('\n')
.reduce(
  (acc, line, index) => {
    const useLine = line.trim();
    let nextAcc;
    if (index) {
      const lastChar = acc.substr(-1);
      if (lastChar.match(/\w/)) {
        nextAcc = `${acc} ${useLine}`;
      } else {
        nextAcc = `${acc}\n${useLine}`;
      }
    } else {
      nextAcc = useLine;
    }
    return nextAcc;
  },
  '',
)
.split(/(?<!\{@\w+) /)
.reduce(
  (acc, word) => {
    let nextAcc;
    if (word.includes('\n')) {
      const parts = word
      .split('\n')
      .map((item) => item || '\n')
      .reduce((sacc, item) => [...sacc, item, '\n'], []);
      parts.pop();
      nextAcc = [...acc, ...parts];
    } else {
      nextAcc = [...acc, word];
    }

    return nextAcc;
  },
  [],
)
.reduce(
  (acc, word) => {
    if (word === '\n') {
      acc.push('');
    } else {
      const currentLine = acc[acc.length - 1];
      const newLine = `${currentLine.trim()} ${word}`;
      if (newLine.length > length) {
        acc.push(word);
      } else {
        acc[acc.length - 1] = newLine;
      }
    }
    return acc;
  },
  [''],
);

module.exports.splitText = splitText;
