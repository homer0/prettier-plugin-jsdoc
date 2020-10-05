jest.unmock('../../src/fns/formatObjects');
jest.unmock('../../src/fns/utils');

const { formatObjects } = require('../../src/fns/formatObjects');

describe('formatObjects', () => {
  it('should add a dot before objects\' generics', () => {
    // Given
    const input = 'Object<string,Object.<string,Object<string,number>>>';
    const output = 'Object.<string,Object.<string,Object.<string,number>>>';
    let result = null;
    // When
    result = formatObjects(input, {
      jsdocFormatDotForArraysAndObjects: true,
      jsdocUseDotForArraysAndObjects: true,
    });
    // Then
    expect(result).toBe(output);
  });

  it('should remove the dot before objcects\' generics', () => {
    // Given
    const input = 'Object.<string,Object<string,Object.<string,number>>>';
    const output = 'Object<string,Object<string,Object<string,number>>>';
    let result = null;
    // When
    result = formatObjects(input, {
      jsdocFormatDotForArraysAndObjects: true,
      jsdocUseDotForArraysAndObjects: false,
    });
    // Then
    expect(result).toBe(output);
  });
});
