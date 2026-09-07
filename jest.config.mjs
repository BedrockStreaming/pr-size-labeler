/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  // Source files use ESM-style `.js` specifiers to import sibling `.ts` files
  // (Node's ESM resolution requires this). Jest's ESM resolver can't strip
  // the extension on its own, so map `./foo.js` -> `./foo` and let Jest's
  // normal resolution find `foo.ts` via moduleFileExtensions above.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true,
};
