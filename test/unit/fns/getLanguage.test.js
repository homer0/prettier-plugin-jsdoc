jest.unmock('../../../src/fns/getLanguages');

const { getLanguages } = require('../../../src/fns/getLanguages');

describe('getLanguages', () => {
  xit('should create a language definition for Prettier', () => {
    // Given
    const linguistLanguage = {
      languageId: 2509,
      extensions: ['.js'],
    };
    const overrides = {
      since: '0.0.0',
      parsers: ['babel'],
      vscodeLanguageIds: ['javascript'],
    };
    const output = {
      linguistLanguageId: 2509,
      extensions: ['.js'],
      since: '0.0.0',
      parsers: ['babel'],
      vscodeLanguageIds: ['javascript'],
    };
    let result = null;
    // When
    result = getLanguages(linguistLanguage, overrides);
    // Then
    expect(result).toEqual(output);
  });
});
