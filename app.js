/**
 * Main application file
 */

'use strict';

import express from 'express';
import http from 'http';
import db, { Sequelize } from './config/database.js';

// Connect to MySql
db.sequelize = new Sequelize( db.database, db.user, db.pass, {
  host: db.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    freezeTableName: true,
    timestamps: false
  },
});

// Setup server
let app = express();
let server = http.createServer( app );
require( './config/express' ).default( app );
require( './routes' ).default( app );

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
