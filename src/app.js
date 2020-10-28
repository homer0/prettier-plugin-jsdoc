/* eslint-disable jsdoc/require-jsdoc */
const path = require('path');

const container = new Map();
const providerKey = Symbol('provider-secret');
/**
 * Adds a new function to the app container.
 *
 * @param {Function} originalFn  The original function to add.
 */
const register = (originalFn) => {
  container.set(originalFn, originalFn);
};
/**
 * Overrides a function on the app container.
 *
 * @param {OG} originalFn  The reference to the original function that will be overriden.
 * @param {OG} fn          The override function.
 * @template OG
 */
const override = (originalFn, fn) => {
  container.set(originalFn, fn);
};
/**
 * Gets a function or a function override from the app container.
 *
 * @param {OG} originalFn  The reference to the original function.
 * @returns {OG}
 * @template OG
 */
const get = (originalFn) => container.get(originalFn) || originalFn;

const registerModule = (id, fns) => {
  const useFns = Array.isArray(fns) ? fns : Object.values(fns);
  useFns
  .filter((fn) => fn.providerKey !== providerKey)
  .forEach((fn) => {
    // eslint-disable-next-line no-param-reassign
    fn.moduleId = id;
    register(fn);
  });
};

const provider = (id, fns) => {
  const fn = () => registerModule(id, fns);
  fn.providerKey = providerKey;
  return fn;
};

const loadProviders = (directoryPath, list) => list
.map((modName) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const { provider: modProvider } = require(path.join(directoryPath, `${modName}.js`));
  return modProvider;
})
.filter((modProvider) => modProvider)
.forEach((modProvider) => {
  modProvider();
});

module.exports.register = register;
module.exports.override = override;
module.exports.get = get;
module.exports.container = container;
module.exports.registerModule = registerModule;
module.exports.provider = provider;
module.exports.loadProviders = loadProviders;
