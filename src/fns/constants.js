import { createProvider } from './app.js';

/**
 * @typedef {import('../types').PrettierSupportLanguage} PrettierSupportLanguage
 */

/**
 * Gets a dictionary where the keys are old tags' names, and values the current tag name
 * for which they are synonym.
 *
 * This is used by one of the plugin functionalities that updates tags' names.
 *
 * @returns {Object.<string, string>}
 */
export const getTagsSynonyms = () => ({
  virtual: 'abstract',
  extends: 'augments',
  constructor: 'class',
  const: 'constant',
  defaultvalue: 'default',
  desc: 'description',
  host: 'external',
  fileoverview: 'file',
  overview: 'file',
  emits: 'fires',
  func: 'function',
  method: 'function',
  var: 'member',
  arg: 'param',
  argument: 'param',
  prop: 'property',
  return: 'returns',
  exception: 'throws',
  yield: 'yields',
  examples: 'example',
});
/**
 * Gets a list of tags that shouldn't have a `name` property, like `summary`. This list
 * exists because the parser package, incorrectly, takes the first word of the description
 * and assigns it as the `name`.
 * This plugin has a functionality that, based on this list, will move the `name` word to
 * the `description` property.
 *
 * @returns {string[]}
 */
export const getTagsWithDescriptionAsName = () => [
  'author',
  'classdesc',
  'copyright',
  'deprecated',
  'description',
  'desc',
  'example',
  'examples',
  'file',
  'license',
  'remarks',
  'notes',
  'privateRemarks',
  'summary',
  'throws',
  'returns',
  'return',
];
/**
 * Gets a list of tags that need to be in column format.
 * Certain tags, when JSDoc is used with TypeScript, are required to be in columns format
 * for the tsc to properly detect the types.
 *
 * @returns {string[]}
 */
export const getTagsThatRequireColumns = () => ['template'];
/**
 * This is almost the same as {@link getTagsWithDescriptionAsName}; the difference here is
 * that after putting together the `name` and the `description`, instead of saving the
 * result on `description`, it will be saved on `name`, as it will be better for the
 * rendering.
 *
 * @returns {string[]}
 */
export const getTagsWithNameAsDescription = () => [
  'see',
  'borrows',
  'yields',
  'todo',
  'since',
];
/**
 * There are certain tags which description cannot be converted into sentences (upper case
 * and period at the end).
 *
 * @returns {string[]}
 */
export const getTagsWithDescriptionThatCannotBeSentences = () => ['since'];
/**
 * Gets the list of languages the plugin supports.
 *
 * @returns {PrettierSupportLanguage[]}
 */
export const getSupportedLanguages = () => [
  {
    linguistLanguageId: 183,
    name: 'JavaScript',
    type: 'programming',
    tmScope: 'source.js',
    aceMode: 'javascript',
    codemirrorMode: 'javascript',
    codemirrorMimeType: 'text/javascript',
    color: '#f1e05a',
    aliases: ['js', 'node'],
    extensions: [
      '.js',
      '._js',
      '.bones',
      '.cjs',
      '.es',
      '.es6',
      '.frag',
      '.gs',
      '.jake',
      '.javascript',
      '.jsb',
      '.jscad',
      '.jsfl',
      '.jslib',
      '.jsm',
      '.jspre',
      '.jss',
      '.mjs',
      '.njs',
      '.pac',
      '.sjs',
      '.ssjs',
      '.xsjs',
      '.xsjslib',
      '.wxs',
    ],
    filenames: ['Jakefile'],
    interpreters: [
      'chakra',
      'd8',
      'gjs',
      'js',
      'node',
      'nodejs',
      'qjs',
      'rhino',
      'v8',
      'v8-shell',
      'zx',
    ],
    parsers: [
      'babel',
      'acorn',
      'espree',
      'meriyah',
      'babel-flow',
      'babel-ts',
      'flow',
      'typescript',
    ],
    vscodeLanguageIds: ['javascript', 'mongo'],
  },
  {
    linguistLanguageId: 183,
    name: 'Flow',
    type: 'programming',
    tmScope: 'source.js',
    aceMode: 'javascript',
    codemirrorMode: 'javascript',
    codemirrorMimeType: 'text/javascript',
    color: '#f1e05a',
    aliases: [],
    extensions: ['.js.flow'],
    filenames: [],
    interpreters: [
      'chakra',
      'd8',
      'gjs',
      'js',
      'node',
      'nodejs',
      'qjs',
      'rhino',
      'v8',
      'v8-shell',
    ],
    parsers: ['flow', 'babel-flow'],
    vscodeLanguageIds: ['javascript'],
  },
  {
    linguistLanguageId: 183,
    name: 'JSX',
    type: 'programming',
    tmScope: 'source.js.jsx',
    aceMode: 'javascript',
    codemirrorMode: 'jsx',
    codemirrorMimeType: 'text/jsx',
    color: undefined,
    aliases: undefined,
    extensions: ['.jsx'],
    filenames: undefined,
    interpreters: undefined,
    parsers: [
      'babel',
      'babel-flow',
      'babel-ts',
      'flow',
      'typescript',
      'espree',
      'meriyah',
    ],
    vscodeLanguageIds: ['javascriptreact'],
    group: 'JavaScript',
  },
  {
    linguistLanguageId: 378,
    name: 'TypeScript',
    type: 'programming',
    color: '#3178c6',
    aliases: ['ts'],
    interpreters: ['deno', 'ts-node'],
    extensions: ['.ts', '.cts', '.mts'],
    tmScope: 'source.ts',
    aceMode: 'typescript',
    codemirrorMode: 'javascript',
    codemirrorMimeType: 'application/typescript',
    parsers: ['typescript', 'babel-ts'],
    vscodeLanguageIds: ['typescript'],
  },
  {
    linguistLanguageId: 94901924,
    name: 'TSX',
    type: 'programming',
    color: '#3178c6',
    group: 'TypeScript',
    extensions: ['.tsx'],
    tmScope: 'source.tsx',
    aceMode: 'javascript',
    codemirrorMode: 'jsx',
    codemirrorMimeType: 'text/jsx',
    parsers: ['typescript', 'babel-ts'],
    vscodeLanguageIds: ['typescriptreact'],
  },
];

export const provider = createProvider('constants', {
  getTagsSynonyms,
  getTagsWithDescriptionAsName,
  getTagsThatRequireColumns,
  getTagsWithDescriptionThatCannotBeSentences,
  getTagsWithNameAsDescription,
  getSupportedLanguages,
});
