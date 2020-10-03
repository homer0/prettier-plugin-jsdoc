const { matchAll } = require('./utils');

/**
 * @typedef {import('../types').PJPStringLiteralsOptions} PJPStringLiteralsOptions
 */

/**
 * Formats the styling of string literals inside a type. If the type doesn't use string literals,
 * it will be returned without modification.
 *
 * @param {string}                   type     The type to format.
 * @param {PJPStringLiteralsOptions} options  The options that tell the function how to format the
 *                                            type.
 * @returns {string}
 */
const formatStringLiterals = (type, options) => {
  const matches = matchAll(type, /['"][\w\|\-\s'"]+['"](?:\s+)?/g);
  if (!matches.length) return type;
  const quote = options.jsdocUseSingleQuotesForStringLiterals ? '\'' : '"';
  const padding = ' '.repeat(options.jsdocSpacesBetweenStringLiterals);
  return matches.reduce(
    (acc, [literal]) => {
      const replacement = literal
      .split('|')
      .map((item) => item.trim().replace(
        /['"]\s*([\w\-]+)\s*['"]/,
        `${padding}${quote}$1${quote}${padding}`,
      ))
      .join('|')
      .trim();

      return acc.replace(literal, replacement);
    },
    type,
  );
};

module.exports.formatStringLiterals = formatStringLiterals;
