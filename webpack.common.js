const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { HashedModuleIdsPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

// custom config
const { webpackPaths } = require("./settings");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[hash].js",
    publicPath: "/",
    chunkFilename: "[name].[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|bmp|avif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              publicPath: "/",
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: "/" } },
          "css-loader",
        ],
      },
      {
        test: /\.ext$/,
        use: ["cache-loader", "css-loader", "file-loader"],
        include: path.resolve("src"),
      },
    ],
  },
  resolve: {
    alias: {
      ...webpackPaths(),
    },
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 20,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin(),
    new CompressionPlugin({
      filename: "[path].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new ManifestPlugin(),
  ],
};
