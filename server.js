#!/usr/bin/env node

/**
 * New Relic Agent
 */

require('newrelic')

/**
 * Module dependencies.
 */

const app = require('./api/app')
const http = require('http')
const collections = require('./db/collections')

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = val => {
  const portToNormalize = parseInt(val, 10)

  if (isNaN(portToNormalize)) {
    // named pipe
    return val
  }

  if (portToNormalize >= 0) {
    // port number
    return portToNormalize
  }

  return false
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Load the models.
 */

collections.sequelize.sync().then(() => {
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
})

/**
 * Event listener for HTTP server "error" event.
 */

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : addr.port
  console.log(`Listening on http://localhost:${bind}`)
}
