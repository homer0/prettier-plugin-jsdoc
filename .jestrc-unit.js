module.exports = {
  automock: true,
  collectCoverage: true,
  coverageDirectory: 'coverage-unit',
  testPathIgnorePatterns: ['/node_modules/'],
  unmockedModulePathPatterns: ['/node_modules/', 'app.js', 'utils.js', 'constants.js'],
  testEnvironment: 'node',
  testMatch: ['**/unit/**/*.test.js'],
};
