jest.unmock('../../../src/fns/render');
jest.unmock('../../../src/fns/renderTagInLine');
jest.unmock('../../../src/fns/renderTagInColumns');
jest.unmock('../../../src/fns/renderTagOriginal');
jest.unmock('../../../src/fns/renderExampleTag');
jest.unmock('../../../src/fns/splitText');
jest.unmock('../../../src/fns/getOptions');

const { render } = require('../../../src/fns/render');
const { getDefaultOptions } = require('../../../src/fns/getOptions');

describe('render', () => {
  const defaultOptions = getDefaultOptions();
  const cases = [
    {
      it: 'should render a callback with columns',
      input: {
        description: [
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus',
        ].join(' '),
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'string',
            name: 'name',
            description: 'Lorem ipsum description for the name',
          },
          {
            tag: 'param',
            type: 'number',
            name: 'length',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
          {
            tag: 'license',
            type: '',
            name: '',
            description: 'Copyright (c) 2015 Example Corporation Inc.',
            descriptionParagrah: true,
          },
        ],
      },
      output: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut sodales',
        'lectus.',
        '',
        '@callback LoremIpsumFn',
        '@param {string} name    Lorem ipsum description for the name',
        '@param {number} length  Lorem ipsum dolor sit amet, consectetur adipiscing',
        '                        elit. Maecenas sollicitudin non justo quis placerat.',
        '@returns {string}',
        '@license',
        'Copyright (c) 2015 Example Corporation Inc.',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        printWidth: 80,
      },
    },
    {
      it: 'should render a callback inline',
      input: {
        description: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus.',
        ].join(' '),
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'string',
            name: 'name',
            description: 'Lorem ipsum description for the name',
          },
          {
            tag: 'param',
            type: 'number',
            name: 'length',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
        ],
      },
      output: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut sodales',
        'lectus.',
        '',
        '@callback LoremIpsumFn',
        '@param {string} name',
        'Lorem ipsum description for the name',
        '@param {number} length',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat.',
        '@returns {string}',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        jsdocPrintWidth: 80,
        jsdocUseColumns: false,
      },
    },
    {
      input: {
        it: 'should render a callback with the same columns for all the tags',
        description: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus.',
        ].join(' '),
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'string',
            name: 'name',
            description: 'Lorem ipsum description for the name',
          },
          {
            tag: 'param',
            type: 'number',
            name: 'length',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
        ],
      },
      output: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut sodales',
        'lectus.',
        '',
        '@callback LoremIpsumFn',
        '@param    {string} name          Lorem ipsum description for the name',
        '@param    {number} length        Lorem ipsum dolor sit amet, consectetur',
        '                                 adipiscing elit. Maecenas sollicitudin non',
        '                                 justo quis placerat.',
        '@returns  {string}',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        printWidth: 80,
        jsdocGroupColumnsByTag: false,
      },
    },
    {
      it: 'should render a callback without a description',
      input: {
        description: '',
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'string',
            name: 'name',
            description: 'Lorem ipsum description for the name',
          },
          {
            tag: 'param',
            type: 'number',
            name: 'length',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
        ],
      },
      output: [
        '@callback LoremIpsumFn',
        '@param {string} name',
        'Lorem ipsum description for the name',
        '@param {number} length',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat.',
        '@returns {string}',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        jsdocPrintWidth: 80,
        jsdocUseColumns: false,
      },
    },
    {
      it: "should render inline if one tag doesn't have enough space for the description",
      input: {
        description: '',
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'someWeirdMagicalTypeForAstring',
            name: 'someWeirdMagicalArgName',
            description: 'Lorem ipsum description for the name',
          },
          {
            tag: 'param',
            type: 'number',
            name: 'length',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
          {
            tag: 'throws',
            type: 'Error',
            name: '',
            description: 'If something goes wrong.',
          },
        ],
      },
      output: [
        '@callback LoremIpsumFn',
        '@param {someWeirdMagicalTypeForAstring} someWeirdMagicalArgName',
        'Lorem ipsum description for the name',
        '@param {number} length',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat.',
        '@returns {string}',
        '@throws {Error}',
        'If something goes wrong.',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        jsdocPrintWidth: 80,
        jsdocGroupColumnsByTag: false,
      },
    },
    {
      it: "should render inline if one tag doesn't have enough space for the description (group)",
      input: {
        description: '',
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'string',
            name: 'name',
            description: 'Lorem ipsum description for the name',
          },
          {
            tag: 'param',
            type: 'someWeirdMagicalTypeForANumber',
            name: 'someWeirdMagicalArgLength',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
          {
            tag: 'throws',
            type: 'Error',
            name: '',
            description: 'If something goes wrong.',
          },
        ],
      },
      output: [
        '@callback LoremIpsumFn',
        '@param {string} name',
        'Lorem ipsum description for the name',
        '@param {someWeirdMagicalTypeForANumber} someWeirdMagicalArgLength',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat.',
        '@returns {string}',
        '@throws {Error}',
        'If something goes wrong.',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        jsdocPrintWidth: 80,
      },
    },
    {
      it: "should render inline only the tag that doesn't have enough space for the description",
      input: {
        description: '',
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'someWeirdMagicalTypeForAstring',
            name: 'someWeirdMagicalArgName',
            description: 'Lorem ipsum description for the name',
          },
          {
            tag: 'param',
            type: 'number',
            name: 'length',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
          {
            tag: 'throws',
            type: 'Error',
            name: '',
            description: 'If something goes wrong.',
          },
        ],
      },
      output: [
        '@callback LoremIpsumFn',
        '@param {someWeirdMagicalTypeForAstring} someWeirdMagicalArgName',
        'Lorem ipsum description for the name',
        '@param {number} length',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat.',
        '@returns {string}',
        '@throws {Error} If something goes wrong.',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        jsdocPrintWidth: 80,
        jsdocConsistentColumns: false,
      },
    },
    {
      it: "should render inline if there's a type multiline",
      input: {
        description: '',
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: '{\n  prop: boolean;\n}',
            name: 'someWeirdMagicalArgName',
            description: 'Lorem ipsum description for the name',
          },
          {
            tag: 'param',
            type: '{\n  length: number;\n}',
            name: 'lengthData',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
          {
            tag: 'throws',
            type: 'Error',
            name: '',
            description: 'If something goes wrong.',
          },
        ],
      },
      output: [
        '@callback LoremIpsumFn',
        '@param {{',
        '  prop: boolean;',
        '}} someWeirdMagicalArgName',
        'Lorem ipsum description for the name',
        '@param {{',
        '  length: number;',
        '}} lengthData',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat.',
        '@returns {string}',
        '@throws {Error}',
        'If something goes wrong.',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        jsdocPrintWidth: 80,
        jsdocGroupColumnsByTag: false,
      },
    },
    {
      it: "should'nt transform the description into a sentence",
      input: {
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
        tags: [
          {
            tag: 'typedef',
            type: 'Object',
            name: 'LoremIpsumObj',
            description: '',
          },
        ],
      },
      output: [
        'lorem ipsum dolor sit amet, consectetur adipiscing elit',
        '',
        '@typedef {Object} LoremIpsumObj',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        printWidth: 80,
        jsdocEnsureDescriptionsAreSentences: false,
      },
    },
    {
      it: 'should render properties in line when configured',
      input: {
        description: '',
        tags: [
          {
            tag: 'typedef',
            type: 'Object',
            name: 'LoremIpsumObj',
            description: '',
          },
          {
            tag: 'property',
            type: 'string',
            name: 'name',
            description: 'Lorem ipsum description for the name.',
            descriptionParagrah: true,
          },
          {
            tag: 'property',
            type: 'number',
            name: 'age',
            description: 'Lorem ipsum description for the age.',
            descriptionParagrah: true,
          },
          {
            tag: 'version',
            type: '',
            name: '1.0.0',
            description: '',
          },
        ],
      },
      output: [
        '@typedef {Object} LoremIpsumObj',
        '@property {string} name',
        'Lorem ipsum description for the name.',
        '@property {number} age',
        'Lorem ipsum description for the age.',
        '@version 1.0.0',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        jsdocPrintWidth: 80,
        jsdocAllowDescriptionOnNewLinesForTags: [
          ...defaultOptions.jsdocAllowDescriptionOnNewLinesForTags,
          'property',
        ],
      },
    },
    {
      it: 'should consider inline tags for consistent columns',
      input: {
        description: '',
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'string',
            name: 'name',
            description: 'Lorem ipsum description for the name.',
            descriptionParagrah: true,
          },
          {
            tag: 'param',
            type: 'number',
            name: 'age',
            description: 'Lorem ipsum description for the age.',
            descriptionParagrah: true,
          },
          {
            tag: 'returns',
            type: 'Person',
            name: '',
            description: 'A new person.',
          },
        ],
      },
      output: [
        '@callback LoremIpsumFn',
        '@param {string} name',
        'Lorem ipsum description for the name.',
        '@param {number} age',
        'Lorem ipsum description for the age.',
        '@returns {Person}',
        'A new person.',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        jsdocPrintWidth: 80,
        jsdocIgnoreNewLineDescriptionsForConsistentColumns: false,
        jsdocAllowDescriptionOnNewLinesForTags: [
          ...defaultOptions.jsdocAllowDescriptionOnNewLinesForTags,
          'param',
        ],
      },
    },
    {
      it: 'something',
      input: {
        description: [
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus',
        ].join(' '),
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'string',
            name: 'name',
            description: 'Lorem ipsum description for the name',
          },
          {
            tag: 'param',
            type: 'number',
            name: 'length',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
          {
            tag: 'license',
            type: '',
            name: '',
            description: 'Copyright (c) 2015 Example Corporation Inc.',
            descriptionParagrah: true,
          },
          {
            tag: 'see',
            type: '',
            name: 'Lorem ipsum description for the see tag and something else.',
            description: '',
          },
        ],
      },
      output: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut sodales',
        'lectus.',
        '',
        '@callback LoremIpsumFn',
        '@param {string} name    Lorem ipsum description for the name',
        '@param {number} length  Lorem ipsum dolor sit amet, consectetur adipiscing',
        '                        elit. Maecenas sollicitudin non justo quis placerat.',
        '@returns {string}',
        '@license',
        'Copyright (c) 2015 Example Corporation Inc.',
        '@see Lorem ipsum description for the see tag and something else.',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        jsdocPrintWidth: 80,
      },
    },
    {
      it: 'should render without tags',
      input: {
        description: [
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus',
        ].join(' '),
        tags: [],
      },
      output: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut sodales',
        'lectus.',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        printWidth: 80,
      },
    },
    {
      it: 'should render a callback with columns and ignore the params',
      input: {
        description: [
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus',
        ].join(' '),
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'string',
            name: 'name',
            description: 'Lorem ipsum description for the name',
            source: [
              {
                source: ' * @param {string} name Lorem ipsum description for the name',
              },
            ],
          },
          {
            tag: 'param',
            type: 'number',
            name: 'length',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
            source: [
              {
                source: [
                  ' * @param {number} length',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
                  'sollicitudin non justo quis placerat.',
                ].join(' '),
              },
              {
                source: ' * And another line.',
              },
            ],
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
          {
            tag: 'license',
            type: '',
            name: '',
            description: 'Copyright (c) 2015 Example Corporation Inc.',
            descriptionParagrah: true,
          },
        ],
      },
      output: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut sodales',
        'lectus.',
        '',
        '@callback LoremIpsumFn',
        '@param {string} name Lorem ipsum description for the name',
        '@param {number} length Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin non justo quis placerat.',
        'And another line.',
        '@returns {string}',
        '@license',
        'Copyright (c) 2015 Example Corporation Inc.',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        printWidth: 80,
        jsdocIgnoreTags: ['param'],
      },
    },
    {
      it: 'should render a callback inline and ignore the params',
      input: {
        description: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus.',
        ].join(' '),
        tags: [
          {
            tag: 'callback',
            type: '',
            name: 'LoremIpsumFn',
            description: '',
          },
          {
            tag: 'param',
            type: 'string',
            name: 'name',
            description: 'Lorem ipsum description for the name',
          },
          {
            tag: 'param',
            type: 'number',
            name: 'length',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
          },
          {
            tag: 'returns',
            type: 'string',
            name: '',
            description: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat.',
            ].join(' '),
            source: [
              {
                source: [
                  ' * @returns {string}',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
                  'sollicitudin non justo quis placerat.',
                ].join(' '),
              },
              {
                source: ' * And another line.',
              },
            ],
          },
        ],
      },
      output: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut sodales',
        'lectus.',
        '',
        '@callback LoremIpsumFn',
        '@param {string} name',
        'Lorem ipsum description for the name',
        '@param {number} length',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
        'sollicitudin non justo quis placerat.',
        '@returns {string} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin non justo quis placerat.',
        'And another line.',
      ],
      column: 0,
      options: {
        ...defaultOptions,
        jsdocPrintWidth: 80,
        jsdocUseColumns: false,
        jsdocIgnoreTags: ['returns'],
      },
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = render(caseInfo.options, caseInfo.column, caseInfo.input);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
