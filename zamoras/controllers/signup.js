var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');



// define the login route
router.get('/', function(req, res) {
  return res.render('signup');
  });

//process a submitted signup form
router.post('/', function(req,res) {
   console.log(req.body);
});

module.exports = router;

