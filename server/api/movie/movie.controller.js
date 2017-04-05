'use strict';

import Movie from './movie.model';
import Media from './media.model';
import Rent from './rent.model';
import User from '../user/user.model';
import jwt from 'jsonwebtoken';


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
  var token = getToken(req.headers);
  let movie_id = req.body.movie_id;

  var decoded = jwt.decode(token, {complete: true});
  var email = decoded.payload.email;

  var media = Media.findOne({
    where: {
      movie_id: movie_id,
      rented: {
        $ne: true
      }
    }
  })
  .then( media => {
    if ( media ) {
      Rent.create({
        user_email: email,
        media_code: media.dataValues.code
      });

      return media.updateAttributes({
        rented: true
      });
    }
  })
  .then( () => res.sendStatus( 201 ) )
  .catch( handleError( res ) );

}

function getToken (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
