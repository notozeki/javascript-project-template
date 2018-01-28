const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const enableHMR = true;
const isProduction = process.env.NODE_ENV === 'production';
const inDevServer = process.argv.find(v => v.includes('webpack-dev-server'));
const isHMR = inDevServer && enableHMR;
const extractCSS = !(isHMR) || isProduction;

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
      {
        test: /\.scss$/,
        use: (extractCSS
          ? ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader'],
            })
          : [
              { loader: 'style-loader', options: { hmr: enableHMR, sourceMap: true } },
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ]
        )
      },
    ],
  },

  devServer: {
    hot: enableHMR,
    inline: true,
    contentBase: './build',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '{title}',
      template: 'index.html',
    }),
    new ExtractTextPlugin('styles.css'),
  ],
};
