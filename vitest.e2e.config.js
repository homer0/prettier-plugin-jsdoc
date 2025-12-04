import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'e2e',
    environment: './tests/e2e/utils/environment.js',
    include: ['tests/e2e/**/*.e2e.js'],
    globals: true,
    coverage: {
      provider: 'istanbul',
      reportsDirectory: resolve('./coverage-e2e'),
      reporter: ['text', 'lcov'],
      exclude: ['src/fns/app.js', '*.json', '**/e2e/utils/**'],
    },
  },
});
