const prettier = require('prettier');
const { name } = require('../../package.json');

/**
 * @typedef {import('./utils/types').Fixture} Fixture
 */

describe(name, () => {
  /**
   * @type {Fixture[]}
   */
  const fixtures = global.e2eFixtures;
  fixtures.forEach((fixture) => {
    it(`should format fixture: ${fixture.name}`, () => {
      const output = prettier.format(fixture.input, fixture.options).trim();
      expect(output).toBe(fixture.output);
    });
  });
});
