const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.WEBPACK_SERVE ? 'development' : 'production'
const isProduction = (mode === 'production')
const sourceMap = !isProduction

module.exports = {
  mode,
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      {
        test: /\.(css|scss)$/,
        use: [
          (isProduction
            ? MiniCssExtractPlugin.loader
            : { loader: 'style-loader', options: { hmr: true, sourceMap } }
          ),
          { loader: 'css-loader', options: { sourceMap } },
          { loader: 'postcss-loader',options: { sourceMap } },
          { loader: 'sass-loader', options: { sourceMap } },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: '{title}',
      template: 'index.html',
      minify: (isProduction && {
        removeComments: true,
        collapseWhitespace: true,
      }),
    }),
    new MiniCssExtractPlugin(),
  ],

  devtool: sourceMap && 'cheap-module-eval-source-map',
}
