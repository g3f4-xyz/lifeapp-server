const os = require('os');
const tsPreset = require('ts-jest/jest-preset');
const mongodbPreset = require('@shelf/jest-mongodb/jest-preset');

module.exports = {
  ...tsPreset,
  ...mongodbPreset,
  setupFiles: ['<rootDir>/test/setup-tests.ts'],
  collectCoverage: true,
  maxConcurrency: os.cpus().length,
};
