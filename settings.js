const {
  compilerOptions: { paths },
} = require("./jsconfig.json");
const path = require("path");

const jestPaths = () => {
  const jestAliases = {};

  for (let key in paths) {
    if (key === "Assets") {
      jestAliases[`^${key}(.*)`] = `<rootDir>/${paths[key][0]}/$1`;
    } else {
      jestAliases[`^${key}`] = `<rootDir>/${paths[key][0]}`;
    }
  }

  return jestAliases;
};

const webpackPaths = () => {
  const webpackAliases = {};

  for (let key in paths) {
    webpackAliases[key] = path.resolve(__dirname, paths[key][0]);
  }

  return webpackAliases;
};

module.exports = { webpackPaths, jestPaths };
