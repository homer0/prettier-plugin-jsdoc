jest.unmock('../../../src/fns/prepareTagDescription');

const { prepareTagDescription } = require('../../../src/fns/prepareTagDescription');

describe('prepareTagDescription', () => {
  const cases = [
    {
      it: "should ignore a tag that doesn't have description",
      input: {
        name: 'something',
      },
      output: {
        name: 'something',
      },
    },
    {
      it: 'should ignore a tag that cannot be a sentence',
      input: {
        tag: 'since',
        name: 'something',
      },
      output: {
        tag: 'since',
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
      it: 'should transform a tag name',
      input: {
        tag: 'see',
        name: 'something',
        description: '',
      },
      output: {
        tag: 'see',
        name: 'Something.',
        description: '',
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
    {
      it: 'should ignore a URL-only description',
      input: {
        description: 'https://codear.org',
      },
      output: {
        description: 'https://codear.org',
      },
    },
    {
      it: 'should ignore a URL-only name',
      input: {
        tag: 'see',
        name: 'https://codear.org',
      },
      output: {
        tag: 'see',
        name: 'https://codear.org',
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
