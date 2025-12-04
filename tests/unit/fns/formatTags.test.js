import { describe, it, expect } from 'vitest';
import { formatTags } from '../../../src/fns/formatTags.js';

describe('formatTags', () => {
  const cases = [
    {
      it: 'should apply all the transformations',
      input: [
        {
          tag: 'arg',
          name: '',
          description: '',
        },
        {
          tag: 'desc',
          name: '',
          description: '',
        },
        {
          tag: 'argument',
          name: '',
          description: '',
        },
        {
          tag: 'returns',
          name: '',
          description: '',
        },
        {
          tag: 'todo',
          name: '',
          description: '',
        },
        {
          tag: 'throws',
          name: '',
          description: '',
        },
      ],
      output: [
        {
          tag: 'description',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
        {
          tag: 'param',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
        {
          tag: 'param',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
        {
          tag: 'returns',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
        {
          tag: 'throws',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
        {
          tag: 'todo',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
      ],
      options: {
        jsdocReplaceTagsSynonyms: true,
        jsdocSortTags: true,
        jsdocTagsOrder: ['description', 'param', 'returns', 'other', 'todo'],
      },
    },
    {
      it: "shouldn't apply any transformations",
      input: [
        {
          tag: 'arg',
          name: '',
          description: '',
        },
        {
          tag: 'desc',
          name: '\nA',
          description: 'long description.',
        },
        {
          tag: 'argument',
          name: '',
          description: '',
        },
        {
          tag: 'returns',
          name: '',
          description: '',
        },
        {
          tag: 'todo',
          name: '',
          description: '',
        },
        {
          tag: 'throws',
          name: '',
          description: '',
        },
      ],
      output: [
        {
          tag: 'arg',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
        {
          tag: 'desc',
          name: '',
          description: 'A long description.',
          descriptionParagraph: true,
        },
        {
          tag: 'argument',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
        {
          tag: 'returns',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
        {
          tag: 'todo',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
        {
          tag: 'throws',
          name: '',
          description: '',
          descriptionParagraph: false,
        },
      ],
      options: {
        jsdocReplaceTagsSynonyms: false,
        jsdocSortTags: false,
      },
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = formatTags(caseInfo.input, caseInfo.options);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
