const os = require('os');
const tsPreset = require('ts-jest/jest-preset');

module.exports = {
  ...tsPreset,
  setupFiles: ['<rootDir>/test/setup-tests.ts'],
  collectCoverage: true,
  maxConcurrency: os.cpus().length,
};
