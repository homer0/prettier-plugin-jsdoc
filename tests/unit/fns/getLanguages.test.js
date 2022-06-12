jest.mock('prettier');
jest.unmock('../../../src/fns/getLanguages');

const prettier = require('prettier');
const { getLanguages } = require('../../../src/fns/getLanguages');

describe('getLanguages', () => {
  beforeEach(() => {
    prettier.getSupportInfo.mockClear();
  });

  it('should generate the list of supported languages', () => {
    // Given
    const supportedLanguage = {
      name: 'JavaScript',
      linguistLanguageId: 183,
    };
    const unsupportedLanguage = {
      name: 'NativeScript',
      linguistLanguageId: 101,
    };
    prettier.getSupportInfo.mockImplementationOnce(() => ({
      languages: [supportedLanguage, unsupportedLanguage],
    }));
    let result = null;
    // When
    result = getLanguages();
    // Then
    expect(result).toEqual([supportedLanguage]);
  });
});
