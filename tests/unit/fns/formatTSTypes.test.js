import { describe, it, expect } from 'vitest';
import { formatTSTypes } from '../../../src/fns/formatTSTypes';

describe('formatTSTypes', () => {
  it.each([
    ['String', 'string'],
    ['string', 'string'],
    ['Number', 'number'],
    ['number', 'number'],
    ['Boolean', 'boolean'],
    ['boolean', 'boolean'],
    ['Array', 'Array'],
    ['array', 'Array'],
    ['Object', 'Object'],
    ['object', 'Object'],
    ['otherType', 'otherType'],
    ['OtherType', 'OtherType'],
  ])("should transform '%s' into '%s'", (input, output) => {
    // Given
    let result = null;
    // When
    result = formatTSTypes(input);
    // Then
    expect(result).toBe(output);
  });
});
