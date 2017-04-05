'use strict';

import Movie from './movie.model';

// Send results to response
function respondWithResult( res, statusCode ) {
  statusCode = statusCode || 200;
  return function( entity ) {
    if( entity ) {
      return res.status( statusCode ).json( entity );
    }
    return null;
  };
}

// Handle the catch in Movie DB query
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

export function rent( req, res ) {
  let movie_id = req.body.movie_id;

  console.log(movie_id);

  res.sendStatus( 201 );
}
