'use strict';

import User from './user.model';

export function create( req, res ) {
  User.create( req.body )
    .then( res.sendStatus( 201 ) )
    .catch( err => res.status( 500 ).json( err ) );
}
