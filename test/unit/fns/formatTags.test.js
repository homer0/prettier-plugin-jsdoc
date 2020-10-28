jest.unmock('../../../src/fns/formatTags');
jest.unmock('../../../src/fns/formatAccessTag');
jest.unmock('../../../src/fns/replaceTagsSynonyms');
jest.unmock('../../../src/fns/sortTags');
jest.unmock('../../../src/fns/trimTagsProperties');
jest.unmock('../../../src/fns/formatTagsDescription');
jest.unmock('../../../src/constants');

const { formatTags } = require('../../../src/fns/formatTags');

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
          descriptionParagrah: false,
        },
        {
          tag: 'param',
          name: '',
          description: '',
          descriptionParagrah: false,
        },
        {
          tag: 'param',
          name: '',
          description: '',
          descriptionParagrah: false,
        },
        {
          tag: 'returns',
          name: '',
          description: '',
          descriptionParagrah: false,
        },
        {
          tag: 'throws',
          name: '',
          description: '',
          descriptionParagrah: false,
        },
        {
          tag: 'todo',
          name: '',
          description: '',
          descriptionParagrah: false,
        },
      ],
      options: {
        jsdocReplaceTagsSynonyms: true,
        jsdocSortTags: true,
        jsdocTagsOrder: [
          'description',
          'param',
          'returns',
          'other',
          'todo',
        ],
      },
    },
    {
      it: 'shouldn\'t apply any transformations',
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
          descriptionParagrah: false,
        },
        {
          tag: 'desc',
          name: '',
          description: 'A long description.',
          descriptionParagrah: true,
        },
        {
          tag: 'argument',
          name: '',
          description: '',
          descriptionParagrah: false,
        },
        {
          tag: 'returns',
          name: '',
          description: '',
          descriptionParagrah: false,
        },
        {
          tag: 'todo',
          name: '',
          description: '',
          descriptionParagrah: false,
        },
        {
          tag: 'throws',
          name: '',
          description: '',
          descriptionParagrah: false,
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
