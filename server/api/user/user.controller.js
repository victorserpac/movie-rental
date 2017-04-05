'use strict';

import User from './user.model';
import bcrypt from 'bcrypt';
import db from '../../config/database';
import jwt from 'jwt-simple';

export function create( req, res ) {
  User.create( req.body )
    .then( res.sendStatus( 201 ) )
    .catch( err => res.status( 500 ).json( err ) );
}

export function login( req, res ) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then( user => bcrypt.compare( req.body.password, user.password )
    .then( isMatch => isMatch ? jwt.encode( user, db.secret ) : false )
  )
  .then( token => {
    if ( token ) {
      res.json( { success: true, token: 'JWT ' + token } );
    } else {
      res.json( { success: false, msg: 'Authentication failed. Wrong password.' } );
    }
  });
}
