const path = require('path');
const { loadProviders } = require('./fns/app');
/**
 * Loads and registers the providers of all the plugin functions.
 */
const loadFns = () => {
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
};

module.exports.loadFns = loadFns;
