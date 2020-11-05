// =========================================
// Imports
// =========================================

/* eslint-disable jsdoc/valid-types */
/**
 * @typedef {PrettierParser['parse']} PrettierParseFn
 */
/* eslint-enable jsdoc/valid-types */

/**
 * @typedef {import('prettier').SupportOption} PrettierSupportOption
 * @typedef {import('prettier').Options} PrettierBaseOptions
 * @typedef {import('prettier').AST} AST
 * @typedef {import('prettier').Parser} PrettierParser
 * @typedef {import('prettier').SupportLanguage} PrettierSupportLanguage
 */

// =========================================
// Options
// =========================================

/**
 * @typedef {Object} PJPDescriptionTagOptions
 * @property {boolean} jsdocAllowDescriptionTag  Whether or not allow the use of the
 *                                               `description` tag. Default `false`.
 * @property {boolean} jsdocUseDescriptionTag    Whether or not to use the `description`
 *                                               tag when a description is found in the
 *                                               _body_ or following a type/callback
 *                                               definition. Default `false`.
 */

/**
 * @typedef {Object} PJPExamplesOptions
 * @property {boolean} jsdocFormatExamples
 * Whether or not to attemp to format the `example` tags using Prettier. Default `true`.
 * @property {number} jsdocLinesBetweenExampleTagAndCode
 * How many lines should there be between an `example` tag and its code. Default `1`.
 * @property {boolean} jsdocIndentFormattedExamples
 * Whether or not to add an indentation level to the code snippets of `example` tags. The
 * indentation space will be taken from the `tabWidth` option. Default `true`.
 * @property {boolean} jsdocIndentUnformattedExamples
 * Whether or not to add an indentation level to the code snippets of `example` tags that
 * couldn't be formatted with Prettier. Default `false`.
 */

/**
 * @typedef {Object} PJPAccessTagOptions
 * @property {boolean} jsdocAllowAccessTag    Whether or not the `access` tag can be used;
 *                                            if `false`, when a tag is found, it will
 *                                            replaced with a tag of its value. For
 *                                            example: `access public` will become
 *                                            `public`. Default `true`.
 * @property {boolean} jsdocEnforceAccessTag  Whether or not to transform the tags
 *                                            `private`, `public` and `protected` into
 *                                            `access [type]` tags. Default `true`.
 */

/**
 * @typedef {Object} PJPTypesOptions
 * @property {boolean} jsdocUseTypeScriptTypesCasing
 * Whether or not to transform the casing of the basic types to make them compatible with
 * TypeScript. This applies to `string`, `number`, `boolean`, `Object` and `Array`.
 * Default `true`.
 * @property {boolean} jsdocFormatComplexTypesWithPrettier
 * Whether or not to format complex type definitions (compatibles with TypeScript) using
 * Prettier. Default `true`.
 * @property {boolean} jsdocUseShortArrays
 * Whether or not to transform the type `Array<type>` into `type[]` when possible. If
 * inside the symbols there's more than a type, the transformation won't happen. Default
 * `true`.
 * @property {boolean} jsdocFormatDotForArraysAndObjects
 * Whether or not to apply transformations regarding the dot `Array` and `Object` can have
 * before the their generics (`Array.<...`). Default `true`.
 * @property {boolean} jsdocUseDotForArraysAndObjects
 * If the formatting for dots is enabled, this options will specify whether the dot is
 * added or removed. Default `true`.
 * @property {boolean} jsdocFormatStringLiterals
 * Whether or not to apply transformations to string literal types. Default `true`.
 * @property {boolean} jsdocUseSingleQuotesForStringLiterals
 * Whether or not to use single quotes for string literals' types. Default `true`.
 * @property {number} jsdocSpacesBetweenStringLiterals
 * How many spaces should there be between string literals on a type. Default `0`.
 */

/**
 * @typedef {Object} PJPTagsOptions
 * @property {boolean}  jsdocReplaceTagsSynonyms  Whether or not to replace tags synonyms
 *                                                with their _official_ tag. For example:
 *                                                `extends` would become `augments`.
 *                                                Default `true`.
 * @property {boolean}  jsdocSortTags             Whether or not to sort the tags of a
 *                                                JSDoc block. Default `true`.
 * @property {string[]} jsdocTagsOrder            A list specifing the order in which the
 *                                                the tags of a JSDoc block should be
 *                                                sorted. It supports an `other` item to
 *                                                place tags that are not on the list.
 */

