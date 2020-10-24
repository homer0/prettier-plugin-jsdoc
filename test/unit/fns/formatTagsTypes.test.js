jest.unmock('../../../src/fns/formatTagsTypes');
jest.unmock('../../../src/fns/utils');
jest.unmock('../../../src/fns/formatTSTypes');
jest.unmock('../../../src/fns/formatStringLiterals');
jest.unmock('../../../src/fns/formatArrays');
jest.unmock('../../../src/fns/formatObjects');
jest.unmock('../../../src/fns/formatTypeAsCode');
jest.mock('prettier');

const { format } = require('prettier');
const { formatTagsTypes } = require('../../../src/fns/formatTagsTypes');

describe('formatTagsTypes', () => {
  beforeEach(() => {
    format.mockClear();
  });

  it('should apply all the transformations', () => {
    // Given
    const input = [
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
    ];
    const output = [
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
    ];
    const options = {
      jsdocUseTypeScriptTypesCasing: true,
      jsdocFormatStringLiterals: true,
      jsdocUseSingleQuotesForStringLiterals: true,
      jsdocUseShortArrays: true,
      jsdocFormatDotForArraysAndObjects: true,
      jsdocFormatComplexTypesWithPrettier: true,
      jsdocUseDotForArraysAndObjects: false,
    };
    let result = null;
    // When
    result = formatTagsTypes(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(3);
    expect(format).toHaveBeenNthCalledWith(1, 'type complex = Array.<string>', {
      ...options,
      parser: 'typescript',
    });
    expect(format).toHaveBeenNthCalledWith(2, `type complex = ${input[2].type}`, {
      ...options,
      parser: 'typescript',
    });
    expect(format).toHaveBeenNthCalledWith(3, 'type complex = Object.<string, Array<string>>', {
      ...options,
      parser: 'typescript',
    });
  });

  it('should only format objects', () => {
    // Given
    const input = [
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
    ];
    const output = [
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
    ];
    const options = {
      jsdocUseTypeScriptTypesCasing: false,
      jsdocFormatStringLiterals: false,
      jsdocUseSingleQuotesForStringLiterals: false,
      jsdocUseShortArrays: false,
      jsdocFormatDotForArraysAndObjects: true,
      jsdocUseDotForArraysAndObjects: true,
    };
    let result = null;
    // When
    result = formatTagsTypes(input, options);
    // Then
    expect(result).toEqual(output);
  });

  it('should only format arrays', () => {
    // Given
    const input = [
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
    ];
    const output = [
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
    ];
    const options = {
      jsdocUseTypeScriptTypesCasing: false,
      jsdocFormatStringLiterals: false,
      jsdocUseSingleQuotesForStringLiterals: false,
      jsdocUseShortArrays: true,
      jsdocFormatDotForArraysAndObjects: false,
      jsdocUseDotForArraysAndObjects: true,
      jsdocFormatComplexTypesWithPrettier: false,
    };
    let result = null;
    // When
    result = formatTagsTypes(input, options);
    // Then
    expect(result).toEqual(output);
  });

  it('shouldn\'t format anything', () => {
    // Given
    const input = [
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
    ];
    const output = [
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
    ];
    const options = {
      jsdocUseTypeScriptTypesCasing: false,
      jsdocFormatStringLiterals: false,
      jsdocUseSingleQuotesForStringLiterals: false,
      jsdocUseShortArrays: false,
      jsdocFormatDotForArraysAndObjects: false,
      jsdocUseDotForArraysAndObjects: false,
    };
    let result = null;
    // When
    result = formatTagsTypes(input, options);
    // Then
    expect(result).toEqual(output);
  });
});
