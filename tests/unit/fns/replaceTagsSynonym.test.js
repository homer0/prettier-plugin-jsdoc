import { describe, it, expect } from 'vitest';
import { replaceTagsSynonyms } from '../../../src/fns/replaceTagsSynonyms';

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
    let result = null;
    // When
    result = replaceTagsSynonyms(input);
    // Then
    expect(result).toEqual(output);
  });
});
