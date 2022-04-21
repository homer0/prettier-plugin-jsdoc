jest.mock('comment-parser');
jest.mock('prettier/parser-babel');
jest.mock('prettier/parser-flow');
jest.mock('prettier/parser-typescript');
jest.unmock('../../../src/fns/getParsers');

const R = require('ramda');
const { parse: commentParser } = require('comment-parser');
const babelParser = require('prettier/parser-babel');
const flowParser = require('prettier/parser-flow');
const tsParser = require('prettier/parser-typescript');

const { getParsers } = require('../../../src/fns/getParsers');
const { formatDescription } = require('../../../src/fns/formatDescription');
const { formatTags } = require('../../../src/fns/formatTags');
const { formatTagsTypes } = require('../../../src/fns/formatTagsTypes');
const { prepareTags } = require('../../../src/fns/prepareTags');
const { render } = require('../../../src/fns/render');

describe('getParsers', () => {
  beforeEach(() => {
    commentParser.mockReset();
    babelParser.parsers.babel.parse.mockReset();
    babelParser.parsers['babel-flow'].parse.mockReset();
    babelParser.parsers['babel-ts'].parse.mockReset();
    flowParser.parsers.flow.parse.mockReset();
    tsParser.parsers.typescript.parse.mockReset();
    formatDescription.mockReset();
    formatTags.mockReset();
    formatTagsTypes.mockReset();
    prepareTags.mockReset();
    render.mockReset();
  });

  it("shouldn't do anything if there are no comments on the AST", () => {
    // Given
    const astBase = {
      comments: [],
    };
    const parsersToTest = [
      {
        name: 'babel',
        ast: R.clone(astBase),
        uses: babelParser.parsers.babel,
      },
      {
        name: 'babel-flow',
        ast: R.clone(astBase),
        uses: babelParser.parsers['babel-flow'],
      },
      {
        name: 'babel-ts',
        ast: R.clone(astBase),
        uses: babelParser.parsers['babel-ts'],
      },
      {
        name: 'flow',
        ast: R.clone(astBase),
        uses: flowParser.parsers.flow,
      },
      {
        name: 'typescript',
        ast: R.clone(astBase),
        uses: tsParser.parsers.typescript,
      },
    ];
    parsersToTest.forEach((info) => {
      info.uses.parse.mockImplementationOnce(() => info.ast);
    });
    const text = 'lorem ipsum';
    const parsers = ['babel'];
    const options = {
      jsdocPluginEnabled: true,
      printWidth: 80,
    };
    let sut = null;
    // When/Then
    sut = getParsers();
    parsersToTest.forEach((info) => {
      sut[info.name].parse(text, parsers, options);
      expect(info.ast).toEqual(astBase);
    });
  });

  it("shouldn't do anything if the plugin is disabled", () => {
    // Given
    const commentStr = '*\n * @typedef {string} MyStr\n ';
    const column = 2;
    const astBase = {
      comments: [
        {
          type: 'CommentBlock',
          value: commentStr,
          loc: {
            start: {
              column,
            },
          },
        },
      ],
    };
    const parsersToTest = [
      {
        name: 'babel',
        ast: R.clone(astBase),
        uses: babelParser.parsers.babel,
      },
      {
        name: 'babel-flow',
        ast: R.clone(astBase),
        uses: babelParser.parsers['babel-flow'],
      },
      {
        name: 'babel-ts',
        ast: R.clone(astBase),
        uses: babelParser.parsers['babel-ts'],
      },
      {
        name: 'flow',
        ast: R.clone(astBase),
        uses: flowParser.parsers.flow,
      },
      {
        name: 'typescript',
        ast: R.clone(astBase),
        uses: tsParser.parsers.typescript,
      },
    ];
    parsersToTest.forEach((info) => {
      info.uses.parse.mockImplementationOnce(() => info.ast);
    });
    const text = 'lorem ipsum';
    const parsers = ['babel'];
    const options = {
      jsdocPluginEnabled: false,
      printWidth: 80,
    };
    let sut = null;
    // When/Then
    sut = getParsers();
    parsersToTest.forEach((info) => {
      sut[info.name].parse(text, parsers, options);
      expect(info.ast).toEqual(astBase);
    });
  });

  it("shouldn't do anything if the plugin is being extended", () => {
    // Given
    const commentStr = '*\n * @typedef {string} MyStr\n ';
    const column = 2;
    const astBase = {
      comments: [
        {
          type: 'CommentBlock',
          value: commentStr,
          loc: {
            start: {
              column,
            },
          },
        },
      ],
    };
    const parsersToTest = [
      {
        name: 'babel',
        ast: R.clone(astBase),
        uses: babelParser.parsers.babel,
      },
      {
        name: 'babel-flow',
        ast: R.clone(astBase),
        uses: babelParser.parsers['babel-flow'],
      },
      {
        name: 'babel-ts',
        ast: R.clone(astBase),
        uses: babelParser.parsers['babel-ts'],
      },
      {
        name: 'flow',
        ast: R.clone(astBase),
        uses: flowParser.parsers.flow,
      },
      {
        name: 'typescript',
        ast: R.clone(astBase),
        uses: tsParser.parsers.typescript,
      },
    ];
    parsersToTest.forEach((info) => {
      info.uses.parse.mockImplementationOnce(() => info.ast);
    });
    const text = 'lorem ipsum';
    const parsers = ['babel'];
    const options = {
      jsdocPluginEnabled: true,
      jsdocPluginExtended: true,
      printWidth: 80,
    };
    let sut = null;
    // When/Then
    sut = getParsers(true);
    parsersToTest.forEach((info) => {
      sut[info.name].parse(text, parsers, options);
      expect(info.ast).toEqual(astBase);
    });
  });

  it('should render a comment', () => {
    // Given
    const commentStr = '*\n * @typedef {string} MyStr\n ';
    const column = 2;
    const astBase = {
      comments: [
        {
          type: 'CommentBlock',
          value: commentStr,
          loc: {
            start: {
              column,
            },
          },
        },
      ],
    };
    const ast = R.clone(astBase);
    const tagsList = [
      {
        tag: 'typedef',
        type: 'string',
        name: 'MyStr',
        description: '',
      },
    ];
    const parsed = [
      {
        description: '',
        tags: tagsList,
      },
    ];
    commentParser.mockImplementationOnce(() => parsed);
    const formatTagsTypesRest = jest.fn((tags) => tags);
    formatTagsTypes.mockImplementationOnce(() => formatTagsTypesRest);
    const formatTagsRest = jest.fn((tags) => tags);
    formatTags.mockImplementationOnce(() => formatTagsRest);
    const formatDescriptionRest = jest.fn((tags) => tags);
    formatDescription.mockImplementationOnce(() => formatDescriptionRest);
    const prepareTagsRest = jest.fn((tags) => tags);
    prepareTags.mockImplementationOnce(() => prepareTagsRest);
    const renderRest = jest.fn(() => ['@typedef {string} MyFormattedStr']);
    render.mockImplementationOnce(() => renderRest);
    tsParser.parsers.typescript.parse.mockImplementationOnce(() => ast);
    const text = 'lorem ipsum';
    const parsers = ['ts'];
    const options = {
      jsdocPluginEnabled: true,
      printWidth: 80,
    };
    let sut = null;
    // When
    sut = getParsers();
    sut.typescript.parse(text, parsers, options);
    // Then
    expect(ast).toEqual({
      comments: [
        {
          type: 'CommentBlock',
          value: '*\n   * @typedef {string} MyFormattedStr\n   ',
          loc: {
            start: {
              column,
            },
          },
        },
      ],
    });
    expect(commentParser).toHaveBeenCalledTimes(1);
    expect(commentParser).toHaveBeenCalledWith(`/*${commentStr}*/`, {
      dotted_names: false,
      spacing: 'preserve',
    });
    expect(formatTagsTypes).toHaveBeenCalledTimes(1);
    expect(formatTagsTypes).toHaveBeenCalledWith(R.__, options, column);
    expect(formatTagsTypesRest).toHaveBeenCalledTimes(1);
    expect(formatTagsTypesRest).toHaveBeenCalledWith(tagsList);
    expect(formatTags).toHaveBeenCalledTimes(1);
    expect(formatTags).toHaveBeenCalledWith(R.__, options);
    expect(formatTagsRest).toHaveBeenCalledTimes(1);
    expect(formatTagsRest).toHaveBeenCalledWith(tagsList);
    expect(prepareTags).toHaveBeenCalledTimes(1);
    expect(prepareTags).toHaveBeenCalledWith(R.__, options, column);
    expect(prepareTagsRest).toHaveBeenCalledTimes(1);
    expect(prepareTagsRest).toHaveBeenCalledWith(tagsList);
    expect(formatDescription).toHaveBeenCalledTimes(1);
    expect(formatDescription).toHaveBeenCalledWith(R.__, options);
    expect(formatDescriptionRest).toHaveBeenCalledTimes(1);
    expect(formatDescriptionRest).toHaveBeenCalledWith(parsed[0]);
  });

  it('should render an inline comment', () => {
    // Given
    const commentStr = '*\n * @type {MyStr}\n ';
    const column = 2;
    const astBase = {
      comments: [
        {
          type: 'CommentBlock',
          value: commentStr,
          loc: {
            start: {
              column,
            },
          },
        },
      ],
    };
    const ast = R.clone(astBase);
    const tagsList = [
      {
        tag: 'type',
        type: 'MyStr',
        name: '',
        description: '',
      },
    ];
    const parsed = [
      {
        description: '',
        tags: tagsList,
      },
    ];
    commentParser.mockImplementationOnce(() => parsed);
    const formatTagsTypesRest = jest.fn((tags) => tags);
    formatTagsTypes.mockImplementationOnce(() => formatTagsTypesRest);
    const formatTagsRest = jest.fn((tags) => tags);
    formatTags.mockImplementationOnce(() => formatTagsRest);
    const formatDescriptionRest = jest.fn((tags) => tags);
    formatDescription.mockImplementationOnce(() => formatDescriptionRest);
    const prepareTagsRest = jest.fn((tags) => tags);
    prepareTags.mockImplementationOnce(() => prepareTagsRest);
    const renderRest = jest.fn(() => ['@type {MyFormattedStr}']);
    render.mockImplementationOnce(() => renderRest);

    babelParser.parsers['babel-flow'].parse.mockImplementationOnce(() => ast);
    const text = 'lorem ipsum';
    const parsers = ['babel'];
    const options = {
      jsdocPluginEnabled: true,
      jsdocUseInlineCommentForASingleTagBlock: true,
      printWidth: 80,
    };
    let sut = null;
    // When
    sut = getParsers();
    sut['babel-flow'].parse(text, parsers, options);
    // Then
    expect(ast).toEqual({
      comments: [
        {
          type: 'CommentBlock',
          value: '* @type {MyFormattedStr} ',
          loc: {
            start: {
              column,
            },
          },
        },
      ],
    });
  });

  it('should fix a tag without a space between name and type', () => {
    // Given
    const commentStr = '*\n * @typedef{string} MyStr\n ';
    const column = 2;
    const astBase = {
      comments: [
        {
          type: 'CommentBlock',
          value: commentStr,
          loc: {
            start: {
              column,
            },
          },
        },
      ],
    };
    const ast = R.clone(astBase);
    const tagsList = [
      {
        tag: 'typedef',
        type: 'string',
        name: 'MyStr',
        description: '',
      },
    ];
    const parsed = [
      {
        description: '',
        tags: tagsList,
      },
    ];
    commentParser.mockImplementationOnce(() => parsed);
    const formatTagsTypesRest = jest.fn((tags) => tags);
    formatTagsTypes.mockImplementationOnce(() => formatTagsTypesRest);
    const formatTagsRest = jest.fn((tags) => tags);
    formatTags.mockImplementationOnce(() => formatTagsRest);
    const formatDescriptionRest = jest.fn((tags) => tags);
    formatDescription.mockImplementationOnce(() => formatDescriptionRest);
    const prepareTagsRest = jest.fn((tags) => tags);
    prepareTags.mockImplementationOnce(() => prepareTagsRest);
    const renderRest = jest.fn(() => ['@typedef {string} MyFormattedStr']);
    render.mockImplementationOnce(() => renderRest);
    tsParser.parsers.typescript.parse.mockImplementationOnce(() => ast);
    const text = 'lorem ipsum';
    const parsers = ['ts'];
    const options = {
      jsdocPluginEnabled: true,
      printWidth: 80,
    };
    let sut = null;
    // When
    sut = getParsers();
    sut.typescript.parse(text, parsers, options);
    // Then
    expect(ast).toEqual({
      comments: [
        {
          type: 'CommentBlock',
          value: '*\n   * @typedef {string} MyFormattedStr\n   ',
          loc: {
            start: {
              column,
            },
          },
        },
      ],
    });
  });
});
