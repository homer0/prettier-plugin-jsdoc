const R = require('ramda');
const prettier = require('prettier');
const { getSupportedLanguages } = require('./constants');
const { get, provider } = require('./app');

/**
 * @typedef {import('../types').PrettierSupportLanguage} PrettierSupportLanguage
 */

/**
 * Generates the list of languages the plugin supports.
 *
 * @returns {PrettierSupportLanguage[]}
 */
const getLanguages = () =>
  R.filter(
    R.propSatisfies(R.includes(R.__, get(getSupportedLanguages)()), 'name'),
    prettier.getSupportInfo().languages,
  );

module.exports.getLanguages = getLanguages;
module.exports.provider = provider('getLanguages', module.exports);
