const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [],

  output: {
    publicPath: '',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
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
        })
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEVELOPMENT__: false,
    }),
    new ExtractTextPlugin({filename:'bundle.css'}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'manifest.json',
      template: 'src/manifest.json',
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to  : 'assets'
      }
    ])
  ]
};
