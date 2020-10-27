module.exports = {
  automock: true,
  collectCoverage: true,
  coverageDirectory: 'coverage-unit',
  testPathIgnorePatterns: ['/node_modules/'],
  unmockedModulePathPatterns: ['/node_modules/'],
  testEnvironment: 'node',
  testMatch: ['**/unit/**/*.test.js'],
};
