jest.unmock('../../../src/fns/prepareTagPrettyType');
jest.unmock('../../../src/fns/utils');
jest.mock('prettier');

const { format } = require('prettier');
const { prepareTagPrettyType } = require('../../../src/fns/prepareTagPrettyType');

describe('prepareTagPrettyType', () => {
  beforeEach(() => {
    format.mockClear();
  });

  it('should ignore a basic type', () => {
    // Given
    const input = {
      type: 'string',
    };
    const output = {
      type: 'string',
    };
    let result = null;
    // When
    result = prepareTagPrettyType(input, {});
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(0);
  });

  it('should call prettier for a complex type', () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce((code) => code.replace(/=.*?$/, `= ${prettierResponse};`));
    const input = {
      type: 'React.FC<string>',
    };
    const output = {
      type: prettierResponse,
    };
    const options = {
      semi: true,
      indent: 2,
    };
    let result = null;
    // When
    result = prepareTagPrettyType(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`type complex = ${input.type}`, {
      ...options,
      parser: 'typescript',
    });
  });

  it('should return the original type if prettier throws an error', () => {
    // Given
    format.mockImplementationOnce(() => {
      throw new Error();
    });
    const input = {
      type: 'React.FC<string>',
    };
    const output = {
      type: 'React.FC<string>',
    };
    const options = {
      semi: true,
      indent: 2,
    };
    let result = null;
    // When
    result = prepareTagPrettyType(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
  });
});
