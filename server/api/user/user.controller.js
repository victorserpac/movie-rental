'use strict';

import User from './user.model';

export function create( req, res ) {
  User.create( req.body )
    .then( user => {
      delete user.dataValues.password;
      res.status( 201 ).json( user );
    })
    .catch( err => res.status( 500 ).json( err ) );
}
