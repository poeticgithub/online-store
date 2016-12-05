var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');



// define the login route
router.get('/', function(req, res) {
  	return res.render('shoppingcart');
  });

module.exports = router;

