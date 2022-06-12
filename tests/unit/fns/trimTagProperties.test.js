jest.unmock('../../../src/fns/trimTagsProperties');

const { trimTagsProperties } = require('../../../src/fns/trimTagsProperties');

describe('trimTagsProperties', () => {
  it('should correctly trim the properties of a tags list', () => {
    // Given
    const input = [
      {
        tag: 'param',
        type: ' string',
        name: 'myParam   ',
        description: '  my description  ',
        unknown: '  this will be ignored ',
      },
    ];
    const output = [
      {
        tag: 'param',
        type: 'string',
        name: 'myParam',
        description: 'my description',
        unknown: '  this will be ignored ',
      },
    ];
    let result = null;
    // When
    result = trimTagsProperties(input);
    // Then
    expect(result).toEqual(output);
  });
});
