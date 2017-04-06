'use strict';

import express from 'express';
import passport from 'passport';
import controller from './movie.controller';
import requireAuth from '../../config/requireAuth';

let router = express.Router();

router.get( '/', controller.index );
router.get( '/search/:query', controller.searchByTitle );
router.post( '/rent', requireAuth, controller.rent );
router.post( '/giveback', requireAuth, controller.giveback );

module.exports = router;
