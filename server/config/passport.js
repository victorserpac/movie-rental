import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import User from '../api/user/user.model';
import db from './database';

export default function( passport ) {

  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = db.secret;
  passport.use( new JwtStrategy( opts, function( jwt_payload, done ) {
    User.findOne({email: jwt_payload.email})
      .then(function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
  }));
}
