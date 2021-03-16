const { provider } = require('./app');

/**
 * Gets a dictionary where the keys are old tags' names, and values the current tag name
 * for which they are synonym.
 *
 * This is used by one of the plugin functionalitites that updates tags' names.
 *
 * @returns {Object.<string, string>}
 */
const getTagsSynonyms = () => ({
  virtual: 'abstract',
  extends: 'augments',
  constructor: 'class',
  const: 'constant',
  defaultvalue: 'default',
  desc: 'description',
  host: 'external',
  fileoverview: 'file',
  overview: 'file',
  emits: 'fires',
  func: 'function',
  method: 'function',
  var: 'member',
  arg: 'param',
  argument: 'param',
  prop: 'property',
  return: 'returns',
  exception: 'throws',
  yield: 'yields',
  examples: 'example',
});
/**
 * Gets a list of tags that shouldn't have a `name` property, like `summary`. This list
 * exists because the parser package, incorrectly, takes the first word of the description
 * and assigns it as the `name`.
 * This plugin has a functionality that, based on this list, will move the `name` word to
 * the `description` property.
 *
 * @returns {string[]}
 */
const getTagsWithDescriptionAsName = () => [
  'author',
  'classdesc',
  'copyright',
  'deprecated',
  'description',
  'desc',
  'example',
  'examples',
  'file',
  'license',
  'remarks',
  'summary',
  'throws',
  'todo',
];
/**
 * This is almost the same as {@link getTagsWithDescriptionAsName}; the difference here is
 * that after putting together the `name` and the `description`, instead of saving the
 * result on `description`, it will be saved on `name`, as it will be better for the
 * rendering.
 *
 * @returns {string[]}
 */
const getTagsWithNameAsDescription = () => ['see', 'borrows', 'yields', 'returns'];
/**
 * Gets the list of languages the plugin supports.
 *
 * @returns {string[]}
 */
const getSupportedLanguages = () => ['JavaScript', 'Flow', 'JSX', 'TSX', 'TypeScript'];

module.exports.getTagsSynonyms = getTagsSynonyms;
module.exports.getTagsWithDescriptionAsName = getTagsWithDescriptionAsName;
module.exports.getTagsWithNameAsDescription = getTagsWithNameAsDescription;
module.exports.getSupportedLanguages = getSupportedLanguages;
module.exports.provider = provider('constants');
