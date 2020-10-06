const { format } = require('prettier');
const R = require('ramda');

/**
 * @typedef {import('../types').PrettierOptions} PrettierOptions
 */

/**
 * This function is used to prepare a complex type in order to render it by creating a TS code and
 * sending it through Prettier.
 *
 * @callback PreparePrettyTypeFn
 * @param {string}          type     The type to prepare.
 * @param {PrettierOptions} options  The options sent to the plugin.
 * @returns {string}
 */

/**
 * @type {PreparePrettyTypeFn}
 */
const preparePrettyType = R.curry((type, options) => {
  if (!type.match(/[&<\.]/)) return type;
  let result;
  try {
    const useType = type.replace(/\*/g, 'any');
    const prefix = 'type complex = ';
    result = format(`${prefix}${useType}`, {
      ...options,
      parser: 'typescript',
    })
    .substr(prefix.length)
    .trim()
    .replace(/;$/, '');
  } catch (ignore) {
    // Ignore the error because if it failed, it's an issue with Pettier.
    result = type;
  }

  return result;
});

module.exports.preparePrettyType = preparePrettyType;
