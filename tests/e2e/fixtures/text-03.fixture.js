module.exports = {
  jsdocExperimentalFormatCommentsWithoutTags: true,
  jsdocExperimentalIgnoreInlineForCommentsWithoutTags: true,
  jsdocUseInlineCommentForASingleTagBlock: true,
};

//# input

/**
 * Lorem ipsum dolor sit amet.
 */

/** Consectetur adipiscing elit. */

//# output

/**
 * Lorem ipsum dolor sit amet.
 */

/**
 * Consectetur adipiscing elit.
 */
