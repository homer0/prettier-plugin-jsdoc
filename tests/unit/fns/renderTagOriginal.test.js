import { describe, it, expect } from 'vitest';
import { renderTagOriginal } from '../../../src/fns/renderTagOriginal.js';

describe('renderTagOriginal', () => {
  const cases = [
    [
      'should render a single line tag',
      {
        input: {
          source: [{ source: '* This is a single line tag.' }],
        },
        output: ['This is a single line tag.'],
      },
    ],
    [
      'should remove leading white spaces in a single line tag',
      {
        input: {
          source: [{ source: '*   This is a single line tag.' }],
        },
        output: ['This is a single line tag.'],
      },
    ],
    [
      'should render a multiline tag',
      {
        input: {
          source: [
            { source: ' * @param {string} name This is a multiline tag.' },
            { source: ' * It has multiple lines.' },
          ],
        },
        output: [
          '@param {string} name This is a multiline tag.',
          'It has multiple lines.',
        ],
      },
    ],
    [
      'should render a multiline tag with closing comment',
      {
        input: {
          source: [
            { source: ' * @param {string} name This is a multiline tag.' },
            { source: ' * It has multiple lines, and closes the comment.' },
            { source: ' */' },
          ],
        },
        output: [
          '@param {string} name This is a multiline tag.',
          'It has multiple lines, and closes the comment.',
        ],
      },
    ],
    [
      'should preserve the indentation of a multiline tag',
      {
        input: {
          source: [
            { source: ' * @typedef {import(' },
            { source: ' *     "../very/long/dir/and_file_name"' },
            { source: ' * ).VeryLongLongLongLongTypeName} VeryLongLongLongLongTypeName' },
            { source: ' */' },
          ],
        },
        output: [
          '@typedef {import(',
          '    "../very/long/dir/and_file_name"',
          ').VeryLongLongLongLongTypeName} VeryLongLongLongLongTypeName',
        ],
      },
    ],
    [
      'should preserve the indentation of a multiline tag but fix the first line',
      {
        input: {
          source: [
            { source: ' *    @typedef {import(' },
            { source: ' *     "../very/long/dir/and_file_name"' },
            { source: ' * ).VeryLongLongLongLongTypeName} VeryLongLongLongLongTypeName' },
            { source: ' */' },
          ],
        },
        output: [
          '@typedef {import(',
          '    "../very/long/dir/and_file_name"',
          ').VeryLongLongLongLongTypeName} VeryLongLongLongLongTypeName',
        ],
      },
    ],
  ];

  it.each(cases)('should correctly format the case %s', (_, caseInfo) => {
    // Given
    let result = null;
    // When
    result = renderTagOriginal(caseInfo.input);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
