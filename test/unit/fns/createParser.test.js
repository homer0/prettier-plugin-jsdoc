jest.mock('comment-parser');
jest.unmock('../../../src/fns/utils');
jest.unmock('../../../src/fns/createParser');

const R = require('ramda');
const commentParser = require('comment-parser');
const { createParser } = require('../../../src/fns/createParser');
const { formatDescription } = require('../../../src/fns/formatDescription');
const { formatTags } = require('../../../src/fns/formatTags');
const { formatTagsTypes } = require('../../../src/fns/formatTagsTypes');
const { prepareTags } = require('../../../src/fns/prepareTags');
const { render } = require('../../../src/fns/render');

describe('createParser', () => {
  beforeEach(() => {
    commentParser.mockReset();
    formatDescription.mockReset();
    formatTags.mockReset();
    formatTagsTypes.mockReset();
    prepareTags.mockReset();
    render.mockReset();
  });

  it('shouldn\'t do anything if there are no comments on the AST', () => {
    // Given
    const astBase = {
      comments: [],
    };
    const ast = R.clone(astBase);
    const originalParser = jest.fn(() => ast);
    const text = 'lorem ipsum';
    const parsers = ['babel'];
    const options = { printWidth: 80 };
    // When
    createParser(originalParser)(text, parsers, options);
    // Then
    expect(ast).toEqual(astBase);
  });

  it('should render a comment', () => {
    // Given
    const commentStr = '*\n * @typedef {string} MyStr\n ';
    const column = 2;
    const astBase = {
      comments: [{
        type: 'CommentBlock',
        value: commentStr,
        loc: {
          start: {
            column,
          },
        },
      }],
    };
    const ast = R.clone(astBase);
    const tagsList = [{
      tag: 'typedef',
      type: 'string',
      name: 'MyStr',
      description: '',
    }];
    const parsed = [{
      description: '',
      tags: tagsList,
    }];
    commentParser.mockImplementationOnce(() => parsed);
    const formatTagsTypesRest = jest.fn((tags) => tags);
    formatTagsTypes.mockImplementationOnce(() => formatTagsTypesRest);
    const formatTagsRest = jest.fn((tags) => tags);
    formatTags.mockImplementationOnce(() => formatTagsRest);
    const formatDescriptionRest = jest.fn((tags) => tags);
    formatDescription.mockImplementationOnce(() => formatDescriptionRest);
    const prepareTagsRest = jest.fn((tags) => tags);
    prepareTags.mockImplementationOnce(() => prepareTagsRest);
    const renderRest = jest.fn(() => [
      '@typedef {string} MyFormattedStr',
    ]);
    render.mockImplementationOnce(() => renderRest);

    const originalParser = jest.fn(() => ast);
    const text = 'lorem ipsum';
    const parsers = ['babel'];
    const options = { printWidth: 80 };
    // When
    createParser(originalParser)(text, parsers, options);
    // Then
    expect(ast).toEqual({
      comments: [{
        type: 'CommentBlock',
        value: '*\n   * @typedef {string} MyFormattedStr\n   ',
        loc: {
          start: {
            column,
          },
        },
      }],
    });
    expect(commentParser).toHaveBeenCalledTimes(1);
    expect(commentParser).toHaveBeenCalledWith(`/*${commentStr}*/`, {
      dotted_names: false,
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
});
