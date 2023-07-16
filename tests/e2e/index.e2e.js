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
    it(`should format fixture: ${fixture.name}`, async () => {
      const output = await prettier.format(fixture.input, {
        plugins: [...(fixture.plugins || []), prettierPluginJSDoc],
        ...fixture.options,
      });
      expect(output.trim()).toBe(fixture.output);
    });
  });
});
