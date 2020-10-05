jest.unmock('../../src/fns/formatStringLiterals');

const { formatStringLiterals } = require('../../src/fns/formatStringLiterals');

describe('formatStringLiterals', () => {
  it('should ignore a type that doesn\'t use string literals', () => {
    // Given
    const input = 'string';
    const output = 'string';
    let result = null;
    // When
    result = formatStringLiterals(input, {});
    // Then
    expect(result).toBe(output);
  });

  it('should change a string literals type to single quotes', () => {
    // Given
    const input = '"some"|"string"|\'literals\'';
    const output = '\'some\'|\'string\'|\'literals\'';
    let result = null;
    // When
    result = formatStringLiterals(input, {
      jsdocUseSingleQuotesForStringLiterals: true,
      jsdocSpacesBetweenStringLiterals: 0,
    });
    // Then
    expect(result).toBe(output);
  });

  it('should change a string literals type to double quotes', () => {
    // Given
    const input = '\'some\'|"string"|\'literals\'';
    const output = '"some"|"string"|"literals"';
    let result = null;
    // When
    result = formatStringLiterals(input, {
      jsdocUseSingleQuotesForStringLiterals: false,
      jsdocSpacesBetweenStringLiterals: 0,
    });
    // Then
    expect(result).toBe(output);
  });

  it('should format the spacing between the strings', () => {
    // Given
    const input = '\'some\'  |\'string\'  |\'literals\'   ';
    const output = '\'some\' | \'string\' | \'literals\'';
    let result = null;
    // When
    result = formatStringLiterals(input, {
      jsdocUseSingleQuotesForStringLiterals: true,
      jsdocSpacesBetweenStringLiterals: 1,
    });
    // Then
    expect(result).toBe(output);
  });
});
