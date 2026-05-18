module.exports = {
  singleQuote: false,
  jsdocIgnoreTypedefImports: true,
};

//# input

/**
 * @typedef {import("../very/long/dir/and_file_name").VeryLongLongLongLongTypeName} VeryLongLongLongLongTypeName
 */

/**
 * @import {VeryLongLongLongLongTypeName} from "../very/long/dir/and_file_name"
 */

/**
 * @typedef {import(
 *     "../very/long/dir/and_file_name"
 * ).VeryLongLongLongLongTypeName} VeryLongLongLongLongTypeName
 */

//# output

/**
 * @typedef {import("../very/long/dir/and_file_name").VeryLongLongLongLongTypeName} VeryLongLongLongLongTypeName
 */

/**
 * @import {VeryLongLongLongLongTypeName} from "../very/long/dir/and_file_name"
 */

/**
 * @typedef {import(
 *     "../very/long/dir/and_file_name"
 * ).VeryLongLongLongLongTypeName} VeryLongLongLongLongTypeName
 */
