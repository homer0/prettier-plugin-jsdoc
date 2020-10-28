/* eslint-disable jsdoc/require-jsdoc */

const { getLanguages } = require('./getLanguages');
const { getParsers } = require('./getParsers');
const { getOptions, getDefaultOptions } = require('./getOptions');
const { getFn, provider } = require('../app');

const getPlugin = () => ({
  languages: getFn(getLanguages)(),
  options: getFn(getOptions)(),
  defaultOptions: getFn(getDefaultOptions)(),
  parsers: getFn(getParsers)(),
});

module.exports.getPlugin = getPlugin;
module.exports.provider = provider('getPlugin', module.exports);
