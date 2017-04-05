'use strict';

import Movie from './movies.model';

function respondWithResult( res, statusCode ) {
  statusCode = statusCode || 200;
  return function( entity ) {
    if( entity ) {
      return res.status( statusCode ).json( entity );
    }
    return null;
  };
}

function handleError( res, statusCode ) {
  statusCode = statusCode || 500;
  return function( err ) {
    res.status( statusCode ).send( err );
  };
}

// Gets a list of Movies
export function index( req, res ) {
  return Movie.findAll()
    .then( respondWithResult( res ) )
    .catch( handleError( res ) );
}

// Search Movie by title
export function searchByTitle( req, res ) {
  return Movie.findAll({
    where: {
      title: {
        $like: '%' + req.params.query + '%'
      }
    }
  })
  .then( respondWithResult( res ) )
  .catch( handleError( res ) );
}
