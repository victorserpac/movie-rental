import passport from 'passport';
import Token from '../api/user/token.model';

export default function requireAuth (req, res, next){
    passport.authenticate('jwt', { session: false }, function ( error, decryptToken, jwtError ) {
      let token = req.header('Authorization').slice(4);

      Token.findOne({ where: { token: token }})
        .then( blacklistToken => {
          if ( blacklistToken ) {
            res.status( 401 ).json({
              success: false,
              data: 'Precisa estar logado'
            });
          } else {
            next();
          }
        });

    })( req, res, next );
}
