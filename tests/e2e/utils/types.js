/**
 * @typedef {import('../../../src/types').PrettierOptions} PrettierOptions
 */

/**
 * @typedef {Object} Fixture
 * @property {string}                   name      The name of the fixture.
 * @property {string}                   filename  The name of the fixture file.
 * @property {Partial<PrettierOptions>} options   The Prettier options for the fixture.
 * @property {string}                   input     The code that needs to be formatted with
 *                                                Prettier.
 * @property {string}                   output    The code expected to match with the one
 *                                                formatted.
 */

export const typesModule = true;
