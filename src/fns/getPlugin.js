/* eslint-disable jsdoc/require-jsdoc */

const { getLanguages } = require('./getLanguages');
const { getParsers } = require('./getParsers');
const { getOptions, getDefaultOptions } = require('./getOptions');
const { get, provider } = require('../app');

const getPlugin = () => ({
  languages: get(getLanguages)(),
  options: get(getOptions)(),
  defaultOptions: get(getDefaultOptions)(),
  parsers: get(getParsers)(),
});

module.exports.getPlugin = getPlugin;
module.exports.provider = provider('getPlugin', module.exports);
