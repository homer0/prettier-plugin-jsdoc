import { describe, it, expect } from 'vitest';
import { renderTagOriginal } from '../../../src/fns/renderTagOriginal';

describe('renderTagOriginal', () => {
  const cases = [
    {
      it: 'should render a single line tag',
      input: {
        source: [{ source: '* This is a single line tag.' }],
      },
      output: ['This is a single line tag.'],
    },
    {
      it: 'should render a multiline tag',
      input: {
        source: [
          { source: ' * @param {string} name This is a multiline tag.' },
          { source: ' * It has multiple lines.' },
        ],
      },
      output: ['@param {string} name This is a multiline tag.', 'It has multiple lines.'],
    },
    {
      it: 'should render a multiline tag tag closes the comment',
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
  ];

  it.each(cases)('should correctly format the case %#', (caseInfo) => {
    // Given
    let result = null;
    // When
    result = renderTagOriginal(caseInfo.input);
    // Then
    expect(result).toEqual(caseInfo.output);
  });
});
