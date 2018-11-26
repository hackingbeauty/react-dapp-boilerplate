import 'babel-polyfill'
import webpack      from 'webpack'
import path         from 'path'
import merge        from 'webpack-merge'
import development  from './dev.config.babel'
import production   from './prod.config.babel'

const TARGET = process.env.npm_lifecycle_event

const PATHS = {
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build')
}

const common = {
  entry: [
    'babel-polyfill',
    PATHS.app
  ],

  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss'], /* Enables devs to leave off extension when importing */
    modules: ['node_modules', PATHS.app, PATHS.build] /* Tell Wepback what directories to search when resolving modules */
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname
      }
    })
  ]

}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(development, common)
}

if (TARGET === 'build' || !TARGET) {
  module.exports = merge(production, common)
}
