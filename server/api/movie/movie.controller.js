/**
 * Movie Controller
 */

'use strict';

import jwt from 'jsonwebtoken';
import Movie from './movie.model';
import Media from '../media/media.model';
import Rent from './rent.model';
import User from '../user/user.model';
import { ResponseHelper } from '../../helpers/ResponseHelper';

class MovieController {

  // Gets list of Movies
  index( req, res ) {
    Movie.findAll()
      .then( ResponseHelper.respondWithResult( res ) )
      .catch( ResponseHelper.handleError( res ) );
  }

  // Search Movies by title
  searchByTitle( req, res ) {
    Movie.findAll({ where: { title: { $like: '%' + req.params.query + '%' }}})
      .then( ResponseHelper.respondWithResult( res ) )
      .catch( ResponseHelper.handleError( res ) );
  }

  // Giveback Movie
  giveback( req, res ) {
    let token = getToken( req.headers );

    Media.findOne({ where: { code: req.body.media_code }})
      .then( media => media.updateAttributes({ rented: false }) )
      .then( ResponseHelper.respondWithResult( res ) )
      .catch( ResponseHelper.handleError( res ) );
  }

  // Rent a Movie
  rent( req, res ) {
    let token = getToken( req.headers );
    let decoded = jwt.decode( token, { complete: true });

    Media.findOne({ where: { movie_id: req.body.movie_id, rented: { $ne: true } }})
      .then( media => {
        if ( media ) {
          Rent.create({
            user_email: decoded.payload.email,
            media_code: media.dataValues.code
          });

          return media.updateAttributes({ rented: true });
        }

        return {
          success: false,
          data: 'There is no more DVD for this Movie'
        }
      })
      .then( ResponseHelper.respondWithResult( res ) )
      .catch( ResponseHelper.handleError( res ) );
  }
}

let movieController = new MovieController();

export default movieController;

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
