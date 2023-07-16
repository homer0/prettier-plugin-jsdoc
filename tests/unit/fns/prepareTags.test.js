jest.unmock('../../../src/fns/prepareTags');
jest.unmock('../../../src/fns/prepareTagName');
jest.unmock('../../../src/fns/prepareTagDescription');
jest.unmock('../../../src/fns/prepareExampleTag');
jest.mock('prettier');

const { format } = require('prettier');
const { prepareTags } = require('../../../src/fns/prepareTags');

describe('prepareTags', () => {
  beforeEach(() => {
    format.mockClear();
  });

  it('should prepare types and tags names on a tags list', async () => {
    // Given
    const input = [
      {
        name: 'someName',
        type: 'string',
        optional: true,
        // prettier-ignore
        default: '\'myName\'',
      },
      {
        name: 'rest',
        type: 'string',
      },
    ];
    const output = [
      {
        // prettier-ignore
        name: '[someName=\'myName\']',
        type: 'string',
        optional: true,
        // prettier-ignore
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
      printWidth: 80,
    };
    let result = null;
    // When
    result = await prepareTags(input, options, 0);
    // Then
    expect(result).toEqual(output);
  });

  it('should prepare examples', async () => {
    // Given
    const prettierResponse = 'prettier-response';
    format.mockImplementationOnce(() => prettierResponse);
    const input = [
      {
        name: 'someName',
        type: 'string',
        optional: true,
        // prettier-ignore
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
        // prettier-ignore
        description: 'const x = \'something\';',
      },
    ];
    const output = [
      {
        // prettier-ignore
        name: '[someName=\'myName\']',
        type: 'string',
        optional: true,
        // prettier-ignore
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
        description: '',
        examples: [
          {
            code: prettierResponse,
          },
        ],
      },
    ];
    const options = {
      semi: true,
      indent: 2,
      jsdocFormatExamples: true,
      printWidth: 80,
    };
    let result = null;
    // When
    result = await prepareTags(input, options, 2);
    // Then
    expect(result).toEqual(output);
    expect(format).toHaveBeenCalledTimes(1);
    expect(format).toHaveBeenCalledWith(`${input[2].description}`, {
      ...options,
      printWidth: 75,
    });
  });

  it('should prepare descriptions', async () => {
    // Given
    const input = [
      {
        name: 'rest',
        description: 'something',
      },
      {
        description: ' something else ',
      },
    ];
    const output = [
      {
        name: 'rest',
        description: 'Something.',
      },
      {
        description: ' Something else. ',
      },
    ];
    const options = {
      semi: true,
      indent: 2,
      printWidth: 80,
      jsdocEnsureDescriptionsAreSentences: true,
    };
    let result = null;
    // When
    result = await prepareTags(input, options, 0);
    // Then
    expect(result).toEqual(output);
  });
});
