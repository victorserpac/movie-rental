'use strict';

var express = require( 'express' );
var controller = require( './user.controller' );

var router = express.Router();

router.post( '/', controller.create );
// router.get('/login', controller.login);
// router.get('/logout', controller.logout);

module.exports = router;
