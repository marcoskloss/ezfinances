const { resolve } = require('path');
const root = resolve(__dirname);
module.exports = {
    rootDir: root,
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    displayName: 'unit tests',
    testEnvironment: 'node',
    clearMocks: true,
    preset: 'ts-jest',
    moduleNameMapper: {
        '@src/(.*)': '<rootDir>/src/$1',
    },
    setupFiles: ['<rootDir>jest.setup.js'],
    setupFilesAfterEnv: ['<rootDir>jest.setup.js'],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['text', 'lcov'],
    watchPathIgnorePatterns: ['node_modules'],
    transformIgnorePatterns: ['node_modules'],
    collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts', '!src/types.d.ts'],
};
