const jsLang = require('linguist-languages/data/JavaScript.json');
const jsxLang = require('linguist-languages/data/JSX.json');
const tsLang = require('linguist-languages/data/TypeScript.json');
const tsxLang = require('linguist-languages/data/TSX.json');
const { createLanguage } = require('./fns/createLanguage');

const languages = [
  createLanguage(jsLang, {
    since: '0.0.0',
    parsers: ['babel', 'babel-flow', 'babel-ts', 'flow', 'typescript'],
    vscodeLanguageIds: ['javascript', 'mongo'],
    extensions: [...jsLang.extensions, '.wxs'],
  }),
  createLanguage(jsLang, {
    name: 'Flow',
    since: '0.0.0',
    parsers: ['flow', 'babel-flow'],
    vscodeLanguageIds: ['javascript'],
    aliases: [],
    filenames: [],
    extensions: ['.js.flow'],
  }),
  createLanguage(jsxLang, {
    since: '0.0.0',
    parsers: ['babel', 'babel-flow', 'babel-ts', 'flow', 'typescript'],
    vscodeLanguageIds: ['javascriptreact'],
  }),
  createLanguage(tsLang, {
    since: '1.4.0',
    parsers: ['typescript', 'babel-ts'],
    vscodeLanguageIds: ['typescript'],
  }),
  createLanguage(tsxLang, {
    since: '1.4.0',
    parsers: ['typescript', 'babel-ts'],
    vscodeLanguageIds: ['typescriptreact'],
  }),
];

module.exports.languages = languages;
