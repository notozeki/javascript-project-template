const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
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
    contentBase: './dist',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
