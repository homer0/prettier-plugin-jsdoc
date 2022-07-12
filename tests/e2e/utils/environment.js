const { default: NodeEnvironment } = require('jest-environment-node');
const { loadFixtures } = require('./loader');
/**
 * A custom environment that loads and injects the E2E fixtures information on the global
 * object.
 *
 * @augments NodeEnvironment
 */
class FixturesEnvironment extends NodeEnvironment {
  /**
   * Overrides the setup of the environment, loads and injects the E2E fixtures on the
   * `e2eFixtures` global object.
   *
   * @returns {Promise}
   */
  async setup() {
    await super.setup();
    this.global.e2eFixtures = await loadFixtures();
  }
}

module.exports = FixturesEnvironment;
