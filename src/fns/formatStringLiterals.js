const R = require('ramda');
const { get, provider } = require('./app');

/**
 * @typedef {import('../types').PJPTypesOptions} PJPTypesOptions
 */

/**
 * This is the actual function that formats a string literal by adding the necessary
 * padding and updating the quotes.
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
 * Generates a {@link StringLiteralFormatter} with the necessary padding and quotes so it
 * can be used ona reducer/map.
 *
 * @param {string} padding  The padding that should be around the literals.
 * @param {string} quote    The quote character that should wrap the literals.
 * @returns {StringLiteralFormatter}
 */
const getFormatter = (padding, quote) =>
  R.compose(
    R.trim,
    R.join('|'),
    R.map(
      R.compose(
        R.replace(/['"]\s*([\w\-]+)\s*['"]/, `${padding}${quote}$1${quote}${padding}`),
        R.trim,
      ),
    ),
    R.split('|'),
  );
/**
 * Generates the reducer to update a type and format any string literal type inside it.
 *
 * @param {PJPTypesOptions} options  The options for the formatter.
 * @returns {StringLiteralsReducer}
 */
const getReducer = (options) => {
  const quote = options.jsdocUseSingleQuotesForStringLiterals ? "'" : '"';
  const padding = ' '.repeat(options.jsdocSpacesBetweenStringLiterals);
  const formatter = get(getFormatter)(padding, quote);
  return (type, literal) => R.replace(literal, formatter(literal), type);
};

/**
 * Finds and extracts all the string literals on a type.
 *
 * @param {string} type  The type that will be used to find the string literals.
 * @returns {string[]}
 */
const extractLiterals = (type) => R.match(/['"][\w\|\-\s'"]+['"](?: +)?(?:$|\|)/g, type);
/**
 * Formats the styling of string literals inside a type. If the type doesn't use string
 * literals, it will be returned without modification.
 *
 * @callback FormatStringLiteralsFn
 * @param {string}          type     The type to format.
 * @param {PJPTypesOptions} options  The options that tell the function how to format the
 *                                   type.
 * @returns {string}
 */

/**
 * @type {FormatStringLiteralsFn}
 */
const formatStringLiterals = R.curry((type, options) =>
  R.compose(
    (literals) =>
      literals.length ? R.reduce(get(getReducer)(options), type, literals) : type,
    get(extractLiterals),
  )(type),
);

module.exports.formatStringLiterals = formatStringLiterals;
module.exports.getFormatter = getFormatter;
module.exports.getReducer = getReducer;
module.exports.extractLiterals = extractLiterals;
module.exports.provider = provider('formatStringLiterals', module.exports);
