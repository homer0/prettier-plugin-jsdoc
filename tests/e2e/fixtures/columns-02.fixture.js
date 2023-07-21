/**
 * This fixture will validate the formatting of columns without grouping them by tag name.
 */

module.exports = {
  jsdocGroupColumnsByTag: false,
  jsdocAllowDescriptionTag: false,
};

//# input

/**
 * @callback IsAvailable
 * @param {"blue"|"red"|"purple"|"orange"} color Something.
 * @returns {boolean} Some flag property.
 * @throws {Error} If something goes wrong
 * @see Something.
 */

/**
 * @callback isDisabled
 * @param {"blue"|"red"|"purple"|"orange"|"yellow"} someReallyLongNameToDisableColumns Something.
 * @returns {boolean}
 */

//# output

/**
 * @callback IsAvailable
 * @param    {'blue' | 'red' | 'purple' | 'orange'} color        Something.
 * @returns  {boolean}                              Some flag property.
 * @throws   {Error}                                If something goes wrong.
 * @see      Something.
 */

/**
 * @callback isDisabled
 * @param {'blue' | 'red' | 'purple' | 'orange' | 'yellow'} someReallyLongNameToDisableColumns
 * Something.
 * @returns {boolean}
 */
