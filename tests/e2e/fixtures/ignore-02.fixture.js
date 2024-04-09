module.exports = {
  jsdocIgnoreTags: ['param'],
  jsdocGroupColumnsByTag: false,
};

//# input

/**
 * @callback IsAvailable
 * @param {"blue"|"red"|"purple"|"orange"} color Something.
 * @returns {boolean} Some flag property.
 * @throws {Error} If something goes wrong
 * @see Something.
 * @since 1.0.0 RC1
 */

//# output

/**
 * @callback IsAvailable
 * @param {"blue"|"red"|"purple"|"orange"} color Something.
 * @returns  {boolean} Some flag property.
 * @throws   {Error}   If something goes wrong.
 * @since    1.0.0 RC1
 * @see      Something.
 */
