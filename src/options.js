/**
 * @typedef {import('./types').PrettierSupportOption} PrettierSupportOption
 * @typedef {import('./types').PJPOptions} PJPOptions
 */

/**
 * A dictionary with the plugin options.
 *
 * @type {Object.<string,PrettierSupportOption>}
 * @todo Find a way to generate from the typedef or the other way around.
 */
const options = {
  jsdocAllowDescriptionTag: {
    type: 'boolean',
    category: 'jsdoc',
    default: false,
    description: 'Whether or not allow the use of the @description tag.',
  },
  jsdocUseDescriptionTag: {
    type: 'boolean',
    category: 'jsdoc',
    default: false,
    description:
      'Whether or not to use the @description tag when a description is found in the "body" ' +
      'or following a type/callback definition.',
  },
  jsdocFormatExamples: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description: 'Whether or not to attemp to format the @example tags using Prettier.',
  },
  jsdocLinesBetweenExampleTagAndCode: {
    type: 'int',
    category: 'jsdoc',
    default: 1,
    description: 'How many lines should there be between an @example tag and its code.',
  },
  jsdocIndentFormattedExamples: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'Whether or not to add an indentation level to the code snippets of @example tags. The ' +
      'indentation space will be taken from the `tabWidth` option.',
  },
  jsdocIndentUnformattedExamples: {
    type: 'boolean',
    category: 'jsdoc',
    default: false,
    description:
      'Whether or not to add an indentation level to the code snippets of @example tags that ' +
      'couldn\'t be formatted with Prettier. This is only valid if `jsdocFormatExamples` is `true`',
  },
  jsdocAllowAccessTag: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'Whether or not the @access tag can be used; if `false`, when a tag is found, it ' +
      'will replaced with a tag of its value. For example: "@access public" will become @public.',
  },
  jsdocEnforceAccessTag: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'Whether or not to transform the tags @private, @public and @protected into ' +
      '"@access [type]" tags.',
  },
  jsdocFormatStringLiterals: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description: 'Whether or not to apply transformations to string literal types.',
  },
  jsdocUseSingleQuotesForStringLiterals: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description: 'Whether or not to use single quotes for string literals\' types.',
  },
  jsdocSpacesBetweenStringLiterals: {
    type: 'int',
    category: 'jsdoc',
    default: 1,
    description: 'ow many spaces should there be between string literals on a type.',
  },
  jsdocUseTypeScriptTypesCasing: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'Whether or not to transform the casing of the basic types to make them compatible with ' +
      'TypeScript. This applies to `string`, `number`, `boolean`, `Object` and `Array`.',
  },
  jsdocFormatComplexTypesWithPrettier: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'Whether or not to format complex type definitions (compatibles with TypeScript) using ' +
      'Prettier.',
  },
  jsdocUseShortArrays: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'Whether or not to transform the type `Array<type>` into `type[]` when possible. If ' +
      'inside the symbols there\'s more than a type, the transformation won\'t happen.',
  },
  jsdocFormatDotForArraysAndObjects: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'Whether or not to apply transformations regarding the dot `Array` and `Object` can have ' +
      'before the their generics (`Array.<...`)',
  },
  jsdocUseDotForArraysAndObjects: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'If the formatting for dots is enabled, this options will specify whether the dot is ' +
      'added or removed.',
  },
  jsdocReplaceTagsSynonyms: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'Whether or not to replace tags synonyms with their _official_ tag. For example: ' +
      '@extends would become @augments.',
  },
  jsdocSortTags: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description: 'Whether or not to sort the tags of a JSDoc block',
  },
  jsdocTagsOrder: {
    type: 'path',
    category: 'jsdoc',
    array: true,
    description:
      'A list specifing the order in which the the tags of a JSDoc block should be sorted. It ' +
      'supports an `other` item to place tags that are not on the list.',
    default: [{
      value: [
        'type',
        'typedef',
        'callback',
        'function',
        'method',
        'class',
        'file',
        'constant',
        'description',
        'classdesc',
        'example',
        'param',
        'property',
        'returns',
        'template',
        'augments',
        'extends',
        'throws',
        'yields',
        'fires',
        'listens',
        'async',
        'abstract',
        'override',
        'private',
        'protected',
        'public',
        'access',
        'desprecated',
        'author',
        'version',
        'since',
        'member',
        'memberof',
        'category',
        'external',
        'see',
        'other',
        'todo',
      ],
    }],
  },
  jsdocPrintWidth: {
    type: 'int',
    category: 'jsdoc',
    default: 0,
    description:
      'This is an override for the `printWidth` option, in case the length of the documentation ' +
      'lines needs to be different.',
  },
  jsdocUseColumns: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'Whether or not to try to use columns for type, name and description when possible; if ' +
      '`false`, the descriptions will be moved to a new line.',
  },
  jsdocGroupColumnsByTag: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'Whether to respect column alignment within the same tag. For example: all @param tags ' +
      'are agligned with eachother, but not with all the @throws tags.',
  },
  jsdocConsistentColumns: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'This is for when the columns are algined by tags; if `true` and one tag can\'t use ' +
      'columns, no other tag will use them either.',
  },
  jsdocDescriptionColumnMinLength: {
    type: 'int',
    category: 'jsdoc',
    default: 35,
    description:
      'When using columns, this is the minimum available space the description column must ' +
      'have; if it\'s less, the description will be moved to a new line and columns will be ' +
      'disabled for the tag, and if consistent columns are enabled, for the entire block.',
  },
  jsdocMinSpacesBetweenTagAndType: {
    type: 'int',
    category: 'jsdoc',
    default: 1,
    description: 'How many spaces should there be between a tag and a type.',
  },
  jsdocMinSpacesBetweenTypeAndName: {
    type: 'int',
    category: 'jsdoc',
    default: 1,
    description: 'How many spaces should there be between a type and a name.',
  },
  jsdocMinSpacesBetweenNameAndDescription: {
    type: 'int',
    category: 'jsdoc',
    default: 2,
    description: 'How many spaces should there be between a name and a description column.',
  },
  jsdocLinesBetweenDescriptionAndTags: {
    type: 'int',
    category: 'jsdoc',
    default: 1,
    description: 'How many lines should there be between a description body and the tags.',
  },
  jsdocEnsureDescriptionsAreSentences: {
    type: 'boolean',
    category: 'jsdoc',
    default: true,
    description:
      'If enabled, it will make sure descriptions start with an upper case letter and ' +
      'end with a period.',
  },
  jsdocAllowDescriptionOnNewLinesForTags: {
    type: 'path',
    category: 'jsdoc',
    array: true,
    description: 'A list of tags that are allowed to have their description on a new line.',
    default: [{
      value: [
        'classdesc',
        'license',
        'desc',
        'description',
        'file',
        'fileoverview',
        'overview',
        'summary',
      ],
    }],
  },
};
/**
 * @type {PJPOptions}
 */
const defaultOptions = Object.entries(options).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: Array.isArray(value.default) ? value.default[0].value : value.default,
  }),
  {},
);

module.exports.options = options;
module.exports.defaultOptions = defaultOptions;
