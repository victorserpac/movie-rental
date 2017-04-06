/**
 * Main application routes
 */

'use strict';

export default function( app ) {

  // Insert routes below
  app.use( '/movie', require( './api/movie' ) );
  app.use( '/user', require( './api/user' ) );
}
