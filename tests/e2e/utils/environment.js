import { builtinEnvironments } from 'vitest/environments';
import { loadFixtures } from './loader.js';

const { node } = builtinEnvironments;

/**
 * A custom environment that loads and injects the E2E fixtures information on the global
 * object.
 *
 * @type {import('vitest/environments').Environment}
 */
const fixturesEnvironment = {
  name: 'fixtures',
  viteEnvironment: 'ssr',
  setup: async function (...args) {
    const baseEnv = await node.setup(...args);
    const fixtures = await loadFixtures();

    globalThis.e2eFixtures = fixtures;

    return {
      async teardown() {
        delete globalThis.e2eFixtures;
        await baseEnv.teardown();
      },
    };
  },
};

export default fixturesEnvironment;
