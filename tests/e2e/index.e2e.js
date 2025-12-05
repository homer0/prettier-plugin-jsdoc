import prettier from 'prettier';
import { describe, it, expect } from 'vitest';
import prettierPluginJSDoc from '../../src/index.js';
import { name } from '../../package.json' with { type: 'json' };

/**
 * @typedef {import('./utils/types').Fixture} Fixture
 */

describe(name, () => {
  /**
   * @type {Fixture[]}
   */
  const fixtures = globalThis.e2eFixtures;

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
