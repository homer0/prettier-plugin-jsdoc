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
      name: 'const',
      description: 'x = \'something\';',
    };
    const output = {
      tag: 'example',
      name: '',
      description: prettierResponse,
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
    expect(format).toHaveBeenCalledWith(`${input.name} ${input.description}`, options);
  });

  it('should indent formatted text', () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce(() => prettierResponse);
    const input = {
      tag: 'example',
      name: 'const',
      description: 'x = \'something\';',
    };
    const output = {
      tag: 'example',
      name: '',
      description: `  ${prettierResponse}`,
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
    expect(format).toHaveBeenCalledWith(`${input.name} ${input.description}`, options);
  });

  it('should indent unformatted text', () => {
    // Given
    format.mockImplementationOnce(() => {
      throw new Error();
    });
    const input = {
      tag: 'example',
      name: 'const',
      description: 'x = \'something\';',
    };
    const output = {
      tag: 'example',
      name: '',
      description: `  ${input.name} ${input.description}`,
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
    expect(format).toHaveBeenCalledWith(`${input.name} ${input.description}`, options);
  });
});
