import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadProviders } from './fns/app';
/**
 * Loads and registers the providers of all the plugin functions.
 */
export const loadFns = () => {
  const currentDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.');
  loadProviders(path.join(currentDir, 'fns'), [
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
