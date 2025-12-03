vi.mock('../../../src/fns/getParsers', () => ({
  getParsers: () => 'parsers',
}));
vi.mock('../../../src/fns/getOptions', () => ({
  getOptions: () => 'options',
  getDefaultOptions: () => 'defaultOptions',
}));

import { vi, describe, it, expect } from 'vitest';
import { getPlugin } from '../../../src/fns/getPlugin';

describe('getPlugin', () => {
  it('should generate the plugin main exports', async () => {
    // Given/When
    const result = await getPlugin();
    // Then
    expect(result).toEqual({
      languages: expect.arrayContaining([
        expect.objectContaining({
          name: 'JavaScript',
        }),
        expect.objectContaining({
          name: 'JSX',
        }),
        expect.objectContaining({
          name: 'TypeScript',
        }),
        expect.objectContaining({
          name: 'TSX',
        }),
        expect.objectContaining({
          name: 'Flow',
        }),
      ]),
      options: 'options',
      defaultOptions: 'defaultOptions',
      parsers: 'parsers',
    });
  });
});
