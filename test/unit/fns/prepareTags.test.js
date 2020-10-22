jest.unmock('../../../src/fns/prepareTags');
jest.unmock('../../../src/fns/prepareTagName');
jest.unmock('../../../src/fns/prepareTagPrettyType');
jest.unmock('../../../src/fns/prepareExampleTag');
jest.unmock('../../../src/fns/utils');
jest.mock('prettier');

const { format } = require('prettier');
const { prepareTags } = require('../../../src/fns/prepareTags');

describe('prepareTags', () => {
  beforeEach(() => {
    format.mockClear();
  });

  it('should prepare types and tags names on a tags list', () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce((code) => code.replace(/=.*?$/, `= ${prettierResponse};`));
    const input = [
      {
        name: 'someComponent',
        type: 'React.FC<string>',
        optional: true,
      },
      {
        name: 'someName',
        type: 'string',
        optional: true,
        default: '\'myName\'',
      },
      {
        name: 'rest',
        type: 'string',
      },
    ];
    const output = [
      {
        name: '[someComponent]',
        type: prettierResponse,
        optional: true,
      },
      {
        name: '[someName=\'myName\']',
        type: 'string',
        optional: true,
        default: '\'myName\'',
      },
      {
        name: 'rest',
        type: 'string',
      },
    ];
    const options = {
      semi: true,
      indent: 2,
    };
    let result = null;
    // When
    result = prepareTags(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`type complex = ${input[0].type}`, {
      ...options,
      parser: 'typescript',
    });
  });

  it('should prepare examples', () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce((code) => code.replace(/=.*?$/, `= ${prettierResponse};`));
    format.mockImplementationOnce(() => prettierResponse);
    const input = [
      {
        name: 'someComponent',
        type: 'React.FC<string>',
        optional: true,
      },
      {
        name: 'someName',
        type: 'string',
        optional: true,
        default: '\'myName\'',
      },
      {
        name: 'rest',
        type: 'string',
      },
      {
        tag: 'example',
        type: '',
        name: 'const',
        description: 'x = \'something\';',
      },
    ];
    const output = [
      {
        name: '[someComponent]',
        type: prettierResponse,
        optional: true,
      },
      {
        name: '[someName=\'myName\']',
        type: 'string',
        optional: true,
        default: '\'myName\'',
      },
      {
        name: 'rest',
        type: 'string',
      },
      {
        tag: 'example',
        type: '',
        name: '',
        description: prettierResponse,
      },
    ];
    const options = {
      semi: true,
      indent: 2,
      jsdocFormatExamples: true,
    };
    let result = null;
    // When
    result = prepareTags(input, options);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(2);
    expect(format).toHaveBeenNthCalledWith(1, `type complex = ${input[0].type}`, {
      ...options,
      parser: 'typescript',
    });
    expect(format).toHaveBeenNthCalledWith(2, `${input[3].name} ${input[3].description}`, options);
  });
});
