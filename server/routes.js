/**
 * Main application routes
 */

'use strict';

export default function( app ) {
  // Insert routes below
  app.use( '/movies', require( './api/movies' ) );
  // app.use( '/api/user', require( './api/user' ) );

}
