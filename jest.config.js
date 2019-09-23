const ts_preset = require('ts-jest/jest-preset');
const mongodb_preset = require('@shelf/jest-mongodb/jest-preset');

module.exports = {
  ...ts_preset,
  ...mongodb_preset,
};
