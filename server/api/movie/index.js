'use strict';

var express = require( 'express' );
var controller = require( './movie.controller' );

var router = express.Router();

router.get( '/', controller.index );
// router.post('/rent', controller.rent);
// router.post('/return', controller.return);
router.get('/search/:query', controller.searchByTitle);

module.exports = router;
