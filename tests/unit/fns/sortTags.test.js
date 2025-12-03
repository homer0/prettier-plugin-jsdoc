import { describe, it, expect } from 'vitest';
import { sortTags } from '../../../src/fns/sortTags';

describe('sortTags', () => {
  const cases = [
    {
      it: "should sort the tags and correctly use 'other' as fallback",
      input: [
        { tag: 'param' },
        { tag: 'description' },
        { tag: 'param' },
        { tag: 'returns' },
        { tag: 'todo' },
        { tag: 'throws' },
      ],
      output: [
        { tag: 'description' },
        { tag: 'param' },
        { tag: 'param' },
        { tag: 'returns' },
        { tag: 'throws' },
        { tag: 'todo' },
      ],
      options: {
        jsdocTagsOrder: ['description', 'param', 'returns', 'other', 'todo'],
      },
    },
    {
      it: "should send the tag to the end of the list of 'other' is not present",
      input: [
        { tag: 'throws' },
        { tag: 'param' },
        { tag: 'description' },
        { tag: 'param' },
        { tag: 'returns' },
        { tag: 'todo' },
      ],
      output: [
        { tag: 'description' },
        { tag: 'param' },
        { tag: 'param' },
        { tag: 'returns' },
        { tag: 'todo' },
        { tag: 'throws' },
      ],
      options: {
        jsdocTagsOrder: ['description', 'param', 'returns', 'todo'],
      },
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = sortTags(caseInfo.input, caseInfo.options);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
