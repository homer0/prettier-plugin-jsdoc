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
 * @returns {Promise<PrettierSupportLanguage[]>}
 */
const getLanguages = async () => {
  const { languages } = await prettier.getSupportInfo();
  return R.filter(
    R.propSatisfies(R.includes(R.__, get(getSupportedLanguages)()), 'name'),
    languages,
  );
};

module.exports.getLanguages = getLanguages;
module.exports.provider = provider('getLanguages', module.exports);
