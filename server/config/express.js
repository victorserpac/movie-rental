/**
 * Express configuration
 */

'use strict';

import bodyParser from 'body-parser';
import morgan from 'morgan';

export default function( app ) {

  // Get our request parameters
  app.use( bodyParser.json() );

  // Log to console
  app.use( morgan( 'dev' ) );
}
