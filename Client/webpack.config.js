import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: './js/index.js',
  output: {
    context: path.resolve(__dirname, "src"),
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        loader: "image-loader",
        publicPath: '/assets'
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  historyApiFallback: true
}