/**
 * @typedef {Object} PJPStyleOptions
 * @property {boolean} jsdocUseColumns
 * Whether or not to try to use columns for type, name and description when possible; if
 * `false`, the descriptions will be moved to a new line. Default `true`.
 * @property {boolean} jsdocGroupColumnsByTag
 * Whether to respect column alignment within the same tag. For example: all `param` tags
 * are agligned with eachother, but not with all the `throws` tags. Default `true`.
 * @property {boolean} jsdocConsistentColumns
 * This is for when the columns are algined by tags; if `true` and one tag can't use
 * columns, no other tag will use them either. Default `true`.
 * @property {number} jsdocDescriptionColumnMinLength
 * When using columns, this is the minimum available space the description column must
 * have; if it's less, the description will be moved to a new line and columns will be
 * disabled for the tag, and if consistent columns are enabled, for the entire block.
 * Default `35`.
 * @property {number} jsdocMinSpacesBetweenTagAndType
 * How many spaces should there be between a tag and a type. Default `1`.
 * @property {number} jsdocMinSpacesBetweenTypeAndName
 * How many spaces should there be between a type and a name. Default `1`.
 * @property {number} jsdocMinSpacesBetweenNameAndDescription
 * How many spaces should there be between a name and a description column. Default `2`.
 * @property {number} jsdocLinesBetweenDescriptionAndTags
 * How many lines should there be between a description body and the tags. Default `1`.
 * @property {boolean} jsdocEnsureDescriptionsAreSentences
 * If enabled, it will make sure descriptions start with an upper case letter and end with
 * a period. Default `true`.
 * @property {string[]} jsdocAllowDescriptionOnNewLinesForTags
 * A list of tags that are allowed to have their description on a new line.
 * @property {boolean} jsdocIgnoreNewLineDescriptionsForConsistentColumns
 * If enabled, when evaluating the rule for consistent columns, tags with description on a
 * new line, allowed by `jsdocAllowDescriptionOnNewLinesForTags`, will be ignored. Default
 * `true`.
 * @property {boolean} jsdocUseInlineCommentForASingleTagBlock
 * Whether or not to use a single line JSDoc block when there's only one tag. Default
 * `false`.
 */

/**
 * @typedef {Object} PJPOtherOptions
 * @property {number}  jsdocPrintWidth      This is an override for the `printWidth`
 *                                          option, in case the length of the
 *                                          documentation lines needs to be different.
 *                                          Default `0`.
 * @property {boolean} jsdocPluginEnabled   Whether or not the plugin will parse and
 *                                          transform JSDoc blocks. Default `true`.
 * @property {boolean} jsdocPluginExtended  This will prevent the plugin from running from
 *                                          the original package. The idea is for it to be
 *                                          enabled when the plugin is being extended on
 *                                          the implementation.
 */

/**
 * @typedef {PJPDescriptionTagOptions &
 *   PJPExamplesOptions &
 *   PJPAccessTagOptions &
 *   PJPTypesOptions &
 *   PJPTagsOptions &
 *   PJPStyleOptions &
 *   PJPOtherOptions} PJPOptions
 */

/**
 * @typedef {PrettierBaseOptions & PJPOptions} PrettierOptions
 */

// =========================================
// Parser
// =========================================

/**
 * @typedef {Object} CommentTagExample
 * @property {string} code       The actual code of the example.
 * @property {string} [caption]  The caption text to show above the example.
 */

/**
 * @typedef {Object} CommentTag
 * @property {string} tag
 * The name of the tag.
 * @property {string} type
 * The type of what the tag represents,
 * without the curly brackets.
 * @property {string} name
 * The name of what the tag represents.
 * @property {string} description
 * The description of what the tag represents.
 * @property {boolean} optional
 * Whether or not what the tag represents is optional.
 * @property {string} [default]
 * The default value of what the tag represents.
 * @property {boolean} [descriptionParagrah]
 * If `true`, it means that the description was originally below the tag line.
 * @property {CommentTagExample[]} [examples]
 * A list of examples associated to the tag.
 * Normally, this would only be present for for `example` tags.
 */

/**
 * @typedef {Object} CommentBlock
 * @property {string}       description  The description on the body of the block.
 * @property {CommentTag[]} tags         The list of tags on the block.
 */

// eslint-disable-next-line
export {};
