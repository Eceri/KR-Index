import path from 'path';
import webpack from 'webpack';

module.exports = {
    entry: './js/navBar.js',
    output: {
        context: path.resolve(__dirname, "src"),
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    historyApiFallback: true
}
