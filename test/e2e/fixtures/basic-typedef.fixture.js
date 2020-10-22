//# input

/**
 * @typedef {Object} LocationCoordinates
 * @property {number} column    The column on the AST.
 */

/**
 * @typedef {Object} CommentNodeLocation
 * @property    {LocationCoordinates}    start The coordinates of where the block starts.
 */

/**
 * @typedef {Object} CommentNode
 * @property {string} value    The content of the block. Without the leading `/*` and trailing `*\/`.
 * @property { CommentNodeLocation} loc The location of the block on the AST.
 */

//# output

/**
 * @typedef {Object} LocationCoordinates
 * @property {number} column  The column on the AST.
 */

/**
 * @typedef {Object} CommentNodeLocation
 * @property {LocationCoordinates} start  The coordinates of where the block starts.
 */

/**
 * @typedef {Object} CommentNode
 * @property {string}              value  The content of the block. Without the leading `/*` and
 *                                        trailing `*\/`.
 * @property {CommentNodeLocation} loc    The location of the block on the AST.
 */
