const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },

  devServer: {
    hot: true,
    inline: true,
    contentBase: './build',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '{title}',
      template: 'index.html',
    }),
  ],
};
