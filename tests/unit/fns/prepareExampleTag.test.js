vi.mock('prettier');

import { format } from 'prettier';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { prepareExampleTag } from '../../../src/fns/prepareExampleTag.js';

describe('prepareExampleTag', () => {
  beforeEach(() => {
    format.mockClear();
  });

  it("should ignore a tag that's not @example", async () => {
    // Given
    const input = {
      tag: 'param',
    };
    const output = {
      tag: 'param',
    };
    let result = null;
    // When
    result = await prepareExampleTag(input, {}, 0);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(0);
  });

  it('should call prettier for an example tag', async () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce(() => prettierResponse);
    const input = {
      tag: 'example',
      description: "const x = 'something';",
    };
    const output = {
      tag: 'example',
      description: '',
      examples: [
        {
          code: prettierResponse,
        },
      ],
    };
    const options = {
      semi: true,
      indent: 2,
      printWidth: 80,
    };
    let result = null;
    // When
    result = await prepareExampleTag(input, options, 2);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`${input.description}`, {
      ...options,
      printWidth: 75,
    });
  });

  it('should indent formatted text', async () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce(() => prettierResponse);
    const input = {
      tag: 'example',
      description: "const x = 'something';",
    };
    const output = {
      tag: 'example',
      description: '',
      examples: [
        {
          code: `  ${prettierResponse}`,
        },
      ],
    };
    const options = {
      jsdocIndentFormattedExamples: true,
      tabWidth: 2,
      printWidth: 80,
    };
    let result = null;
    // When
    result = await prepareExampleTag(input, options, 2);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`${input.description}`, {
      ...options,
      printWidth: 73,
    });
  });

  it('should indent unformatted text', async () => {
    // Given
    format.mockImplementationOnce(() => {
      throw new Error();
    });
    const input = {
      tag: 'example',
      description: "const x = 'something';",
    };
    const output = {
      tag: 'example',
      description: '',
      examples: [
        {
          code: `  ${input.description}`,
        },
      ],
    };
    const options = {
      jsdocIndentUnformattedExamples: true,
      tabWidth: 2,
      printWidth: 80,
    };
    let result = null;
    // When
    result = await prepareExampleTag(input, options, 0);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`${input.description}`, {
      ...options,
      printWidth: 77,
    });
  });

  it('should detect an example caption', async () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce(() => prettierResponse);
    const input = {
      tag: 'example',
      description: "<caption>Some caption</caption>\nconst x = 'something';",
    };
    const output = {
      tag: 'example',
      description: '',
      examples: [
        {
          caption: 'Some caption',
          code: `  ${prettierResponse}`,
        },
      ],
    };
    const options = {
      jsdocIndentFormattedExamples: true,
      tabWidth: 2,
      printWidth: 80,
    };
    let result = null;
    // When
    result = await prepareExampleTag(input, options, 0);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith("const x = 'something';", {
      ...options,
      printWidth: 75,
    });
  });

  it('should detect multiple captions', async () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce(() => prettierResponse);
    format.mockImplementationOnce(() => prettierResponse);
    const input = {
      tag: 'example',
      description: [
        '<caption>\nThe first\ncaption</caption>',
        "const x = 'fist example';",
        '<caption>The second\ncaption\n</caption>',
        "const y = 'second example';",
      ].join('\n'),
    };
    const output = {
      tag: 'example',
      description: '',
      examples: [
        {
          caption: 'The first\ncaption',
          code: prettierResponse,
        },
        {
          caption: 'The second\ncaption',
          code: prettierResponse,
        },
      ],
    };
    const options = {
      printWidth: 80,
    };
    let result = null;
    // When
    result = await prepareExampleTag(input, options, 0);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(2);
    expect(format).toHaveBeenNthCalledWith(1, "const x = 'fist example';", {
      ...options,
      printWidth: 77,
    });
    expect(format).toHaveBeenNthCalledWith(2, "const y = 'second example';", {
      ...options,
      printWidth: 77,
    });
  });

  it('should detect an empty example tag', async () => {
    // Given
    const input = {
      tag: 'example',
      description: ' ',
    };
    const output = {
      tag: 'example',
      description: '',
      examples: [],
    };
    const options = {
      printWidth: 80,
    };
    let result = null;
    // When
    result = await prepareExampleTag(input, options, 0);
    // Then
    expect(result).toEqual(output);
  });
});
