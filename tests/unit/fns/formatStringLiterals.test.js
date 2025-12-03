import { describe, it, expect } from 'vitest';
import { formatStringLiterals } from '../../../src/fns/formatStringLiterals';

describe('formatStringLiterals', () => {
  it("should ignore a type that doesn't use string literals", () => {
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
    // prettier-ignore
    const input = '"some"|"string"|\'literals\'';
    // prettier-ignore
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
    // prettier-ignore
    const input = '\'some\'|"string"|\'literals\'';
    // prettier-ignore
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
    // prettier-ignore
    const input = '\'some\'  |\'string\'  |\'literals\'   ';
    // prettier-ignore
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
