const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { HashedModuleIdsPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|bmp)$/,
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
        use: ["cache-lodaer", "css-loader", "file-loader"],
        include: path.resolve("src"),
      },
    ],
  },
  resolve: {
    /**
     * @todo place relative paths here
     */
    alias: {
      Assets: path.resolve(__dirname, "src/Assets/"),
      Settings: path.resolve(__dirname, "./settings.js"),
      Helpers: path.resolve(__dirname, "src/helpers/helpers.index.js"),
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
    new FaviconsWebpackPlugin({
      logo: "./src/Assets/icons/favicon.png",
    }),
    new HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
