'use strict';

import User from './user.model';
import Token from './token.model';
import bcrypt from 'bcrypt';
import db from '../../config/database';
import jwt from 'jsonwebtoken';

// Create User
export function create( req, res ) {
  User.create( req.body )
    .then( res.sendStatus( 201 ) )
    .catch( err => res.status( 500 ).json( err ) );
}

// Authenticate User
export function login( req, res ) {

  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then( user => bcrypt.compare( req.body.password, user.password )
    .then( isMatch => isMatch ? jwt.sign( JSON.stringify( user ), db.secret ) : false )
  )
  .then( token => {
    if ( token ) {
      res.json({
        success: true,
        token: 'JWT ' + token
      });
    } else {
      res.json({
        success: false,
        data: 'Authentication failed. Wrong password.'
      });
    }
  });
}

// Logout User | Put token in blacklist
export function logout( req, res ) {
  let token = req.headers.authorization || null;

  if ( token ) {
    jwt.verify( token, db.secret, function( err ) {
        if ( err ) {
          res.sendStatus( 500 );
        } else {
          Token.create( { token: token } )
            .then( res.sendStatus( 200 ) )
            .catch( err => res.status( 500 ).json( err ) );
        }
    });
  } else {
    res.sendStatus( 400 );
  }
}
