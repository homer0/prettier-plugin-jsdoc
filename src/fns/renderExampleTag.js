import * as R from 'ramda';
import { splitText } from './splitText.js';
import { get, createProvider } from './app.js';

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 * @typedef {import('../types').CommentTag} CommentTag
 * @typedef {import('../types').CommentTagExample} CommentTagExample
 */

/**
 * The length of the opening and closing tag for captions. This is used to calculate if a
 * text plus the tags would exceed the available width and either render the tags on new
 * lines or in the same one.
 *
 * @type {number}
 */
const CAPTION_TAGS_LENGTH = 19;

/**
 * Generates the lines to render a single example inside an `example` tag.
 *
 * @callback RenderExampleFn
 * @param {number}            width    The available width for the caption.
 * @param {PrettierOptions}   options  The options sent to the plugin.
 * @param {CommentTagExample} example  The example to render.
 * @returns {string[]}
 */

/**
 * @type {RenderExampleFn}
 */
export const renderExample = R.curry((width, options, example) => {
  const lines = [];
  if (example.caption) {
    if (CAPTION_TAGS_LENGTH + example.caption.length >= width) {
      const captionLines = R.map(
        R.concat(' '.repeat(options.tabWidth)),
        get(splitText)(example.caption, width - options.tabWidth),
      );
      lines.push('<caption>');
      lines.push(...captionLines);
      lines.push('</caption>');
    } else {
      lines.push(`<caption>${example.caption}</caption>`);
    }

    lines.push('');
  }

  lines.push(...example.code.split('\n'));

  return lines;
});

/**
 * Generates the lines to render an `example` tag.
 *
 * @param {CommentTag}      tag      The tag to render.
 * @param {number}          width    The available space to render captions.
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @returns {string[]}
 */
export const renderExampleTag = R.curry((tag, width, options) => {
  const lines = [
    `@${tag.tag}`,
    ...new Array(options.jsdocLinesBetweenExampleTagAndCode).fill(''),
  ];

  if (tag.examples && tag.examples.length) {
    const examplesLines = tag.examples
      .map(get(renderExample)(width, options))
      .reduce((acc, example) => [...acc, ...(acc.length ? [''] : []), ...example], []);
    lines.push(...examplesLines, '');
  } else if (tag.description.trim()) {
    lines.push(...tag.description.split('\n'), '');
  }

  return lines;
});

export const provider = createProvider('renderExampleTag', {
  renderExampleTag,
  renderExample,
});
