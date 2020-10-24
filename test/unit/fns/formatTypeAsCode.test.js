jest.unmock('../../../src/fns/formatTypeAsCode');
jest.unmock('../../../src/fns/utils');
jest.mock('prettier');

const { format } = require('prettier');
const { formatTypeAsCode } = require('../../../src/fns/formatTypeAsCode');

describe('formatTypeAsCode', () => {
  beforeEach(() => {
    format.mockClear();
  });

  it('should ignore a basic type', () => {
    // Given
    const input = 'string';
    const output = 'string';
    let result = null;
    // When
    result = formatTypeAsCode(input, {});
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(0);
  });

  it('should call prettier for a complex type', () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce((code) => code.replace(/=.*?$/, `= ${prettierResponse};`));
    const input = 'React.FC<string>';
    const output = prettierResponse;
    const options = {
      semi: true,
      indent: 2,
    };
    let result = null;
    // When
    result = formatTypeAsCode(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`type complex = ${input}`, {
      ...options,
      parser: 'typescript',
    });
  });

  it('should return the original type if prettier throws an error', () => {
    // Given
    format.mockImplementationOnce(() => {
      throw new Error();
    });
    const input = 'React.FC<string>';
    const output = 'React.FC<string>';
    const options = {
      semi: true,
      indent: 2,
    };
    let result = null;
    // When
    result = formatTypeAsCode(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
  });
});
