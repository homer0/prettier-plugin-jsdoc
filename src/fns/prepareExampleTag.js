import { format } from 'prettier';
import * as R from 'ramda';
import { isTag, prefixLines, splitLinesAndClean, reduceWithPromise } from './utils.js';
import { get, createProvider } from './app.js';

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').CommentTagExample} CommentTagExample
 */

/**
 * This is the length of ` * `, so the formatter can calculate the `printWidth` - `column`
 * - this, in order to get the real available width.
 *
 * @type {number}
 */
const COMMENT_PADDING_LENGTH = 3;

/**
 * Attempts to format a example code using Prettier.
 *
 * @param {PrettierOptions} options  The options sent to the plugin, needed for the
 *                                   formatter.
 * @param {number}          column   The column where the comment will be rendered.
 * @param {string}          example  The example code.
 * @returns {Promise<string>}
 */
export const formatExample = async (options, column, example) => {
  let code;
  let indent;
  try {
    let printWidth = options.printWidth - column - COMMENT_PADDING_LENGTH;
    indent = options.jsdocIndentFormattedExamples;
    if (indent) {
      printWidth -= options.tabWidth;
    }

    code = await format(example, {
      ...options,
      printWidth,
    });
  } catch {
    code = example;
    indent = options.jsdocIndentUnformattedExamples;
  }

  if (indent) {
    code = get(prefixLines)(' '.repeat(options.tabWidth), code);
  }

  return code.trimEnd();
};

/**
 * Takes an example code block that may or may not contain multiple `<caption>` blocks and
 * split them into a list of examples, each one with its `code` and `caption` properties.
 *
 * @param {PrettierOptions} options  The options sent to the plugin, needed for the
 *                                   formatter.
 * @param {number}          column   The column where the comment will be rendered.
 * @param {string}          example  The example code.
 * @returns {Promise<CommentTagExample[]>}
 */
export const splitExamples = async (options, column, example) => {
  const splitLinesAndCleanFn = get(splitLinesAndClean);
  const splitEndFn = splitLinesAndCleanFn(/<\s*\/\s*caption\s*>/i);
  const splitted = splitLinesAndCleanFn(/<\s*caption\s*>/i)(example);
  const formatExampleFn = get(formatExample);
  return get(reduceWithPromise)(splitted, async (item) => {
    const [caption, code] = splitEndFn(item);
    return {
      caption,
      code: await formatExampleFn(options, column, code),
    };
  });
};

/**
 * Checks if an example tag uses a `<caption>` tag in order to, either format the code if
 * the tag is not present, or extract all captions and codes and then format the codes.
 *
 * @callback FormatExampleTagFn
 * @param {PrettierOptions} options  The options sent to the plugin, needed for the
 *                                   formatter.
 * @param {number}          column   The column where the comment will be rendered.
 * @param {CommentTag}      tag      The tag to format.
 * @returns {CommentTag}
 */

/**
 * @type {FormatExampleTagFn}
 */
export const formatExampleTag = R.curry(async (options, column, tag) => {
  let examples;
  if (tag.description.match(/<\s*caption\s*>/i)) {
    examples = await get(splitExamples)(options, column, tag.description);
  } else if (tag.description.trim()) {
    const code = await get(formatExample)(options, column, tag.description);
    examples = [{ code }];
  } else {
    examples = [];
  }

  return {
    ...tag,
    description: '',
    examples,
  };
});

/**
 * Checks if a tag is an `example` and attempts to format it using Prettier.
 *
 * @callback PrepareExampleTagFn
 * @param {PrettierOptions} options  The options sent to the plugin, needed for the
 *                                   formatter.
 * @param {CommentTag}      tag      The tag to validate and format.
 * @param {number}          column   The column where the comment will be rendered; this
 *                                   is necessary for the formatter.
 * @returns {CommentTag}
 */

/**
 * @type {PrepareExampleTagFn}
 */
export const prepareExampleTag = R.curry((tag, options, column) =>
  R.when(get(isTag)('example'), get(formatExampleTag)(options, column), tag),
);

export const provider = createProvider('prepareExampleTag', {
  prepareExampleTag,
  formatExample,
  splitExamples,
  formatExampleTag,
});
