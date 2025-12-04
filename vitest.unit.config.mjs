import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'unit',
    environment: 'node',
    include: ['tests/unit/**/*.test.js'],
    globals: true,
    coverage: {
      provider: 'istanbul',
      reportsDirectory: resolve('./coverage-unit'),
      reporter: ['text', 'lcov'],
    },
  },
});
