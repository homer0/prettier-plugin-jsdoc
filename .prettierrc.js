import base from '@homer0/prettier-config' with { type: 'json' };

const config = {
  ...base,
  plugins: ['./src/index.js'],
};

export default config;
