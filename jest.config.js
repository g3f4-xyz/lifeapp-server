import { cpus } from 'os';
import tsPreset from 'ts-jest/jest-preset';

export default {
  ...tsPreset,
  setupFiles: ['<rootDir>/test/setup-tests.ts'],
  collectCoverage: true,
  maxConcurrency: cpus().length,
};
