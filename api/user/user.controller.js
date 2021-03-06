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
      .catch( err => {
        if ( err.message == 'Validation error' ) {
          res.status( 409 ).json({
            success: false,
            data: 'Endereço de email já cadastrado'
          });
        } else {
          res.status( 500 ).json({
            success: false,
            data: 'Erro interno de servidor'
          });
        }
      });
  }

  // Authenticate User
  login( req, res ) {
    User.findOne({ where: { email: req.body.email }})
      .then( user => {
        if ( user ) {
          return bcrypt.compare( req.body.password, user.password )
           .then( isMatch => isMatch ? jwt.sign( JSON.stringify( user ), db.secret ) : false )
        } else {
          res.status( 400 ).json({
            success: false,
            data: 'Falha na autenticação. Email ou senha incorreta.'
          });
        }
      })
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

        res.status( 400 ).json({
          success: false,
          data: 'Falha na autenticação. Email ou senha incorreta.'
        });
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
