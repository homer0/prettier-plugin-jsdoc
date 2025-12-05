import { describe, it, expect } from 'vitest';
import { splitText } from '../../../src/fns/splitText.js';

describe('splitText', () => {
  it("should return a single line when the text doesn't exceed the length", () => {
    // Given
    const input = 'Some text';
    const output = ['Some text'];
    let result = null;
    // When
    result = splitText(input, 20);
    // Then
    expect(result).toEqual(output);
  });

  it('should return two lines when the text exceeds the length by 1', () => {
    // Given
    const input = 'Some lorem ipsum text';
    const output = ['Some lorem ipsum', 'text'];
    let result = null;
    // When
    result = splitText(input, input.length - 1);
    // Then
    expect(result).toEqual(output);
  });

  it('should respect intentional line breaks after a symbol', () => {
    // Given
    const input = ['Some title:', ' - Some list item.', ' - Some other list item.'].join(
      '\n',
    );
    const output = ['Some title:', '- Some list item.', '- Some other list item.'];
    let result = null;
    // When
    result = splitText(input, 25);
    // Then
    expect(result).toEqual(output);
  });

  it('should fix line breaks to match the expected length', () => {
    // Given
    const input = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus\nlobortis',
      'erat molestie posuere dictum. Integer libero justo, viverra\nquis efficitur',
      'in, condimentum congue lorem.',
    ].join(' ');
    const output = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'elit. Phasellus lobortis erat molestie posuere',
      'dictum. Integer libero justo, viverra quis',
      'efficitur in, condimentum congue lorem.',
    ];
    let result = null;
    // When
    result = splitText(input, 50);
    // Then
    expect(result).toEqual(output);
  });

  it('should respect empty lines', () => {
    // Given
    const input = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus\nlobortis',
      'erat molestie posuere dictum. Integer libero justo, viverra\nquis efficitur',
      'in, condimentum\n\ncongue lorem.',
    ].join(' ');
    const output = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'elit. Phasellus lobortis erat molestie posuere',
      'dictum. Integer libero justo, viverra quis',
      'efficitur in, condimentum',
      '',
      'congue lorem.',
    ];
    let result = null;
    // When
    result = splitText(input, 50);
    // Then
    expect(result).toEqual(output);
  });

  it('should only allow one empty line between paragraphs', () => {
    // Given
    const input = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus\nlobortis',
      'erat molestie posuere dictum. Integer libero justo, viverra\nquis efficitur',
      'in, condimentum\n\n\ncongue lorem.',
    ].join(' ');
    const output = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'elit. Phasellus lobortis erat molestie posuere',
      'dictum. Integer libero justo, viverra quis',
      'efficitur in, condimentum',
      '',
      'congue lorem.',
    ];
    let result = null;
    // When
    result = splitText(input, 50);
    // Then
    expect(result).toEqual(output);
  });

  it("shouldn't add a leading space when there's only one word (bug)", () => {
    // Given
    const input = 'Description';
    const output = ['Description'];
    let result = null;
    // When
    result = splitText(input, 20);
    // Then
    expect(result).toEqual(output);
  });

  it('should keep a Markdown table unformatted', () => {
    // Given
    const input = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus\nlobortis',
      'erat molestie posuere dictum. Integer libero justo, viverra\nquis efficitur',
      'in, condimentum congue lorem.\n',
      '| Column A | Column B |',
      '| -------- | -------- |',
      '| ValueA   | Value B  |',
    ].join('\n');
    const output = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'elit. Phasellus lobortis erat molestie posuere',
      'dictum. Integer libero justo, viverra quis',
      'efficitur in, condimentum congue lorem.',
      '',
      '| Column A | Column B |',
      '| -------- | -------- |',
      '| ValueA   | Value B  |',
    ];
    let result = null;
    // When
    result = splitText(input, 50);
    // Then
    expect(result).toEqual(output);
  });

  it("should keep a Markdown table unformatted even when there's text after it", () => {
    // Given
    const input = [
      '| Column A | Column B |',
      '| -------- | -------- |',
      '| ValueA   | Value B  |',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus\nlobortis',
      'erat molestie posuere dictum. Integer libero justo, viverra\nquis efficitur',
      'in, condimentum congue lorem.',
    ].join('\n');
    const output = [
      '| Column A | Column B |',
      '| -------- | -------- |',
      '| ValueA   | Value B  |',
      'Lorem ipsum dolor sit amet, consectetur adipiscing',
      'elit. Phasellus lobortis erat molestie posuere',
      'dictum. Integer libero justo, viverra quis',
      'efficitur in, condimentum congue lorem.',
    ];
    let result = null;
    // When
    result = splitText(input, 50);
    // Then
    expect(result).toEqual(output);
  });
});
