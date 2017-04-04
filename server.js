#!/usr/bin/env node

/**
 * load environment variables.
 */

require("./config/environment");

/**
 * Module dependencies.
 */

const app = require('./api/app');
const http = require('http');
const models = require('./db/collections');

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Load the models.
 */
models.sequelize.sync().then(() => {
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : addr.port;
  console.log(`Listening on http://localhost:${bind}`);
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const portToNormalize = parseInt(val, 10);

  if (isNaN(portToNormalize)) {
    // named pipe
    return val;
  }

  if (portToNormalize >= 0) {
    // port number
    return portToNormalize;
  }

  return false;
}
