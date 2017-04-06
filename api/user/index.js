'use strict';

import express from 'express';
import controller from './user.controller';

var router = express.Router();

router.post( '/', controller.create );
router.post( '/login', controller.login );
router.get( '/logout', controller.logout );

module.exports = router;
