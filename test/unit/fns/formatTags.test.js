jest.unmock('../../../src/fns/formatTags');
jest.unmock('../../../src/fns/utils');
jest.unmock('../../../src/fns/formatAccessTag');
jest.unmock('../../../src/fns/replaceTagsSynonyms');
jest.unmock('../../../src/fns/sortTags');
jest.unmock('../../../src/fns/trimTagsProperties');

const { formatTags } = require('../../../src/fns/formatTags');

describe('formatTags', () => {
  const cases = [
    {
      it: 'should apply all the transformations',
      input: [
        { tag: 'arg' },
        { tag: 'desc' },
        { tag: 'argument' },
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
        { tag: 'arg' },
        { tag: 'desc' },
        { tag: 'argument' },
        { tag: 'returns' },
        { tag: 'todo' },
        { tag: 'throws' },
      ],
      output: [
        { tag: 'arg' },
        { tag: 'desc' },
        { tag: 'argument' },
        { tag: 'returns' },
        { tag: 'todo' },
        { tag: 'throws' },
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
