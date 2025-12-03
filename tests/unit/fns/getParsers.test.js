vi.mock('comment-parser');
vi.mock('prettier/parser-babel', () => ({
  parsers: {
    babel: {
      parse: vi.fn(),
    },
    'babel-flow': {
      parse: vi.fn(),
    },
    'babel-ts': {
      parse: vi.fn(),
    },
  },
}));
vi.mock('prettier/parser-flow', () => ({
  parsers: {
    flow: {
      parse: vi.fn(),
    },
  },
}));
vi.mock('prettier/parser-typescript', () => ({
  parsers: {
    typescript: {
      parse: vi.fn(),
    },
  },
}));
vi.mock('../../../src/fns/formatDescription');
vi.mock('../../../src/fns/formatTags');
vi.mock('../../../src/fns/formatTagsTypes');
vi.mock('../../../src/fns/prepareTags');
vi.mock('../../../src/fns/render');

import * as R from 'ramda';
import { parse as commentParser } from 'comment-parser';
import { parsers as babelParsers } from 'prettier/parser-babel';
import { parsers as flowParsers } from 'prettier/parser-flow';
import { parsers as tsParsers } from 'prettier/parser-typescript';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { getParsers } from '../../../src/fns/getParsers';
import { formatDescription } from '../../../src/fns/formatDescription';
import { formatTags } from '../../../src/fns/formatTags';
import { formatTagsTypes } from '../../../src/fns/formatTagsTypes';
import { prepareTags } from '../../../src/fns/prepareTags';
import { render } from '../../../src/fns/render';

