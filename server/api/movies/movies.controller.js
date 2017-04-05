'use strict';

import Movie from './movies.model';

// Gets a list of Movies
export function index( req, res ) {
  Movie.findAll()
    .then( function( movies ) {
      res.status( 200 ).json( movies );
    })
    .catch( function( err ) {
      res.status( 500 ).send( err );
    });
}
