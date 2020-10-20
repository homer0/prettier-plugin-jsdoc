const babelParser = require('prettier/parser-babel');
const flowParser = require('prettier/parser-flow');
const tsParser = require('prettier/parser-typescript');
const { createParser } = require('./fns/createParser');
/**
 * @typedef {import('./types').PrettierParser} PrettierParser
 */

/**
 * A dictionary with the supported parsers the plugin can use.
 *
 * @type {Object.<string,PrettierParser>}
 */
const parsers = {
  get babel() {
    const parser = babelParser.parsers.babel;
    return { ...parser, parse: createParser(parser.parse) };
  },
  get 'babel-flow'() {
    const parser = babelParser.parsers['babel-flow'];
    return { ...parser, parse: createParser(parser.parse) };
  },
  get 'babel-ts'() {
    const parser = babelParser.parsers['babel-ts'];
    return { ...parser, parse: createParser(parser.parse) };
  },
  get flow() {
    const parser = flowParser.parsers.flow;
    return { ...parser, parse: createParser(parser.parse) };
  },
  get typescript() {
    const parser = tsParser.parsers.typescript;
    return { ...parser, parse: createParser(parser.parse) };
  },
};

module.exports.parsers = parsers;
