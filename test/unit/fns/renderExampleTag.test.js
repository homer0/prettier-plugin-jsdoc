jest.unmock('../../../src/fns/renderExampleTag');

const { renderExampleTag } = require('../../../src/fns/renderExampleTag');

describe('renderExampleTag', () => {
  const cases = [
    {
      it: 'should render an @example tag',
      input: {
        tag: 'example',
        description: 'const fn = (msg) => console.log(msg);\nfn(\'hello world!\');',
      },
      output: [
        '@example',
        'const fn = (msg) => console.log(msg);',
        'fn(\'hello world!\');',
      ],
      options: {
        jsdocLinesBetweenExampleTagAndCode: 0,
      },
    },
    {
      it: 'should render an @example tag with an empty line before the code',
      input: {
        tag: 'example',
        description: 'const fn = (msg) => console.log(msg);\nfn(\'hello world!\');',
      },
      output: [
        '@example',
        '',
        'const fn = (msg) => console.log(msg);',
        'fn(\'hello world!\');',
      ],
      options: {
        jsdocLinesBetweenExampleTagAndCode: 1,
      },
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = renderExampleTag(caseInfo.input, caseInfo.options);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
