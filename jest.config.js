const { jestPaths } = require("./settings");

module.exports = {
  clearMocks: true,
  moduleDirectories: ["node_modules"],
  modulePathIgnorePatterns: [
    "__mocks__",
    "__snapshots__",
    "coverage",
    "config",
  ],
  snapshotResolver: "<rootDir>/__tests__/config/snapshotResolver.js",
  coverageDirectory: "<rootDir>/__tests__/coverage",
  moduleNameMapper: {
    ...jestPaths(),
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
