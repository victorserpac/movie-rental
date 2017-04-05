/**
 * Main application routes
 */

'use strict';

export default function( app ) {
  // Insert routes below
  app.use( '/api/movie', require( './api/movie' ) );
  // app.use( '/api/user', require( './api/user' ) );

}
