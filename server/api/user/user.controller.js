/**
 * User Controller
 */

'use strict';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './user.model';
import Token from './token.model';
import db from '../../config/database';
import { ResponseHelper } from '../../helpers/ResponseHelper';
import { TokenHelper } from '../../helpers/TokenHelper';

class UserController {

  // Create User
  create( req, res ) {
    User.create( req.body )
      .then( ResponseHelper.respondWithResult( res ) )
      .catch( ResponseHelper.handleError( res ) );
  }

  // Authenticate User
  login( req, res ) {
    User.findOne({ where: { email: req.body.email }})
      .then( user => bcrypt.compare( req.body.password, user.password )
        .then( isMatch => isMatch ? jwt.sign( JSON.stringify( user ), db.secret ) : false )
      )
      .then( token => {
        if ( token ) {
          Token.findOne({ where: { token: token }})
            .then( blacklistToken => {
              if ( blacklistToken ) {
                blacklistToken.destroy();
              }
            });

          return {
            success: true,
            token: 'JWT ' + token
          }
        }
        return {
          success: false,
          data: 'Authentication failed. Wrong password.'
        }
      })
      .then( ResponseHelper.respondWithResult( res ) )
      .catch( ResponseHelper.handleError( res ) );
  }

  // Logout User | Put token in blacklist
  logout( req, res ) {
    let token = TokenHelper.getToken( req.headers );

    if ( token ) {
      jwt.verify( token, db.secret, function( err ) {
          if ( err ) {
            ResponseHelper.respondWithResult( res, 500 );
          } else {
            Token.create({ token: token })
              .then( ResponseHelper.respondWithResult( res ) )
              .catch( ResponseHelper.handleError( res ) );
          }
      });
    } else {
      ResponseHelper.respondWithResult( res, 400 );
    }
  }
}

let userController = new UserController();

export default userController;
