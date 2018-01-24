const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    publicPath: '',
  },

  module: {
    noParse: [new RegExp('node_modules/localforage/dist/localforage.js')],
    rules: [{
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            localIdentName: '[hash:base64:5][path]-[local]',
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                precss,
                autoprefixer
              ];
            }
          }
        },
        {
          loader: 'sass-loader',
          options: {
           sourceMap: true,
           data: '@import "variables";',
           includePaths: [
             path.join(__dirname, '..', '../src/containers/App/styles')
           ]
          }
        }
      ]
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      __DEVELOPMENT__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    })
  ]
};
