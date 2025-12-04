import { defineConfig } from 'eslint/config';
import { createConfig } from '@homer0/eslint-plugin/create';

export default defineConfig([
  createConfig({
    importUrl: import.meta.url,
    ignores: ['tests/**'],
    configs: ['node-with-prettier', 'jsdoc'],
    esm: true,
    addTsParser: false,
    extraneousDependencies: {
      devFiles: ['vitest.*.config.js'],
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  }),
  {
    ignores: ['tests/e2e/fixtures/*.js'],
  },
  createConfig({
    importUrl: import.meta.url,
    files: 'all-inside:./tests',
    configs: ['node-with-prettier', 'tests'],
    esm: true,
    addTsParser: false,
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-use-before-define': 'off',
    },
  }),
]);
