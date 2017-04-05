/**
 * Main application routes
 */

'use strict';

export default function( app ) {
  // Insert routes below
  app.use( '/movie', require( './api/movie' ) );
  // app.use( '/api/user', require( './api/user' ) );

}
