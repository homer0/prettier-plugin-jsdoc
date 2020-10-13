jest.unmock('../../src/fns/prepareTagName');

const { prepareTagName } = require('../../src/fns/prepareTagName');

describe('prepareTagName', () => {
  const cases = [
    {
      it: 'should ignore a tag that is not optional',
      input: {
        name: 'something',
      },
      output: {
        name: 'something',
      },
    },
    {
      it: 'should add brackets to an optional tag',
      input: {
        optional: true,
        name: 'something',
      },
      output: {
        optional: true,
        name: '[something]',
      },
    },
    {
      it: 'should add a default value',
      input: {
        optional: true,
        default: '\'else\'',
        name: 'something',
      },
      output: {
        optional: true,
        default: '\'else\'',
        name: '[something=\'else\']',
      },
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = prepareTagName(caseInfo.input);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
