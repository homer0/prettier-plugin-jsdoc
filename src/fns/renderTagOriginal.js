import * as R from 'ramda';
import { createProvider } from './app.js';

/**
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Renders the original content of a JSDoc tag. This is used when formatting is disabled
 * for an specific tag.
 *
 * @callback RenderTagOriginalFn
 * @param {CommentTag} tag  The tag to render.
 * @returns {string[]}
 */

/**
 * @type {RenderTagOriginalFn}
 */
export const renderTagOriginal = R.curry((tag) => {
  const lines = tag.source.reduce((acc, src) => {
    const raw = src.source.trim();
    if (raw === '*/') return acc;
    acc.push(raw.replace(/^\*\s*/, ''));
    return acc;
  }, []);

  return lines;
});

export const provider = createProvider('renderTagOriginal', {
  renderTagOriginal,
});
