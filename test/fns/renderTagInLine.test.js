jest.unmock('../../src/fns/renderTagInLine');
jest.unmock('../../src/fns/utils');
jest.unmock('../../src/fns/splitText');

const { renderTagInLine } = require('../../src/fns/renderTagInLine');

describe('renderTagInLine', () => {
  const cases = [
    {
      it: 'should render a tag with a type',
      input: {
        tag: 'param',
        type: 'string',
        name: 'myParam',
        description: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus.',
        ].join(' '),
      },
      output: [
        '@param {string}  myParam',
        'Lorem ipsum dolor sit amet, consectetur adipiscing',
        'elit. Maecenas sollicitudin non justo quis',
        'placerat. Quisque eu dignissim tellus, ut sodales',
        'lectus.',
      ],
      options: {
        width: 50,
        typePadding: 1,
        namePadding: 2,
      },
    },
    {
      it: 'should render a tag without a type',
      input: {
        tag: 'access',
        name: 'public',
        description: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus.',
        ].join(' '),
      },
      output: [
        '@access public',
        'Lorem ipsum dolor sit amet, consectetur',
        'adipiscing elit. Maecenas sollicitudin',
        'non justo quis placerat. Quisque eu',
        'dignissim tellus, ut sodales lectus.',
      ],
      options: {
        width: 40,
        typePadding: 1,
        namePadding: 1,
      },
    },
    {
      it: 'should render a tag without description',
      input: {
        tag: 'returns',
        type: 'string',
        name: '',
        description: '',
      },
      output: [
        '@returns {string}',
      ],
      options: {
        width: 50,
        typePadding: 1,
        namePadding: 2,
      },
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = renderTagInLine(
      caseInfo.options.width,
      caseInfo.options.typePadding,
      caseInfo.options.namePadding,
      caseInfo.input,
    );
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
