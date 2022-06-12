module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage-e2e',
  coveragePathIgnorePatterns: ['/node_modules/', 'app.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  unmockedModulePathPatterns: ['/node_modules/', '/utils/'],
  testEnvironment: './tests/e2e/utils/environment.js',
  testMatch: ['**/e2e/**/*.e2e.js'],
};
