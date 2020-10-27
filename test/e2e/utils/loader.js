const path = require('path');
const fs = require('fs').promises;

/**
 * @typedef {import('../../../src/types').PrettierOptions} PrettierOptions
 * @typedef {import('./types').Fixture} Fixture
 */

/**
 * @typedef {Fixture & RawFixtureProperties} RawFixture
 */

/**
 * @typedef {Object} RawFixtureProperties
 * @property {boolean} [boolean]  Whether or not it should be the only fixture to be validated.
 * @property {boolean} [skip]     Whether or not to skip the fixture.
 */

/**
 * The name of the directory where the fixtures are located.
 *
 * @type {string}
 */
const FIXTURES_DIRNAME = 'fixtures';
/**
 * The absolute path to the fixtures directory.
 *
 * @type {string}
 */
const FIXTURES_PATH = path.join(__dirname, '..', FIXTURES_DIRNAME);
/**
 * The expression the fixtures' filenames should match in order to be loaded.
 *
 * @type {RegExp}
 */
const FIXTURES_FORMAT = /\.fixture\.js$/;
/**
 * A set of default options that will be used as a base and merged with the ones from the fixtures.
 *
 * @type {Partial<PrettierOptions>}
 */
const DEFAULT_OPTIONS = {
  printWidth: 100,
  singleQuote: true,
};

/**
 * Loads and parses a fixture file.
 *
 * @param {string} filename The name of the fixture file.
 * @returns {Promise<RawFixture>}
 * @throws {Error} If a fixture doesn't have an `input` and/or an `output`.
 */
const parseFixture = async (filename) => {
  const filepath = path.join(FIXTURES_PATH, filename);
  const contents = await fs.readFile(filepath, 'utf-8');
  let section = '';
  const sections = {};
  const rest = [];
  contents
  .split('\n')
  .forEach((line) => {
    const match = /^\s*\/\/#\s+(\w+)\s*$/.exec(line);
    if (match) {
      section = match[1].trim();
      sections[section] = [];
    } else if (section) {
      sections[section].push(line);
    } else {
      rest.push(line);
    }
  });

  const options = rest.length ?
    // eslint-disable-next-line no-eval
    (eval(rest.join('\n').trim()) || {}) :
    {};

  options.filepath = path.join(FIXTURES_PATH, 'index.js');

  const data = Object.entries(sections).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value.join('\n').trim(),
    }),
    {},
  );

  if (!data.input || !data.output) {
    throw new Error('Both `input` and `output` are required on all fixtures');
  }

  return {
    name: filename.replace(FIXTURES_FORMAT, ''),
    filename,
    options: {
      ...DEFAULT_OPTIONS,
      ...options,
    },
    ...data,
  };
};
/**
 * Loads and parses all the fixtures.
 *
 * @returns {Promise<Fixture[]>}
 */
const loadFixtures = async () => {
  let files = await fs.readdir(FIXTURES_PATH);
  files = files.filter((file) => file.match(FIXTURES_FORMAT));
  const fixtures = await Promise.all(files.map((file) => parseFixture(file)));
  const only = fixtures.find((fixture) => fixture.options.only);
  if (only) {
    delete only.options.only;
    return [only];
  }

  return fixtures.filter((fixture) => !fixture.skip);
};

module.exports.loadFixtures = loadFixtures;
