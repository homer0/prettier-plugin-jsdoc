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
    let resultOne = null;
    let resultTwo = null;
    // When
    resultOne = replaceTagsSynonyms(input);
    resultTwo = replaceTagsSynonyms()(input);
    // Then
    expect(resultOne).toEqual(output);
    expect(resultTwo).toEqual(output);
  });
});
