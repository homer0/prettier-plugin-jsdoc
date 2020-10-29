const jsLang = require('linguist-languages/data/JavaScript.json');
const jsxLang = require('linguist-languages/data/JSX.json');
const tsLang = require('linguist-languages/data/TypeScript.json');
const tsxLang = require('linguist-languages/data/TSX.json');
const { get, provider } = require('./app');

/**
 * @typedef {LinguistLanguageProperties & LanguageSharedProperties} LinguistLanguage
 */

/**
 * @typedef {LanguagePrivateProperties & LanguageSharedProperties & LanguageProperties} Language
 */

/**
 * @typedef {Object} LinguistLanguageProperties
 * @property {number} languageId  A unique identifier for the language.
 */

/**
 * @typedef {Object} LanguageSharedProperties
 * @property {string[]} extensions   The extensions of files that related to the language.
 * @property {string[]} [aliases]    A list of known aliases for the language.
 * @property {string[]} [filenames]  An Array of filenames commonly associated with the language.
 * @see https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
 */

/**
 * @typedef {Object} LanguagePrivateProperties
 * @property {number} linguistLanguageId  The unique ID for the language on Linguist.
 */

/**
 * @typedef {Object} LanguageProperties
 * @property {string}   since              Since which version of Prettier it can be used.
 * @property {string[]} parsers            The list of parsers that can parse the language.
 * @property {string[]} vscodeLanguageIds  The ID for the language on VSCode.
 */

/**
 * @typedef {LanguageProperties & Partial<LanguageSharedProperties>} LanguageOverrides
 */

/**
 * Creates the language definition for Prettier.
 *
 * @param {LinguistLanguage}  linguistLanguage  The base data for the language that will be used.
 * @param {LanguageOverrides} overrides         The information of the language for Prettier, and
 *                                              possible overrides for the Linguist data.
 * @returns {Language}
 */
const createLanguage = (linguistLanguage, overrides) => {
  const { languageId, ...rest } = linguistLanguage;
  return {
    linguistLanguageId: languageId,
    ...rest,
    ...overrides,
  };
};

/**
 * Generates the list of languages the plugin supports.
 *
 * @returns {Language[]}
 */
const getLanguages = () => {
  const useCreateLanguage = get(createLanguage);
  return [
    useCreateLanguage(jsLang, {
      since: '0.0.0',
      parsers: ['babel', 'babel-flow', 'babel-ts', 'flow', 'typescript'],
      vscodeLanguageIds: ['javascript', 'mongo'],
      extensions: [...jsLang.extensions, '.wxs'],
    }),
    useCreateLanguage(jsLang, {
      name: 'Flow',
      since: '0.0.0',
      parsers: ['flow', 'babel-flow'],
      vscodeLanguageIds: ['javascript'],
      aliases: [],
      filenames: [],
      extensions: ['.js.flow'],
    }),
    useCreateLanguage(jsxLang, {
      since: '0.0.0',
      parsers: ['babel', 'babel-flow', 'babel-ts', 'flow', 'typescript'],
      vscodeLanguageIds: ['javascriptreact'],
    }),
    useCreateLanguage(tsLang, {
      since: '1.4.0',
      parsers: ['typescript', 'babel-ts'],
      vscodeLanguageIds: ['typescript'],
    }),
    useCreateLanguage(tsxLang, {
      since: '1.4.0',
      parsers: ['typescript', 'babel-ts'],
      vscodeLanguageIds: ['typescriptreact'],
    }),
  ];
};

module.exports.getLanguages = getLanguages;
module.exports.createLanguage = createLanguage;
module.exports.provider = provider('getLanguages', module.exports);
