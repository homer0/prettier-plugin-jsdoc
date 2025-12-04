import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['tests/unit/**/*.test.js'],
          globals: true,
          coverage: {
            provider: 'v8',
            reportsDirectory: resolve('./coverage-unit'),
            reporter: ['text', 'lcov'],
          },
        },
      },
      {
        test: {
          name: 'e2e',
          environment: './tests/e2e/utils/environment.js',
          include: ['tests/e2e/**/*.e2e.js'],
          globals: true,
          coverage: {
            provider: 'v8',
            reportsDirectory: resolve('./coverage-e2e'),
            reporter: ['text', 'lcov'],
          },
        },
      },
    ],
  },
});
