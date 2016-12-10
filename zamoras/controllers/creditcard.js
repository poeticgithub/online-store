var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var db = require('../db');



// define the creditcard route
router.get('/', function(req, res) {
  return res.render('creditcard');
  });

router.post('/', function(req,res) {

var connection = mysql.createConnection({
		    host: 'localhost',
		    user: 'root',
		    password: 't430',
		    database: 'zamoras'
		});

		connection.connect();
		console.log(req.body);

		var cardNumber = req.body.cardNumber;
		var expDate = req.body.expDate;
		var securityCode = req.body.securityCode;
		var name = req.body.nameOnCard;

		var customerId = db.getSession();
		console.log(customerId);

		
		//connection.query('Select * from customer where ')

connection.end();

});

module.exports = router;