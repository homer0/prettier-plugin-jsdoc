const R = require('ramda');
/**
 * @typedef {import('../types').PJPStringLiteralsOptions} PJPStringLiteralsOptions
 */

/**
 * This is the actual function that formats a string literal by adding the necessary padding
 * and updating the quotes.
 *
 * @callback StringLiteralFormatter
 * @param {string} type  The type to format.
 * @returns {string}
 */

/**
 * This is the reducer used to update a type and format any string literal type inside it.
 *
 * @callback StringLiteralsReducer
 * @param {string} type     The original type to parse and update (the accumulator).
 * @param {string} literal  The string literal to format.
 * @returns {string}
 */

/**
 * Generates a {@link StringLiteralFormatter} with the necessary padding and quotes so it can
 * be used ona reducer/map.
 *
 * @param {string} padding  The padding that should be around the literals.
 * @param {string} quote    The quote charater that should wrap the literals.
 * @returns {StringLiteralFormatter}
 */
const getFormatter = (padding, quote) => R.compose(
  R.trim,
  R.join('|'),
  R.map(R.compose(
    R.replace(/['"]\s*([\w\-]+)\s*['"]/, `${padding}${quote}$1${quote}${padding}`),
    R.trim,
  )),
  R.split('|'),
);
/**
 * Generates the reducer to update a type and format any string literal type inside it.
 *
 * @param {PJPStringLiteralsOptions} options  The options for the formatter.
 * @returns {StringLiteralsReducer}
 */
const getReducer = (options) => {
  const quote = options.jsdocUseSingleQuotesForStringLiterals ? '\'' : '"';
  const padding = ' '.repeat(options.jsdocSpacesBetweenStringLiterals);
  const formatter = getFormatter(padding, quote);
  return (type, literal) => R.replace(literal, formatter(literal), type);
};

/**
 * Finds and extracts all the string literals on a type.
 *
 * @callback ExtractLiteralsFn
 * @param {string} type  The type that will be used to find the string literals.
 * @returns {string[]}
 */

/**
 * @type {ExtractLiteralsFn}
 */
const extractLiterals = R.match(/['"][\w\|\-\s'"]+['"](?:\s+)?/g);
/**
 * Formats the styling of string literals inside a type. If the type doesn't use string literals,
 * it will be returned without modification.
 *
 * @param {string}                   type     The type to format.
 * @param {PJPStringLiteralsOptions} options  The options that tell the function how to format the
 *                                            type.
 * @returns {string}
 */
const formatStringLiterals = (type, options) => R.compose(
  (literals) => (
    literals.length ?
      R.reduce(getReducer(options), type, literals) :
      type
  ),
  extractLiterals,
)(type);

module.exports.formatStringLiterals = formatStringLiterals;
