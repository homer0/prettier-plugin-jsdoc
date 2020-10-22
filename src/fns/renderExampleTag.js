const R = require('ramda');

/**
 * @typedef {import('../types').PJPExamplesOptions} PJPExamplesOptions
 * @typedef {import('../types').CommentTag} CommentTag
 */

/**
 * Renders an `example` tag by just adding the code below the tag.
 *
 * @param {CommentTag}         tag     The tag to render.
 * @param {PJPExamplesOptions} options The options related to the `example` tags.
 * @returns {string[]}
 */
const renderExampleTag = R.curry((tag, options) => [
  `@${tag.tag}`,
  ...((new Array(options.jsdocLinesBetweenExampleTagAndCode)).fill('')),
  ...tag.description.split('\n'),
]);

module.exports.renderExampleTag = renderExampleTag;
