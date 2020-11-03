jest.unmock('../../../src/fns/renderExampleTag');
jest.unmock('../../../src/fns/splitText');

const { renderExampleTag } = require('../../../src/fns/renderExampleTag');

describe('renderExampleTag', () => {
  const cases = [
    {
      it: 'should only render the @example without any code',
      input: {
        tag: 'example',
        description: '',
        examples: [],
      },
      output: ['@example'],
      width: 80,
      options: {
        jsdocLinesBetweenExampleTagAndCode: 0,
      },
    },
    {
      it: 'should render an @example tag',
      input: {
        tag: 'example',
        examples: [
          {
            code: "const fn = (msg) => console.log(msg);\nfn('hello world!');",
          },
        ],
      },
      output: [
        '@example',
        'const fn = (msg) => console.log(msg);',
        "fn('hello world!');",
        '',
      ],
      width: 80,
      options: {
        jsdocLinesBetweenExampleTagAndCode: 0,
      },
    },
    {
      it: 'should render an @example tag with a caption',
      input: {
        tag: 'example',
        examples: [
          {
            caption: 'Some short caption',
            code: "const fn = (msg) => console.log(msg);\nfn('hello world!');",
          },
        ],
      },
      output: [
        '@example',
        '<caption>Some short caption</caption>',
        '',
        'const fn = (msg) => console.log(msg);',
        "fn('hello world!');",
        '',
      ],
      width: 80,
      options: {
        jsdocLinesBetweenExampleTagAndCode: 0,
      },
    },
    {
      it: 'should render an @example tag with a multiline caption',
      input: {
        tag: 'example',
        examples: [
          {
            caption: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis',
              'erat molestie posuere dictum. Integer libero justo, viverra quis.',
            ].join(' '),
            code: "const fn = (msg) => console.log(msg);\nfn('hello world!');",
          },
        ],
      },
      output: [
        '@example',
        '<caption>',
        '  Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        '  Phasellus lobortis erat molestie posuere dictum. Integer',
        '  libero justo, viverra quis.',
        '</caption>',
        '',
        'const fn = (msg) => console.log(msg);',
        "fn('hello world!');",
        '',
      ],
      width: 60,
      options: {
        jsdocLinesBetweenExampleTagAndCode: 0,
        tabWidth: 2,
      },
    },
    {
      it: 'should render an @example tag with multiple captions',
      input: {
        tag: 'example',
        examples: [
          {
            caption: 'Some short caption',
            code: "const fn = (msg) => console.info(msg);\nfn('are you there world?');",
          },
          {
            caption: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis',
              'erat molestie posuere dictum. Integer libero justo, viverra quis.',
            ].join(' '),
            code: "const fn = (msg) => console.log(msg);\nfn('hello world!');",
          },
        ],
      },
      output: [
        '@example',
        '',
        '<caption>Some short caption</caption>',
        '',
        'const fn = (msg) => console.info(msg);',
        "fn('are you there world?');",
        '',
        '<caption>',
        '  Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        '  Phasellus lobortis erat molestie posuere dictum. Integer',
        '  libero justo, viverra quis.',
        '</caption>',
        '',
        'const fn = (msg) => console.log(msg);',
        "fn('hello world!');",
        '',
      ],
      width: 60,
      options: {
        jsdocLinesBetweenExampleTagAndCode: 1,
        tabWidth: 2,
      },
    },
    {
      it: "should render an @example that wasn't formatted",
      input: {
        tag: 'example',
        description:
          "const fn = (msg) => console.info(msg);\nfn('are you there world?');",
      },
      output: [
        '@example',
        '',
        'const fn = (msg) => console.info(msg);',
        "fn('are you there world?');",
        '',
      ],
      width: 60,
      options: {
        jsdocLinesBetweenExampleTagAndCode: 1,
        tabWidth: 2,
      },
    },
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = renderExampleTag(caseInfo.input, caseInfo.width, caseInfo.options);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
