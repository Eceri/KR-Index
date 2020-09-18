const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { HashedModuleIdsPlugin } = require("webpack");

module.exports = (env) => {
  return merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
      before(app, server) {
        const chokidar = require("chokidar");
        chokidar
          .watch(path.resolve(__dirname, "src"))
          .on("all", (event, path) => {
            server.sockWrite(server.sockets, "content-changed");
          });
      },
      contentBase: path.resolve(__dirname, "build"),
      hot: true,
      historyApiFallback: true,
      compress: true,
      index: "index.html",
      hot: true,
      proxy: {
        "/assets": {
          target: "https://dev.krindex.net/",
          changeOrigin: true,
        },
      },
    },
    stats: "errors-only",
    plugins: environmentPicker(env),
  });
};

const environmentPicker = (env) => {
  // Is env defined ?
  if (env) {
    if (env.analyze) {
      return [new BundleAnalyzerPlugin(), new HashedModuleIdsPlugin()];
    }
  } else {
    return [new HashedModuleIdsPlugin()];
  }
};
