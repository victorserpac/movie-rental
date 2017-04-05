import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import User from '../api/user/user.model';
import db from './database';

export default function( passport ) {

  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = db.secret;

  var strategy = new JwtStrategy( opts, function( jwt_payload, done ) {

    User.findOne({ where: { email: jwt_payload.email }})
      .then(function(user) {
          if (user) {
              return done(null, JSON.stringify( user ));
          } else {
              return done(null, false);
          }
      })
      .catch(err=>{
        return done(err);
      })
  });

  passport.use( strategy );

}
