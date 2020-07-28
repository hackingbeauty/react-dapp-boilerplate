import webpack           from 'webpack'
import path              from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client'
  ],
  output: {
    publicPath: ''
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            localIdentName: '[hash:base64:5][path]-[local]'
          }
        },
        { loader: 'resolve-url-loader' },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            data: '@import "theme/config-styles";',
            includePaths: [
              path.join(__dirname, '..', '/src/configs')
            ]
          }
        }
      ]
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      __DEVELOPMENT__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
