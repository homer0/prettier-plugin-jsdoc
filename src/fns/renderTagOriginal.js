const R = require('ramda');
const { provider } = require('./app');

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
const renderTagOriginal = R.curry((tag) => {
  const lines = tag.source.reduce((acc, src) => {
    const raw = src.source.trim();
    if (raw === '*/') return acc;
    acc.push(raw.replace(/^\*\s*/, ''));
    return acc;
  }, []);

  return lines;
});

module.exports.renderTagOriginal = renderTagOriginal;
module.exports.provider = provider('renderTagOriginal', module.exports);
