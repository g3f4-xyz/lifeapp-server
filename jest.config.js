const os = require('os');
const tsPreset = require('ts-jest/jest-preset');
const mongodbPreset = require('@shelf/jest-mongodb/jest-preset');

module.exports = {
  ...tsPreset,
  ...mongodbPreset,
  collectCoverage: true,
  maxConcurrency: os.cpus().length,
};
