jest.unmock('../../../src/fns/formatTypeAsCode');
jest.mock('prettier');

const { format } = require('prettier');
const { formatTypeAsCode } = require('../../../src/fns/formatTypeAsCode');

describe('formatTypeAsCode', () => {
  beforeEach(() => {
    format.mockClear();
  });

  it('should ignore a basic type', async () => {
    // Given
    const input = 'string';
    const output = 'string';
    let result = null;
    // When
    result = await formatTypeAsCode(input, {}, 0);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(0);
  });

  it('should call prettier for a complex type', async () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce((code) =>
      code.replace(/=.*?$/, `= ${prettierResponse};`),
    );
    const input = 'React.FC<string>';
    const output = prettierResponse;
    const options = {
      semi: true,
      indent: 2,
      printWidth: 80,
    };
    let result = null;
    // When
    result = await formatTypeAsCode(input, options, 0);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`type complex = ${input}`, {
      ...options,
      printWidth: 77,
      parser: 'typescript',
    });
  });

  it('should return the original type if prettier throws an error', async () => {
    // Given
    format.mockImplementationOnce(() => {
      throw new Error();
    });
    const input = 'React.FC<string>';
    const output = 'React.FC<string>';
    const options = {
      semi: true,
      indent: 2,
      printWidth: 80,
    };
    let result = null;
    // When
    result = await formatTypeAsCode(input, options, 2);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`type complex = ${input}`, {
      ...options,
      printWidth: 75,
      parser: 'typescript',
    });
  });
});
