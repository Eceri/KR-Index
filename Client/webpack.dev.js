const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { DefinePlugin, HashedModuleIdsPlugin } = require("webpack");
const dotenv = require("dotenv");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    hot: true,
    historyApiFallback: true,
    compress: true,
    index: "index.html",
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HashedModuleIdsPlugin(),
    new DefinePlugin({
      "process.env": JSON.stringify(dotenv.config().parsed),
    }),
  ],
});
