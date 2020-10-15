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

module.exports.createLanguage = createLanguage;
