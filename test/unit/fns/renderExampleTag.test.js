jest.unmock('../../../src/fns/renderExampleTag');

const { renderExampleTag } = require('../../../src/fns/renderExampleTag');

describe('renderExampleTag', () => {
  it('should ignore a tag that\'s not @example', () => {
    // Given
    const input = {
      tag: 'example',
      description: 'const fn = (msg) => console.log(msg);\nfn(\'hello world!\');',
    };
    const output = [
      '@example',
      'const fn = (msg) => console.log(msg);',
      'fn(\'hello world!\');',
    ];
    let result = null;
    // When
    result = renderExampleTag(input);
    // Then
    expect(result).toEqual(output);
  });
});
