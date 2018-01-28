const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
              use: [
                { loader: 'css-loader', options: { minimize: true } },
                'sass-loader',
              ],
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

  devtool: (!isProduction && 'cheap-module-source-map'),

  devServer: {
    hot: enableHMR,
    inline: true,
    contentBase: './build',
  },

  plugins: [
    (!isProduction && new webpack.HotModuleReplacementPlugin()),
    (isProduction && new UglifyJsPlugin()),
    new HtmlWebpackPlugin({
      title: '{title}',
      template: 'index.html',
      minify: (isProduction && {
        removeComments: true,
        collapseWhitespace: true,
      }),
    }),
    new ExtractTextPlugin('styles.css'),
  ].filter(v => !!v),
};
