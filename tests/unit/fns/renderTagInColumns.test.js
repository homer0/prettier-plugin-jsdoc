import { describe, it, expect } from 'vitest';
import { renderTagInColumns } from '../../../src/fns/renderTagInColumns';

describe('renderTagInColumns', () => {
  const cases = [
    {
      it: 'should render a tag with a type and a description',
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
        '@param    {string}  myParam       Lorem ipsum dolor sit amet,',
        '                                  consectetur adipiscing',
        '                                  elit. Maecenas sollicitudin',
        '                                  non justo quis placerat.',
        '                                  Quisque eu dignissim',
        '                                  tellus, ut sodales lectus.',
      ],
      options: {
        tagColumnWidth: 10,
        typeColumnWidth: 10,
        nameColumnWidth: 14,
        descriptionColumnWidth: 27,
      },
    },
    {
      it: 'should render a tag without a description',
      input: {
        tag: 'param',
        type: 'string',
        name: 'myParam',
        description: '',
      },
      output: ['@param    {string}  myParam'],
      options: {
        tagColumnWidth: 10,
        typeColumnWidth: 10,
        nameColumnWidth: 14,
        descriptionColumnWidth: 27,
      },
    },
    {
      it: 'should render a tag without a type and a name',
      input: {
        tag: 'description',
        type: '',
        name: '',
        description: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus.',
        ].join(' '),
      },
      output: [
        '@description Lorem ipsum dolor sit amet, consectetur adipiscing',
        '             elit. Maecenas sollicitudin non justo quis',
        '             placerat. Quisque eu dignissim tellus, ut sodales',
        '             lectus.',
      ],
      options: {
        tagColumnWidth: 13,
        typeColumnWidth: 0,
        nameColumnWidth: 0,
        descriptionColumnWidth: 50,
      },
    },
    {
      it: 'should render a tag without a name',
      input: {
        tag: 'throws',
        type: 'Error',
        name: '',
        description: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus.',
        ].join(' '),
      },
      output: [
        '@throws {Error} Lorem ipsum dolor sit amet,',
        '                consectetur adipiscing',
        '                elit. Maecenas sollicitudin',
        '                non justo quis placerat.',
        '                Quisque eu dignissim',
        '                tellus, ut sodales lectus.',
      ],
      options: {
        tagColumnWidth: 8,
        typeColumnWidth: 8,
        nameColumnWidth: 14,
        descriptionColumnWidth: 27,
      },
    },
    {
      it: 'should render a tag with a multiline name',
      input: {
        tag: 'throws',
        type: 'Error',
        name: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
          'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
          'sodales lectus.',
        ].join(' '),
        description: '',
      },
      output: [
        '@throws {Error} Lorem ipsum dolor sit amet,',
        '                consectetur adipiscing',
        '                elit. Maecenas sollicitudin',
        '                non justo quis placerat.',
        '                Quisque eu dignissim',
        '                tellus, ut sodales lectus.',
      ],
      options: {
        tagColumnWidth: 8,
        typeColumnWidth: 8,
        nameColumnWidth: 27,
        descriptionColumnWidth: 14,
      },
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = renderTagInColumns(
      caseInfo.options.tagColumnWidth,
      caseInfo.options.typeColumnWidth,
      caseInfo.options.nameColumnWidth,
      caseInfo.options.descriptionColumnWidth,
      caseInfo.input,
    );
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
