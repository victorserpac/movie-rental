'use strict';

import express from 'express';
import passport from 'passport';
import controller from './movie.controller';

let router = express.Router();

router.get( '/', controller.index );
router.get( '/search/:query', controller.searchByTitle );
router.post( '/rent', passport.authenticate( 'jwt', { session: false } ), controller.rent );
router.post( '/giveback', passport.authenticate( 'jwt', { session: false } ), controller.giveback );

module.exports = router;
