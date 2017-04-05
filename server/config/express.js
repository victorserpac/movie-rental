/**
 * Express configuration
 */

'use strict';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';

require( './passport' ).default( passport );



export default function( app ) {

  // Get our request parameters
  app.use( bodyParser.urlencoded( { extended: false } ) );
  app.use( bodyParser.json() );

  // Log to console
  app.use( morgan( 'dev' ) );

  // Use the passport package in our application
  app.use( passport.initialize() );
}
