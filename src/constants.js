const TAGS_SYNONYMS = {
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
};

const TAGS_WITH_TYPE_AS_NAME = [
  'aguments',
  'extends',
  'constructs',
  'event',
  'external',
  'fires',
  'interface',
  'lends',
  'listens',
  'memberof',
  'memberof!',
  'mixes',
  'requires',
];

const TAGS_WITH_DESCRIPTION_AS_NAME = [
  'author',
  'classdesc',
  'copyright',
  'deprecated',
  'description',
  'desc',
  'example',
  'file',
  'license',
  'summary',
  'throws',
  'todo',
];

const TAGS_WITH_NAME_AS_DESCRIPTION = [
  'see',
  'borrows',
  'yields',
];

module.exports.TAGS_SYNONYMS = TAGS_SYNONYMS;
module.exports.TAGS_WITH_TYPE_AS_NAME = TAGS_WITH_TYPE_AS_NAME;
module.exports.TAGS_WITH_DESCRIPTION_AS_NAME = TAGS_WITH_DESCRIPTION_AS_NAME;
module.exports.TAGS_WITH_NAME_AS_DESCRIPTION = TAGS_WITH_NAME_AS_DESCRIPTION;
