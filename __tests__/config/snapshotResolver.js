const path = require("path");

/** resolves from test to snapshot path */
const resolveSnapshotPath = (testPath, snapshotExtension) => {
  const testFolder = testPath.split("\\")[4];

  const testSourcePath = testPath
    .replace(testFolder, "__snapshots__")
    .replace(/.test.([tj]sx?)/, ".test" + snapshotExtension);
  const testDirectory = path.dirname(testSourcePath);
  const testFilename = path.basename(testSourcePath);

  return `${testDirectory}/${testFilename}`;
};

module.exports = {
  testPathForConsistencyCheck: "__tests__/some/example.test.js",
  resolveSnapshotPath,

  /** resolves from snapshot to test path */
  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    return snapshotFilePath
      .replace(snapshotExtension, ".js")
      .replace("__snapshots__/", "some/");
  },
};
