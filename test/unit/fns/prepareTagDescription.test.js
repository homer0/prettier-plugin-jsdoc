jest.unmock('../../../src/fns/prepareTagDescription');

const { prepareTagDescription } = require('../../../src/fns/prepareTagDescription');

describe('prepareTagDescription', () => {
  const cases = [
    {
      it: 'should ignore a tag that doesn\'t have description',
      input: {
        name: 'something',
      },
      output: {
        name: 'something',
      },
    },
    {
      it: 'should transform a tag description',
      input: {
        name: 'something',
        description: 'something',
      },
      output: {
        name: 'something',
        description: 'Something.',
      },
    },
    {
      it: 'should transform a tag description, respecting any leading and/or trailing space',
      input: {
        description: '  something else  ',
      },
      output: {
        description: '  Something else.  ',
      },
    },
    {
      it: 'should ignore an @example tag',
      input: {
        tag: 'example',
        description: '  something else  ',
      },
      output: {
        tag: 'example',
        description: '  something else  ',
      },
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = prepareTagDescription(caseInfo.input);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
