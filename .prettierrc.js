import base from '@homer0/prettier-config' with { type: 'json' };

export default {
  ...base,
  plugins: ['./src/index.js'],
};
