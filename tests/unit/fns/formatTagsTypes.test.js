jest.unmock('../../../src/fns/formatTagsTypes');
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

  it('should apply all the transformations', async () => {
    // Given
    const input = [
      {
        access: 'public',
      },
      {
        type: 'Array.<String>',
      },
      {
        // prettier-ignore
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
        // prettier-ignore
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
      printWidth: 80,
    };
    let result = null;
    // When
    result = await formatTagsTypes(input, options, 0);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(3);
    expect(format).toHaveBeenNthCalledWith(1, 'type complex = Array.<string>', {
      ...options,
      printWidth: 77,
      parser: 'typescript',
    });
    expect(format).toHaveBeenNthCalledWith(2, `type complex = ${input[2].type}`, {
      ...options,
      printWidth: 77,
      parser: 'typescript',
    });
    expect(format).toHaveBeenNthCalledWith(
      3,
      'type complex = Object.<string, Array<string>>',
      {
        ...options,
        printWidth: 77,
        parser: 'typescript',
      },
    );
  });

  it('should only format objects', async () => {
    // Given
    const input = [
      {
        access: 'public',
      },
      {
        type: 'Array.<String>',
      },
      {
        // prettier-ignore
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
        // prettier-ignore
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
      printWidth: 80,
    };
    let result = null;
    // When
    result = await formatTagsTypes(input, options, 2);
    // Then
    expect(result).toEqual(output);
  });

  it('should only format arrays', async () => {
    // Given
    const input = [
      {
        access: 'public',
      },
      {
        type: 'Array.<String>',
      },
      {
        // prettier-ignore
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
        // prettier-ignore
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
      printWidth: 70,
    };
    let result = null;
    // When
    result = await formatTagsTypes(input, options, 4);
    // Then
    expect(result).toEqual(output);
  });

  it("shouldn't format anything", async () => {
    // Given
    const input = [
      {
        access: 'public',
      },
      {
        type: 'Array.<String>',
      },
      {
        // prettier-ignore
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
        // prettier-ignore
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
      printWidth: 80,
    };
    let result = null;
    // When
    result = await formatTagsTypes(input, options, 2);
    // Then
    expect(result).toEqual(output);
  });
});
