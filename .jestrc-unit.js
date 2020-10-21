module.exports = {
  automock: true,
  collectCoverage: true,
  testPathIgnorePatterns: ['/node_modules/'],
  unmockedModulePathPatterns: ['/node_modules/'],
  testEnvironment: 'node',
  testMatch: ['**/unit/**/*.test.js'],
};
