import { describe, it, expect } from 'vitest';
import {
  renderTagInLine,
  renderTagInLineWithDescription,
} from '../../../src/fns/renderTagInLine.js';

describe('renderTagInLine', () => {
  describe('renderTagInLine', () => {
    const cases = [
      [
        'should render a tag with a type',
        {
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
      ],
      [
        'should render a tag without a type',
        {
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
      ],
      [
        'should render a tag without description',
        {
          input: {
            tag: 'returns',
            type: 'string',
            name: '',
            description: '',
          },
          output: ['@returns {string}'],
          options: {
            width: 50,
            typePadding: 1,
            namePadding: 2,
          },
        },
      ],
      [
        'should render a tag with a multiline type',
        {
          input: {
            tag: 'type',
            type: '{\n  prop: boolean;\n}',
            name: 'MyType',
            description: '',
          },
          output: ['@type {{', '  prop: boolean;', '}} MyType'],
          options: {
            width: 50,
            typePadding: 1,
            namePadding: 1,
          },
        },
      ],
      [
        'should render a tag with a multiline name',
        {
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
            '                consectetur adipiscing elit.',
            '                Maecenas sollicitudin non justo',
            '                quis placerat. Quisque eu',
            '                dignissim tellus, ut sodales',
            '                lectus.',
          ],
          options: {
            width: 50,
            typePadding: 1,
            namePadding: 1,
          },
        },
      ],
      [
        'should render a tag, without type, with a multiline name',
        {
          input: {
            tag: 'see',
            type: '',
            name: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
              'sodales lectus.',
            ].join(' '),
            description: '',
          },
          output: [
            '@see Lorem ipsum dolor sit amet,',
            '     consectetur adipiscing elit.',
            '     Maecenas sollicitudin non justo',
            '     quis placerat. Quisque eu dignissim',
            '     tellus, ut sodales lectus.',
          ],
          options: {
            width: 40,
            typePadding: 1,
            namePadding: 1,
          },
        },
      ],
      [
        'should move the name to a new line when the type is too long',
        {
          input: {
            tag: 'typedef',
            type: 'StaticsControllerOptions & StaticsControllerWrapperOptionsProperties',
            name: 'StaticsControllerWrapperOptions',
            description: '',
          },
          output: [
            '@typedef {StaticsControllerOptions & StaticsControllerWrapperOptionsProperties}',
            'StaticsControllerWrapperOptions',
          ],
          options: {
            width: 90,
            typePadding: 1,
            namePadding: 1,
          },
        },
      ],
    ];

    it.each(cases)('%s', (_, caseInfo) => {
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

  describe('renderTagInLineWithDescription', () => {
    const cases = [
      [
        'should render a tag with a type and description',
        {
          input: {
            tag: 'param',
            type: 'string',
            name: 'myParam',
            description: 'Lorem ipsum dolor sit amet',
          },
          output: ['@param {string}  myParam  Lorem ipsum dolor sit amet'],
          options: {
            width: 60,
            typePadding: 1,
            namePadding: 2,
            descriptionPadding: 2,
            inlineDescriptionMinLength: 20,
          },
        },
      ],
      [
        'should render a tag with a type and a long description in multiple lines',
        {
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
            '@param {string}  myParam  Lorem ipsum dolor sit',
            '                          amet, consectetur',
            '                          adipiscing elit.',
            '                          Maecenas sollicitudin',
            '                          non justo quis placerat.',
            '                          Quisque eu dignissim',
            '                          tellus, ut sodales',
            '                          lectus.',
          ],
          options: {
            width: 50,
            typePadding: 1,
            namePadding: 2,
            descriptionPadding: 2,
            inlineDescriptionMinLength: 20,
          },
        },
      ],
      [
        'should render a tag without a type',
        {
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
            '@access public Lorem ipsum dolor sit',
            '               amet, consectetur',
            '               adipiscing elit. Maecenas',
            '               sollicitudin non justo',
            '               quis placerat. Quisque eu',
            '               dignissim tellus, ut',
            '               sodales lectus.',
          ],
          options: {
            width: 40,
            typePadding: 1,
            namePadding: 1,
            descriptionPadding: 1,
            inlineDescriptionMinLength: 20,
          },
        },
      ],
      [
        'should render a tag with a multiline type',
        {
          input: {
            tag: 'type',
            type: '{\n  prop: boolean;\n}',
            name: 'MyType',
            description: 'Lorem ipsum dolor sit amet',
          },
          output: [
            '@type {{',
            '  prop: boolean;',
            '}} MyType Lorem ipsum dolor sit amet',
          ],
          options: {
            width: 50,
            typePadding: 1,
            namePadding: 1,
            descriptionPadding: 1,
            inlineDescriptionMinLength: 20,
          },
        },
      ],
      [
        'should render a tag with a multiline name',
        {
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
            '                consectetur adipiscing elit.',
            '                Maecenas sollicitudin non justo',
            '                quis placerat. Quisque eu',
            '                dignissim tellus, ut sodales',
            '                lectus.',
          ],
          options: {
            width: 50,
            typePadding: 1,
            namePadding: 1,
            descriptionPadding: 1,
            inlineDescriptionMinLength: 20,
          },
        },
      ],
      [
        'should render a tag, without type, with a multiline name',
        {
          input: {
            tag: 'see',
            type: '',
            name: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas',
              'sollicitudin non justo quis placerat. Quisque eu dignissim tellus, ut',
              'sodales lectus.',
            ].join(' '),
            description: '',
          },
          output: [
            '@see Lorem ipsum dolor sit amet,',
            '     consectetur adipiscing elit.',
            '     Maecenas sollicitudin non justo',
            '     quis placerat. Quisque eu dignissim',
            '     tellus, ut sodales lectus.',
          ],
          options: {
            width: 40,
            typePadding: 1,
            namePadding: 1,
            descriptionPadding: 1,
            inlineDescriptionMinLength: 20,
          },
        },
      ],
      [
        "should move the description to a new line if there's no space",
        {
          input: {
            tag: 'param',
            type: 'string',
            name: 'myParam',
            description: 'Lorem ipsum dolor sit amet',
          },
          output: ['@param {string}  myParam', 'Lorem ipsum dolor sit amet'],
          options: {
            width: 60,
            typePadding: 1,
            namePadding: 2,
            descriptionPadding: 2,
            inlineDescriptionMinLength: 50,
          },
        },
      ],
    ];

    it.each(cases)('%s', (_, caseInfo) => {
      // Given
      let result = null;
      // When
      result = renderTagInLineWithDescription(
        {
          width: caseInfo.options.width,
          typePadding: caseInfo.options.typePadding,
          namePadding: caseInfo.options.namePadding,
          descriptionPadding: caseInfo.options.descriptionPadding,
          inlineDescriptionMinLength: caseInfo.options.inlineDescriptionMinLength,
          descriptionInTheSameLine: true,
        },
        caseInfo.input,
      );
      // Then
      expect(result).toEqual(caseInfo.output);
    });
  });
});
