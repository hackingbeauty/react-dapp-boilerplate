import webpack              from 'webpack'
import path                 from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ExtractTextPlugin    from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin    from 'html-webpack-plugin'
import CopyWebpackPlugin    from 'copy-webpack-plugin'

module.exports = {
  mode: 'production',
  entry: [],

  output: {
    publicPath: ''
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: '@import "config-styles.scss";',
              includePaths: [
                path.join(__dirname, '..', '/src/configs/theme')
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      __DEVELOPMENT__: false
    }),
    new ExtractTextPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'manifest.json',
      template: 'src/manifest.json',
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ])
  ]
}
