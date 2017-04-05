/**
 * Main application file
 */

'use strict';

import express from 'express';
import http from 'http';

// Setup server
let app = express();
let server = http.createServer( app );
require( './config/express' ).default( app );

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