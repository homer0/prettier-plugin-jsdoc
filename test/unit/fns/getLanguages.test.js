jest.mock('linguist-languages/data/JavaScript.json', () => ({
  languageId: 'js-lang',
  extensions: [],
}));
jest.mock('linguist-languages/data/JSX.json', (() => ({
  languageId: 'jsx-lang',
})));
jest.mock('linguist-languages/data/TypeScript.json', () => ({
  languageId: 'ts-lang',
}));
jest.mock('linguist-languages/data/TSX.json', () => ({
  languageId: 'tsx-lang',
}));
jest.unmock('../../../src/fns/getLanguages');

const { getLanguages } = require('../../../src/fns/getLanguages');

describe('getLanguages', () => {
  it('should generate the list of supported languages', () => {
    // Given/When/Then
    expect(getLanguages()).toEqual([
      {
        linguistLanguageId: 'js-lang',
        vscodeLanguageIds: ['javascript', 'mongo'],
        since: expect.any(String),
        parsers: expect.any(Array),
        extensions: expect.any(Array),
      },
      {
        name: 'Flow',
        linguistLanguageId: 'js-lang',
        vscodeLanguageIds: ['javascript'],
        since: expect.any(String),
        parsers: expect.any(Array),
        extensions: expect.any(Array),
        aliases: [],
        filenames: [],
      },
      {
        linguistLanguageId: 'jsx-lang',
        vscodeLanguageIds: ['javascriptreact'],
        since: expect.any(String),
        parsers: expect.any(Array),
      },
      {
        linguistLanguageId: 'ts-lang',
        vscodeLanguageIds: ['typescript'],
        since: expect.any(String),
        parsers: expect.any(Array),
      },
      {
        linguistLanguageId: 'tsx-lang',
        vscodeLanguageIds: ['typescriptreact'],
        since: expect.any(String),
        parsers: expect.any(Array),
      },
    ]);
  });
});
