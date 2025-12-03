import { describe, it, expect } from 'vitest';
import { formatAccessTag } from '../../../src/fns/formatAccessTag';

describe('formatAccessTag', () => {
  it('should replace "@access public" with "@public"', () => {
    // Given
    const input = [
      {
        tag: 'access',
        name: 'public',
      },
      {
        tag: 'param',
      },
    ];
    const output = [
      {
        tag: 'public',
        name: '',
        description: '',
        type: '',
      },
      {
        tag: 'param',
      },
    ];
    let result = null;
    // When
    result = formatAccessTag(input, {
      jsdocAllowAccessTag: false,
    });
    // Then
    expect(result).toEqual(output);
  });

  it('should only keep one type of "access" tag', () => {
    // Given
    const input = [
      {
        tag: 'access',
        name: 'public',
      },
      {
        tag: 'protected',
      },
      {
        tag: 'param',
      },
    ];
    const output = [
      {
        tag: 'protected',
      },
      {
        tag: 'param',
      },
    ];
    let result = null;
    // When
    result = formatAccessTag(input, {
      jsdocAllowAccessTag: true,
    });
    // Then
    expect(result).toEqual(output);
  });

  it('should replace "@private" with "@access private"', () => {
    // Given
    const input = [
      {
        tag: 'private',
      },
      {
        tag: 'param',
      },
    ];
    const output = [
      {
        tag: 'access',
        name: 'private',
        type: '',
        description: '',
      },
      {
        tag: 'param',
      },
    ];
    let result = null;
    // When
    result = formatAccessTag(input, {
      jsdocAllowAccessTag: true,
      jsdocEnforceAccessTag: true,
    });
    // Then
    expect(result).toEqual(output);
  });

  it('should remove "@protected" if there\'s "@access protected"', () => {
    // Given
    const input = [
      {
        tag: 'protected',
      },
      {
        tag: 'access',
        name: 'protected',
      },
      {
        tag: 'param',
      },
    ];
    const output = [
      {
        tag: 'access',
        name: 'protected',
      },
      {
        tag: 'param',
      },
    ];
    let result = null;
    // When
    result = formatAccessTag(input, {
      jsdocAllowAccessTag: true,
      jsdocEnforceAccessTag: true,
    });
    // Then
    expect(result).toEqual(output);
  });

  it('should remove "@access public" if there\'s "@public"', () => {
    // Given
    const input = [
      {
        tag: 'public',
      },
      {
        tag: 'access',
        name: 'public',
      },
      {
        tag: 'param',
      },
    ];
    const output = [
      {
        tag: 'public',
      },
      {
        tag: 'param',
      },
    ];
    let result = null;
    // When
    result = formatAccessTag(input, {
      jsdocAllowAccessTag: false,
    });
    // Then
    expect(result).toEqual(output);
  });

  it('shouldn\'t do anything if there are no "access tags"', () => {
    // Given
    const input = [
      {
        tag: 'param',
      },
    ];
    const output = [
      {
        tag: 'param',
      },
    ];
    let result = null;
    // When
    result = formatAccessTag(input, {
      jsdocAllowAccessTag: false,
    });
    // Then
    expect(result).toEqual(output);
  });
});
