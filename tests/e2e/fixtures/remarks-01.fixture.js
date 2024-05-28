module.exports = {
  jsdocAllowDescriptionOnNewLinesForTags: [
    'classdesc',
    'license',
    'desc',
    'description',
    'file',
    'fileoverview',
    'overview',
    'summary',
    'remarks',
    'privateRemarks',
  ]
};

//# input

/**
 * @description logs something.
 * @param {string} [name='batman'] the name
 * @param {Logger} [logger] the logger instance
 * @see Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 * @remarks
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus auctor a venenatis ante. In {@link SomethingElse} hac habitasse platea dictumst.
 * @privateRemarks
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. {@link SomethingElse} Nullam vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 */
export function log(name = 'batman', logger) {}

/**
 * @type {Object} RemarkWithLink
 * @remarks
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum {@link SomethingElse} nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 * @privateRemarks
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec xx {@link SomethingElse | something} nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 */

//# output

/**
 * Logs something.
 *
 * @param {string} [name='batman']  The name.
 * @param {Logger} [logger]         The logger instance.
 * @see Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh,
 *      sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus
 *      luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 * @remarks
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed
 * aliquet ante porta a. Nullam blandit posuere fringilla. Nullam vel risus vitae lectus luctus
 * auctor a venenatis ante. In {@link SomethingElse} hac habitasse platea dictumst.
 * @privateRemarks
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum nibh, sed
 * aliquet ante porta a. Nullam blandit posuere fringilla. {@link SomethingElse} Nullam vel risus
 * vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 */
export function log(name = 'batman', logger) {}

/**
 * @type {Object} RemarkWithLink
 * @remarks
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada fermentum
 * {@link SomethingElse} nibh, sed aliquet ante porta a. Nullam blandit posuere fringilla. Nullam
 * vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea dictumst.
 * @privateRemarks
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec xx
 * {@link SomethingElse | something} nibh, sed aliquet ante porta a. Nullam blandit posuere
 * fringilla. Nullam vel risus vitae lectus luctus auctor a venenatis ante. In hac habitasse platea
 * dictumst.
 */
