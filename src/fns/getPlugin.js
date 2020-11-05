const { getLanguages } = require('./getLanguages');
const { getParsers } = require('./getParsers');
const { getOptions, getDefaultOptions } = require('./getOptions');
const { get, provider } = require('./app');

/**
 * @typedef {import('../types').PrettierSupportOption} PrettierSupportOption
 * @typedef {import('../types').PJPOptions} PJPOptions
 * @typedef {import('../types').PrettierParser} PrettierParser
 * @typedef {import('../types').PrettierSupportLanguage} PrettierSupportLanguage
 */

/**
 * @typedef {Object} Plugin
 * @property {PrettierSupportLanguage[]} languages
 * The list of supported languages.
 * @property {Object.<string, PrettierSupportOption>} options
 * The options schema for the plugin.
 * @property {PJPOptions} defaultOptions
 * The plugin options with their default values.
 * @property {Object.<string, PrettierParser>} parsers
 * The dictionary of the parsers the plugin can use.
 */

/**
 * Generates the plugin definition.
 *
 * @param {boolean} [checkExtendOption]  Whether or not, the function that creates the
 *                                       parsers should check for the option that tells
 *                                       the plugin that it's being extended, thus, the
 *                                       original package shouldn't do anything.
 * @returns {Plugin}
 */
const getPlugin = (checkExtendOption) => ({
  languages: get(getLanguages)(),
  options: get(getOptions)(),
  defaultOptions: get(getDefaultOptions)(),
  parsers: get(getParsers)(checkExtendOption),
});

module.exports.getPlugin = getPlugin;
module.exports.provider = provider('getPlugin', module.exports);
