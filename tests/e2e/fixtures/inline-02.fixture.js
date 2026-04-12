/**
 * This fixture will validate the inline formatting of tags, but with the option to keep the
 * description, when possible, in the same line as the tag.
 */

module.exports = {
  jsdocUseColumns: false,
  jsdocDescriptionInTheSameLine: true,
  jsdocMinSpacesBetweenNameAndDescription: 1,
};

//# input

/**
 * Adds or updates a watched video entry.
 * @param {string}             videoId        YouTube video id.
 * @param {number}             timestamp      Watch timestamp in milliseconds.
 * @param {{ save?: boolean }} [options]      Behavior options.
 * @param {boolean}            [options.save] Whether to persist immediately. Defaults to `true`.
 * @param {{
 *   optionA: string;
 *  optionB: number;
 *  optionC: boolean;
 * }} [options.complexOption]  A complex option with multiple properties.
 * @param {SomeReallyLongTypeThatWillNotFitInTheSameLine} [options.anotherComplexOption] Another complex option to make sure the description will not fit in the same line.
 * @returns {void}
 */

/**
 * Calculates an average count for a day-bucket map.
 * @param {Map<number, number>} countsByDay Video counts grouped by day number.
 * @param {number}              [divisor]   Divisor to use for the average. Defaults to
 *                                          `countsByDay.size`.
 * @returns {number | "(n/a)"} Rounded average or `(n/a)` when it cannot be computed.
 */

//# output

/**
 * Adds or updates a watched video entry.
 *
 * @param {string} videoId YouTube video id.
 * @param {number} timestamp Watch timestamp in milliseconds.
 * @param {{ save?: boolean }} [options] Behavior options.
 * @param {boolean} [options.save] Whether to persist immediately. Defaults to `true`.
 * @param {{
 *   optionA: string;
 *   optionB: number;
 *   optionC: boolean;
 * }} [options.complexOption] A complex option with multiple properties.
 * @param {SomeReallyLongTypeThatWillNotFitInTheSameLine} [options.anotherComplexOption]
 * Another complex option to make sure the description will not fit in the same line.
 * @returns {void}
 */

/**
 * Calculates an average count for a day-bucket map.
 *
 * @param {Map<number, number>} countsByDay Video counts grouped by day number.
 * @param {number} [divisor] Divisor to use for the average. Defaults to `countsByDay.size`.
 * @returns {number | '(n/a)'} Rounded average or `(n/a)` when it cannot be computed.
 */
