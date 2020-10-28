const path = require('path');
const { loadProviders, get } = require('./app');
const { getPlugin } = require('./fns/getPlugin');

loadProviders(path.join(__dirname, 'fns'), [
  'formatAccessTag',
  'formatArrays',
  'formatDescription',
  'formatObjects',
  'formatStringLiterals',
  'formatTSTypes',
  'formatTags',
  'formatTagsDescription',
  'formatTagsTypes',
  'formatTypeAsCode',
  'getLanguages',
  'getOptions',
  'getParsers',
  'getPlugin',
  'prepareExampleTag',
  'prepareTagDescription',
  'prepareTagName',
  'prepareTags',
  'render',
  'renderExampleTag',
  'renderTagInColumns',
  'renderTagInLine',
  'replaceTagsSynonyms',
  'sortTags',
  'splitText',
  'trimTagsProperties',
  'utils',
]);

module.exports = get(getPlugin)();
