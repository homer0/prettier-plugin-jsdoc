const path = require('path');
/**
 * The actual dependency injection container. The keys will be the original functions, and
 * the values may be the same, or the overrides.
 *
 * @type {Map<Function, Function>}
 */
const container = new Map();
/**
 * This secret exists so when {@link registerModule} gets called with a raw
 * `module.exports`, it can safely skip a provider, as providers created with
 * {@link provider} have this secret as a property.
 *
 * @type {symbol}
 */
const providerKey = Symbol('provider-secret');
/**
 * Adds a new function to the container.
 *
 * @param {Function} originalFn  The reference for the original function.
 */
const register = (originalFn) => {
  container.set(originalFn, originalFn);
};
/**
 * Overrides a function on the container.
 *
 * @param {OG} originalFn  The reference for the original function.
 * @param {OG} fn          The override function.
 * @template OG
 */
const override = (originalFn, fn) => {
  container.set(originalFn, fn);
};
/**
 * Gets a function or a function override from the container.
 *
 * @param {OG} originalFn  The reference for the original function.
 * @returns {OG}
 * @template OG
 */
const get = (originalFn) => container.get(originalFn) || originalFn;
/**
 * Registers a list or a dictionary of functions for a module. The idea of this function
 * is that it can be easily use to register a `module.exports`. Check the example.
 *
 * @param {string} id
 * The ID of the module; it will be added as the `moduleId` property of the functions.
 * @param {Function[] | Object.<string, Function>} fns
 * The list or dictionary of functions.
 * @example
 *
 *   module.exports.myFn = myFn;
 *   module.exports.myOtherFn = myOtherFn;
 *   registerModule('my-mod', module.exports);
 *
 */
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
/**
 * Creates a "module provider": a function that when called, it will execute
 * {@link registerModule}.
 * The idea of the providers is that they can be executed on runtime, or on a
 * "registration step".
 *
 * @param {string} id
 * The ID of the module.
 * @param {Function[] | Object.<string, Function>} fns
 * The list or dictionary of functions.
 * @returns {Function}
 */
const provider = (id, fns) => {
  /**
   * The function that when executed will take care of registering the module.
   */
  const fn = () => {
    registerModule(id, fns);
  };
  fn.providerKey = providerKey;
  return fn;
};
/**
 * Loads a list of files, takes their `provider` export (if present) and executes it.
 *
 * @param {string}   directoryPath  The path of where the `list` of files is located.
 * @param {string[]} list           A list of files with a `provider` export that should
 *                                  be executed.
 */
const loadProviders = (directoryPath, list) => {
  list
    .map((modName) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const { provider: modProvider } = require(path.join(
        directoryPath,
        `${modName}.js`,
      ));
      return modProvider;
    })
    .filter((modProvider) => modProvider)
    .forEach((modProvider) => {
      modProvider();
    });
};

module.exports.register = register;
module.exports.override = override;
module.exports.get = get;
module.exports.container = container;
module.exports.registerModule = registerModule;
module.exports.provider = provider;
module.exports.loadProviders = loadProviders;
