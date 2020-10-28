jest.unmock('../../../src/fns/replaceTagsSynonyms');

const { replaceTagsSynonyms } = require('../../../src/fns/replaceTagsSynonyms');

describe('replaceTagsSynonyms', () => {
  it('should replace tags synonyms', () => {
    // Given
    const input = [
      {
        tag: 'virtual',
      },
      {
        tag: 'param',
      },
    ];
    const output = [
      {
        tag: 'abstract',
      },
      {
        tag: 'param',
      },
    ];
    let result = null;
    // When
    result = replaceTagsSynonyms(input);
    // Then
    expect(result).toEqual(output);
  });
});
