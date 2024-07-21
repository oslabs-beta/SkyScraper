export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignore transformations in node_modules
    '<rootDir>/dist/', // Ignore transformations in dist
  ],
  testPathIgnorePatterns: [
    '<rootDir>/dist/', // Ignore test files in dist
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
