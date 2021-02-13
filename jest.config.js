module.exports = {
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'json'],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    // '**/?(*.)+(spec|test).js?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['/node_modules/'],

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
