jest.unmock('../../src/fns/createLanguage');

const { createLanguage } = require('../../src/fns/createLanguage');

describe('createLanguage', () => {
  it('should create a language definition for Prettier', () => {
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
    result = createLanguage(linguistLanguage, overrides);
    // Then
    expect(result).toEqual(output);
  });
});
