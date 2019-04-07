import '@babel/polyfill'
import path               from 'path'
import merge              from 'webpack-merge'
import development        from './dev.config.babel'
import production         from './prod.config.babel'

const TARGET = process.env.npm_lifecycle_event
const PATHS = {
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build')
}

process.env.BABEL_ENV = TARGET

const common = {
  entry: [
    PATHS.app
  ],

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: ''
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss'],
    modules: ['node_modules', PATHS.app, PATHS.build]
  },

  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: 'file-loader'
    }]
  }

}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(development, common)
}

if (TARGET === 'build' || !TARGET) {
  module.exports = merge(production, common)
}
