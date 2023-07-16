const { get } = require('./fns/app');
const { getPlugin } = require('./fns/getPlugin');
const { loadFns } = require('./loader');

loadFns();
/**
 * Get the plugin.
 *
 * @returns {import('./types').PrettierPlugin}
 */
module.exports = () => get(getPlugin)(true);
