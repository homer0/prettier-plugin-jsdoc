jest.unmock('../../../src/fns/formatTagsDescription');

const { formatTagsDescription } = require('../../../src/fns/formatTagsDescription');

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
          descriptionParagrah: false,
        },
        {
          tag: 'description',
          name: '',
          description: 'Some description that was already joined by the block formatter.',
          descriptionParagrah: false,
        },
        {
          tag: 'description',
          type: '',
          name: '',
          description: '{@link OtherType} <- read that.',
          descriptionParagrah: false,
        },
        {
          tag: 'description',
          name: '',
          description: 'todo',
          descriptionParagrah: false,
        },
        {
          tag: 'description',
          name: '',
          description: '\nA very long description.',
          descriptionParagrah: true,
        },
        {
          tag: 'see',
          type: '',
          name: '{@link Something} for more information.',
          description: '',
          descriptionParagrah: false,
        },
        {
          tag: 'see',
          type: '',
          name: '{@link Something}',
          description: '',
          descriptionParagrah: false,
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
