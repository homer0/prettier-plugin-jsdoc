const prettier = require('prettier');
const prettierPluginJSDoc = require('../../src');
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
      const output = prettier
        .format(fixture.input, {
          plugins: [...(fixture.plugins || []), prettierPluginJSDoc],
          ...fixture.options,
        })
        .trim();
      expect(output).toBe(fixture.output);
    });
  });
});