describe('getParsers', () => {
  beforeEach(() => {
    commentParser.mockReset();
    babelParsers.babel.parse.mockReset();
    babelParsers['babel-flow'].parse.mockReset();
    babelParsers['babel-ts'].parse.mockReset();
    flowParsers.flow.parse.mockReset();
    tsParsers.typescript.parse.mockReset();
    formatDescription.mockReset();
    formatTags.mockReset();
    formatTagsTypes.mockReset();
    prepareTags.mockReset();
    render.mockReset();
  });

  it("shouldn't do anything if there are no comments on the AST", async () => {
    // Given
    const astBase = {
      comments: [],
    };
    const parsersToTest = [
      {
        name: 'babel',
        ast: R.clone(astBase),
        uses: babelParsers.babel,
      },
      {
        name: 'babel-flow',
        ast: R.clone(astBase),
        uses: babelParsers['babel-flow'],
      },
      {
        name: 'babel-ts',
        ast: R.clone(astBase),
        uses: babelParsers['babel-ts'],
      },
      {
        name: 'flow',
        ast: R.clone(astBase),
        uses: flowParsers.flow,
      },
      {
        name: 'typescript',
        ast: R.clone(astBase),
        uses: tsParsers.typescript,
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
    await Promise.all(
      parsersToTest.map(async (info) => {
        await sut[info.name].parse(text, parsers, options);
        expect(info.ast).toEqual(astBase);
      }),
    );
  });

  it("shouldn't do anything if the plugin is disabled", async () => {
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
        uses: babelParsers.babel,
      },
      {
        name: 'babel-flow',
        ast: R.clone(astBase),
        uses: babelParsers['babel-flow'],
      },
      {
        name: 'babel-ts',
        ast: R.clone(astBase),
        uses: babelParsers['babel-ts'],
      },
      {
        name: 'flow',
        ast: R.clone(astBase),
        uses: flowParsers.flow,
      },
      {
        name: 'typescript',
        ast: R.clone(astBase),
        uses: tsParsers.typescript,
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
    await Promise.all(
      parsersToTest.map(async (info) => {
        await sut[info.name].parse(text, parsers, options);
        expect(info.ast).toEqual(astBase);
      }),
    );
  });

  it("shouldn't do anything if the plugin is being extended", async () => {
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
        uses: babelParsers.babel,
      },
      {
        name: 'babel-flow',
        ast: R.clone(astBase),
        uses: babelParsers['babel-flow'],
      },
      {
        name: 'babel-ts',
        ast: R.clone(astBase),
        uses: babelParsers['babel-ts'],
      },
      {
        name: 'flow',
        ast: R.clone(astBase),
        uses: flowParsers.flow,
      },
      {
        name: 'typescript',
        ast: R.clone(astBase),
        uses: tsParsers.typescript,
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
    await Promise.all(
      parsersToTest.map(async (info) => {
        await sut[info.name].parse(text, parsers, options);
        expect(info.ast).toEqual(astBase);
      }),
    );
  });

  it('should ignore comment with @prettierignore', async () => {
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
    const formatTagsTypesRest = vi.fn((tags) => tags);
    formatTagsTypes.mockImplementationOnce(() => formatTagsTypesRest);
    const formatTagsRest = vi.fn((tags) => tags);
    formatTags.mockImplementationOnce(() => formatTagsRest);
    const formatDescriptionRest = vi.fn((tags) => tags);
    formatDescription.mockImplementationOnce(() => formatDescriptionRest);
    const prepareTagsRest = vi.fn((tags) => tags);
    prepareTags.mockImplementationOnce(() => prepareTagsRest);
    const renderRest = vi.fn(() => ['@typedef {string} MyFormattedStr']);
    render.mockImplementationOnce(() => renderRest);
    tsParsers.typescript.parse.mockImplementationOnce(() => ast);
    const text = 'lorem ipsum';
    const parsers = ['ts'];
    const options = {
      jsdocPluginEnabled: true,
      printWidth: 80,
    };
    let sut = null;
    // When
    sut = getParsers();
    await sut.typescript.parse(text, parsers, options);
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

  it('should render a comment', async () => {
    // Given
    const commentStr = '*\n * @typedef {string}   MyStr\n * @prettierignore\n ';
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
      {
        tag: 'prettierignore',
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
    const formatTagsTypesRest = vi.fn((tags) => tags);
    formatTagsTypes.mockImplementationOnce(() => formatTagsTypesRest);
    const formatTagsRest = vi.fn((tags) => tags);
    formatTags.mockImplementationOnce(() => formatTagsRest);
    const formatDescriptionRest = vi.fn((tags) => tags);
    formatDescription.mockImplementationOnce(() => formatDescriptionRest);
    const prepareTagsRest = vi.fn((tags) => tags);
    prepareTags.mockImplementationOnce(() => prepareTagsRest);
    tsParsers.typescript.parse.mockImplementationOnce(() => ast);
    const text = 'lorem ipsum';
    const parsers = ['ts'];
    const options = {
      jsdocPluginEnabled: true,
      printWidth: 80,
    };
    let sut = null;
    // When
    sut = getParsers();
    await sut.typescript.parse(text, parsers, options);
    // Then
    expect(ast).toEqual(astBase);
  });

  it('should render an inline comment', async () => {
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
    const formatTagsTypesRest = vi.fn((tags) => tags);
    formatTagsTypes.mockImplementationOnce(() => formatTagsTypesRest);
    const formatTagsRest = vi.fn((tags) => tags);
    formatTags.mockImplementationOnce(() => formatTagsRest);
    const formatDescriptionRest = vi.fn((tags) => tags);
    formatDescription.mockImplementationOnce(() => formatDescriptionRest);
    const prepareTagsRest = vi.fn((tags) => tags);
    prepareTags.mockImplementationOnce(() => prepareTagsRest);
    const renderRest = vi.fn(() => ['@type {MyFormattedStr}']);
    render.mockImplementationOnce(() => renderRest);

    babelParsers['babel-flow'].parse.mockImplementationOnce(() => ast);
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
    await sut['babel-flow'].parse(text, parsers, options);
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

  it('should render an inline comment with no tags', async () => {
    // Given
    const commentText = 'Lorem ipsum dolor sit amet.';
    const commentStr = `*\n * ${commentText}\n `;
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
    const tagsList = [];
    const parsed = [
      {
        description: '',
        tags: tagsList,
      },
    ];
    commentParser.mockImplementationOnce(() => parsed);
    const formatTagsTypesRest = vi.fn((tags) => tags);
    formatTagsTypes.mockImplementationOnce(() => formatTagsTypesRest);
    const formatTagsRest = vi.fn((tags) => tags);
    formatTags.mockImplementationOnce(() => formatTagsRest);
    const formatDescriptionRest = vi.fn((tags) => tags);
    formatDescription.mockImplementationOnce(() => formatDescriptionRest);
    const prepareTagsRest = vi.fn((tags) => tags);
    prepareTags.mockImplementationOnce(() => prepareTagsRest);
    const renderRest = vi.fn(() => [commentText]);
    render.mockImplementationOnce(() => renderRest);

    babelParsers['babel-flow'].parse.mockImplementationOnce(() => ast);
    const text = 'lorem ipsum';
    const parsers = ['babel'];
    const options = {
      jsdocPluginEnabled: true,
      jsdocUseInlineCommentForASingleTagBlock: true,
      jsdocExperimentalFormatCommentsWithoutTags: true,
      printWidth: 80,
    };
    let sut = null;
    // When
    sut = getParsers();
    await sut['babel-flow'].parse(text, parsers, options);
    // Then
    expect(ast).toEqual({
      comments: [
        {
          type: 'CommentBlock',
          value: `* ${commentText} `,
          loc: {
            start: {
              column,
            },
          },
        },
      ],
    });
  });

  it('should ignore and inline comment if it has no tags and option is enabled', async () => {
    // Given
    const commentText = 'Lorem ipsum dolor sit amet.';
    const commentStr = `*\n * ${commentText}\n `;
    const column = 0;
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
    const parsed = [
      {
        description: '',
        tags: [],
      },
    ];
    commentParser.mockImplementationOnce(() => parsed);
    const formatTagsTypesRest = vi.fn((tags) => tags);
    formatTagsTypes.mockImplementationOnce(() => formatTagsTypesRest);
    const formatTagsRest = vi.fn((tags) => tags);
    formatTags.mockImplementationOnce(() => formatTagsRest);
    const formatDescriptionRest = vi.fn((tags) => tags);
    formatDescription.mockImplementationOnce(() => formatDescriptionRest);
    const prepareTagsRest = vi.fn((tags) => tags);
    prepareTags.mockImplementationOnce(() => prepareTagsRest);
    const renderRest = vi.fn(() => [commentText]);
    render.mockImplementationOnce(() => renderRest);

    babelParsers['babel-flow'].parse.mockImplementationOnce(() => ast);
    const text = 'lorem ipsum';
    const parsers = ['babel'];
    const options = {
      jsdocPluginEnabled: true,
      jsdocUseInlineCommentForASingleTagBlock: true,
      jsdocExperimentalFormatCommentsWithoutTags: true,
      jsdocExperimentalIgnoreInlineForCommentsWithoutTags: true,
      printWidth: 80,
    };
    let sut = null;
    // When
    sut = getParsers();
    await sut['babel-flow'].parse(text, parsers, options);
    // Then
    expect(ast).toEqual(astBase);
  });

  it('should fix a tag without a space between name and type', async () => {
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
    const formatTagsTypesRest = vi.fn((tags) => tags);
    formatTagsTypes.mockImplementationOnce(() => formatTagsTypesRest);
    const formatTagsRest = vi.fn((tags) => tags);
    formatTags.mockImplementationOnce(() => formatTagsRest);
    const formatDescriptionRest = vi.fn((tags) => tags);
    formatDescription.mockImplementationOnce(() => formatDescriptionRest);
    const prepareTagsRest = vi.fn((tags) => tags);
    prepareTags.mockImplementationOnce(() => prepareTagsRest);
    const renderRest = vi.fn(() => ['@typedef {string} MyFormattedStr']);
    render.mockImplementationOnce(() => renderRest);
    tsParsers.typescript.parse.mockImplementationOnce(() => ast);
    const text = 'lorem ipsum';
    const parsers = ['ts'];
    const options = {
      jsdocPluginEnabled: true,
      printWidth: 80,
    };
    let sut = null;
    // When
    sut = getParsers();
    await sut.typescript.parse(text, parsers, options);
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
