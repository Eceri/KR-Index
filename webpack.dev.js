const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env) => {
  return merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
      contentBase: [
        path.resolve(__dirname, "build"),
        path.resolve(__dirname, "localAssets"),
      ],
      contentBasePublicPath: ["public", "/assets"],
      before(app, server) {
        const chokidar = require("chokidar");
        chokidar
          .watch(path.resolve(__dirname, "src"))
          .on("all", (event, path) => {
            server.sockWrite(server.sockets, "content-changed");
          });
      },
      hot: true,
      historyApiFallback: true,
      compress: true,
      index: "index.html",
      hot: true,
    },
    stats: "errors-only",
    plugins: environmentPicker(env),
  });
};

const environmentPicker = (env) => {
  // Is env defined ?
  if (env) {
    if (env.analyze) {
      return [new BundleAnalyzerPlugin()];
    }
  }
};
