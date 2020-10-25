jest.unmock('../../../src/fns/prepareExampleTag');
jest.unmock('../../../src/fns/utils');
jest.mock('prettier');

const { format } = require('prettier');
const { prepareExampleTag } = require('../../../src/fns/prepareExampleTag');

describe('prepareExampleTag', () => {
  beforeEach(() => {
    format.mockClear();
  });

  it('should ignore a tag that\'s not @example', () => {
    // Given
    const input = {
      tag: 'param',
    };
    const output = {
      tag: 'param',
    };
    let result = null;
    // When
    result = prepareExampleTag(input, {});
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(0);
  });

  it('should call prettier for an example tag', () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce(() => prettierResponse);
    const input = {
      tag: 'example',
      description: 'const x = \'something\';',
    };
    const output = {
      tag: 'example',
      description: '',
      examples: [{
        code: prettierResponse,
      }],
    };
    const options = {
      semi: true,
      indent: 2,
    };
    let result = null;
    // When
    result = prepareExampleTag(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`${input.description}`, options);
  });

  it('should indent formatted text', () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce(() => prettierResponse);
    const input = {
      tag: 'example',
      description: 'const x = \'something\';',
    };
    const output = {
      tag: 'example',
      description: '',
      examples: [{
        code: `  ${prettierResponse}`,
      }],
    };
    const options = {
      jsdocIndentFormattedExamples: true,
      tabWidth: 2,
    };
    let result = null;
    // When
    result = prepareExampleTag(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`${input.description}`, options);
  });

  it('should indent unformatted text', () => {
    // Given
    format.mockImplementationOnce(() => {
      throw new Error();
    });
    const input = {
      tag: 'example',
      description: 'const x = \'something\';',
    };
    const output = {
      tag: 'example',
      description: '',
      examples: [{
        code: `  ${input.description}`,
      }],
    };
    const options = {
      jsdocIndentUnformattedExamples: true,
      tabWidth: 2,
    };
    let result = null;
    // When
    result = prepareExampleTag(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`${input.description}`, options);
  });

  it('should detect an example caption', () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce(() => prettierResponse);
    const input = {
      tag: 'example',
      description: '<caption>Some caption</caption>\nconst x = \'something\';',
    };
    const output = {
      tag: 'example',
      description: '',
      examples: [{
        caption: 'Some caption',
        code: `  ${prettierResponse}`,
      }],
    };
    const options = {
      jsdocIndentFormattedExamples: true,
      tabWidth: 2,
    };
    let result = null;
    // When
    result = prepareExampleTag(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith('const x = \'something\';', options);
  });

  it('should detect multiple captions', () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce(() => prettierResponse);
    format.mockImplementationOnce(() => prettierResponse);
    const input = {
      tag: 'example',
      description: [
        '<caption>\nThe first\ncaption</caption>',
        'const x = \'fist example\';',
        '<caption>The second\ncaption\n</caption>',
        'const y = \'second example\';',
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
    const options = {};
    let result = null;
    // When
    result = prepareExampleTag(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(2);
    expect(format).toHaveBeenNthCalledWith(1, 'const x = \'fist example\';', options);
    expect(format).toHaveBeenNthCalledWith(2, 'const y = \'second example\';', options);
  });
});
