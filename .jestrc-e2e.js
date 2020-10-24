module.exports = {
  collectCoverage: true,
  testPathIgnorePatterns: ['/node_modules/'],
  unmockedModulePathPatterns: ['/node_modules/', '/utils/'],
  testEnvironment: './test/e2e/utils/environment.js',
  testMatch: ['**/e2e/**/*.e2e.js'],
};
