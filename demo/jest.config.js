module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'storeways.js',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  moduleFileExtensions: ['js', 'json'],
  verbose: true,
};
