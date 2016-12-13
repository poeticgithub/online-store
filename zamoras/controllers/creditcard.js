var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var db = require('../db');



// define the creditcard route
router.get('/', function(req, res) {
	if(req.authentication.user)
	{
		console.log('Carried over userID: ' + req.authentication.user);
		return res.render('creditcard');
	}

	else
	{
	  res.send('Oops! Something went wrong, please return back.');
	  
	}

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

		//var customerId = db.getSession();

		var statement = 'insert into paymenttype (Card_number, ExpDate, SecurityCode, NameOnCard, Customer_id) values ( \'';
		statement += cardNumber + '\',';
		statement += '\'' + expDate + '\',';
		statement += '\'' + securityCode + '\',';
		statement += '\'' + name + '\',';

		statement += '\'' + req.authentication.user + '\');';
		console.log(statement);

		connection.query(statement);

		connection.end();

		req.authentication.user = req.authentication.userTemp;
		req.authentication.cart = new Array();
        req.authentication.count = 0;
        req.authentication.quantity = new Array();


		res.redirect('/shoppingpage');

});

module.exports = router;