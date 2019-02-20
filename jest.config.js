module.exports = {
  preset: "jest-preset-angular",
  roots: ['src'],
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  collectCoverageFrom: [
    "**/*.ts",
    "!**/*.actions.ts",
    "!**/jestGlobalMocks.ts"
  ],
}
