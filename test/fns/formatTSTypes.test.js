jest.unmock('../../src/fns/formatTSTypes');
jest.unmock('../../src/fns/utils');

const { formatTSTypes } = require('../../src/fns/formatTSTypes');

describe('formatTSTypes', () => {
  it
  .each([
    ['String', 'string'],
    ['string', 'string'],
    ['Number', 'number'],
    ['number', 'number'],
    ['Boolean', 'boolean'],
    ['boolean', 'boolean'],
    ['Array', 'Array'],
    ['array', 'Array'],
    ['Object', 'Object'],
    ['object', 'Object'],
    ['otherType', 'otherType'],
    ['OtherType', 'OtherType'],
  ])('should transform \'%s\' into \'%s\'', (input, output) => {
    // Given
    let result = null;
    // When
    result = formatTSTypes(input);
    // Then
    expect(result).toBe(output);
  });
});
