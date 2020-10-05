jest.unmock('../../src/fns/formatTagsTypes');
jest.unmock('../../src/fns/utils');
jest.unmock('../../src/fns/formatTSTypes');
jest.unmock('../../src/fns/formatStringLiterals');
jest.unmock('../../src/fns/formatArrays');
jest.unmock('../../src/fns/formatObjects');

const { formatTagsTypes } = require('../../src/fns/formatTagsTypes');

describe('formatTagsTypes', () => {
  const cases = [
    {
      it: 'should apply all the transformations',
      input: [
        {
          access: 'public',
        },
        {
          type: 'Array.<String>',
        },
        {
          type: '"a" |   "b"   |"c"',
        },
        {
          type: 'Object.<String, Array<string>>',
        },
      ],
      output: [
        {
          access: 'public',
        },
        {
          type: 'string[]',
        },
        {
          type: '\'a\'|\'b\'|\'c\'',
        },
        {
          type: 'Object<string, string[]>',
        },
      ],
      options: {
        jsdocUseTypeScriptTypesCasing: true,
        jsdocFormatStringLiterals: true,
        jsdocUseSingleQuotesForStringLiterals: true,
        jsdocUseShortArrays: true,
        jsdocFormatDotForArraysAndObjects: true,
        jsdocUseDotForArraysAndObjects: false,
      },
    },
    {
      it: 'should only format objects',
      input: [
        {
          access: 'public',
        },
        {
          type: 'Array.<String>',
        },
        {
          type: '"a" |   "b"   |"c"',
        },
        {
          type: 'Object.<String, Array<String>>',
        },
      ],
      output: [
        {
          access: 'public',
        },
        {
          type: 'Array.<String>',
        },
        {
          type: '"a" |   "b"   |"c"',
        },
        {
          type: 'Object.<String, Array.<String>>',
        },
      ],
      options: {
        jsdocUseTypeScriptTypesCasing: false,
        jsdocFormatStringLiterals: false,
        jsdocUseSingleQuotesForStringLiterals: false,
        jsdocUseShortArrays: false,
        jsdocFormatDotForArraysAndObjects: true,
        jsdocUseDotForArraysAndObjects: true,
      },
    },
    {
      it: 'should only format arrays',
      input: [
        {
          access: 'public',
        },
        {
          type: 'Array.<String>',
        },
        {
          type: '"a" |   "b"   |"c"',
        },
        {
          type: 'Object.<String, Array<String>>',
        },
      ],
      output: [
        {
          access: 'public',
        },
        {
          type: 'String[]',
        },
        {
          type: '"a" |   "b"   |"c"',
        },
        {
          type: 'Object.<String, String[]>',
        },
      ],
      options: {
        jsdocUseTypeScriptTypesCasing: false,
        jsdocFormatStringLiterals: false,
        jsdocUseSingleQuotesForStringLiterals: false,
        jsdocUseShortArrays: true,
        jsdocFormatDotForArraysAndObjects: false,
        jsdocUseDotForArraysAndObjects: true,
      },
    },
    {
      it: 'shouldn\'t format anything',
      input: [
        {
          access: 'public',
        },
        {
          type: 'Array.<String>',
        },
        {
          type: '"a" |   "b"   |"c"',
        },
        {
          type: 'Object.<String, Array<string>>',
        },
      ],
      output: [
        {
          access: 'public',
        },
        {
          type: 'Array.<String>',
        },
        {
          type: '"a" |   "b"   |"c"',
        },
        {
          type: 'Object.<String, Array<string>>',
        },
      ],
      options: {
        jsdocUseTypeScriptTypesCasing: false,
        jsdocFormatStringLiterals: false,
        jsdocUseSingleQuotesForStringLiterals: false,
        jsdocUseShortArrays: false,
        jsdocFormatDotForArraysAndObjects: false,
        jsdocUseDotForArraysAndObjects: false,
      },
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = formatTagsTypes(caseInfo.input, caseInfo.options);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
