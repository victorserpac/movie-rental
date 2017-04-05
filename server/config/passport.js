import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import User from '../api/user/user.model';
import db from './database';

export default function( passport ) {

  let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: db.secret
  };

  let strategy = new JwtStrategy( options, function( payload, done ) {
    User.findOne({ where: { email: payload.email }})
      .then( user => {
        if ( user ) {
          user = JSON.stringify( user );
        }
        return done( null, user || false );
      })
      .catch( err => {
        return done( err );
      });
  });

  passport.use( strategy );
}
