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
  const lines = tag.source.reduce((acc, src, index) => {
    const raw = src.source.trim();
    if (raw === '*/') return acc;
    /**
     * Remove all the spaces after the `*` only when the tag has multiple lines and the
     * current line is not the first one: removing it from the middle lines would break
     * possible indentation, while the first one is the one that has the tag. We don't
     * care about the last one because the callback early returns when it finds it.
     */
    const safe =
      index > 0 && tag.source.length > 1
        ? raw.replace(/^\*\s/, '')
        : raw.replace(/^\*\s*/, '');

    acc.push(safe);
    return acc;
  }, []);

  return lines;
});

export const provider = createProvider('renderTagOriginal', {
  renderTagOriginal,
});
