const http = require('http')
const express = require('express')

const app = express()

app.use(require('morgan')('short'));

/* eslint-disable */
(function initWebpack() {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack/common.config.babel')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }))

  app.use(express.static(__dirname + '/'))
})()

app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/src/index.html')
})

const server = http.createServer(app)
server.listen(process.env.PORT || 3000, function onListen() {
  const address = server.address()
  console.log('Listening on: %j', address)
  console.log(' -> that probably means: http://localhost:%d', address.port)
})
/* eslint-disable */
