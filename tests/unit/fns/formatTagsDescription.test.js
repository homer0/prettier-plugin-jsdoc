import { describe, it, expect } from 'vitest';
import { formatTagsDescription } from '../../../src/fns/formatTagsDescription.js';

describe('formatTagsDescription', () => {
  const cases = [
    {
      it: 'should apply all the transformations',
      input: [
        {
          tag: 'description',
          name: 'Some',
          description: 'description.',
        },
        {
          tag: 'description',
          name: '',
          description: 'Some description that was already joined by the block formatter.',
        },
        {
          tag: 'description',
          type: '@link OtherType',
          name: '<-',
          description: 'read that.',
        },
        {
          tag: 'description',
          name: 'todo',
          description: '',
        },
        {
          tag: 'description',
          name: '\nA',
          description: 'very long description.',
        },
        {
          tag: 'see',
          type: '@link Something',
          name: '',
          description: 'for more information.',
        },
        {
          tag: 'see',
          type: '@link Something',
          name: '',
          description: '',
        },
      ],
      output: [
        {
          tag: 'description',
          name: '',
          description: 'Some description.',
          descriptionParagraph: false,
        },
        {
          tag: 'description',
          name: '',
          description: 'Some description that was already joined by the block formatter.',
          descriptionParagraph: false,
        },
        {
          tag: 'description',
          type: '',
          name: '',
          description: '{@link OtherType} <- read that.',
          descriptionParagraph: false,
        },
        {
          tag: 'description',
          name: '',
          description: 'todo',
          descriptionParagraph: false,
        },
        {
          tag: 'description',
          name: '',
          description: '\nA very long description.',
          descriptionParagraph: true,
        },
        {
          tag: 'see',
          type: '',
          name: '{@link Something} for more information.',
          description: '',
          descriptionParagraph: false,
        },
        {
          tag: 'see',
          type: '',
          name: '{@link Something}',
          description: '',
          descriptionParagraph: false,
        },
      ],
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = formatTagsDescription(caseInfo.input);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
