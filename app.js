/**
 * Main application file
 */

'use strict';

import express from 'express';
import http from 'http';

// Setup server
var app = express();
var server = http.createServer( app );

// Start server
function startServer() {
  let port = process.env.PORT || 3000;

  app.movieRental = server.listen( port, function() {
    console.log('Express server listening on %d port', port);
  });
}

setImmediate( startServer );

// Expose app
exports = module.exports = app;
