import { format } from 'prettier';
import * as R from 'ramda';
import { isMatch } from './utils.js';
import { get, createProvider } from './app.js';

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 */

/**
 * This is the length of ` * `, so the formatter can calculate the `printWidth` - `column`
 * - this, in order to get the real available width.
 *
 * @type {number}
 */
const COMMENT_PADDING_LENGTH = 3;

/**
 * Takes a tag type, wraps it inside a TypeScript declaration, sends it to Prettier and
 * then cleans it in order to return it so it can be used on a comment.
 *
 * @callback FormatPrettyTypeFn
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @param {number}          column   The column where the comment will be rendered.
 * @param {string}          tag      The type will be formatted.
 * @returns {Promise<string>}
 */

/**
 * @type {FormatPrettyTypeFn}
 */
export const formatPrettyType = R.curry(async (options, column, type) => {
  let result;
  try {
    const printWidth = options.printWidth - column - COMMENT_PADDING_LENGTH;
    const useType = type.replace(/\*/g, 'any');
    const prefix = 'type complex = ';
    const newType = await format(`${prefix}${useType}`, {
      ...options,
      printWidth,
      parser: 'typescript',
    });
    result = newType.substring(prefix.length).trim().replace(/;$/, '');
  } catch (ignore) {
    result = type;
  }

  return result;
});

/**
 * Checks if a type uses generics/union/intersections/properties in order to format it
 * using Prettier as if it were a regular declaration..
 *
 * @callback FormatTypeAsCodeFn
 * @param {string}          tag      The type to validate and format.
 * @param {PrettierOptions} options  The options that were sent to the plugin, to send
 *                                   back to Prettier.
 * @param {number}          column   The column where comment will be rendered. This is
 *                                   necessary in order to calculate the available space
 *                                   that Prettier can use.
 * @returns {Promise<CommentTag>}
 */

/**
 * @type {FormatTypeAsCodeFn}
 */
export const formatTypeAsCode = R.curry((type, options, column) =>
  R.when(get(isMatch)(/[\{&<\.\|]/), get(formatPrettyType)(options, column), type),
);

export const provider = createProvider('formatTypeAsCode', {
  formatTypeAsCode,
  formatPrettyType,
});
