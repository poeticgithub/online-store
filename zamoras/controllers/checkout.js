var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var db = require('../db');

var connection = mysql.createConnection({
		    host: 'localhost',
		    user: 'root',
		    password: 't430',
		    database: 'zamoras'
		});

var error = false;

router.get('/', function(req, res)
{
	if(req.authentication.user)
	{
		if(req.authentication.cart != undefined)
	{
		var items = new Array();
		var total = 0;
		var quantity = new Array();
		var subtotal = new Array();
		var totalTax;
		var tax;
		var shipping = 5;

		for(var i in req.authentication.cart)
		{
			if(req.authentication.cart[i] != null)
			{

				//console.log("reqQuant: " + req.authentication.quantity);
				quantity[i] = req.authentication.quantity[i];
				
				items[i] = req.authentication.cart[i];
				items[i].quantity = req.authentication.quantity[i];
				items[i].subtotal = items[i].Cost * quantity[i];
				total += (items[i].Cost * quantity[i]);
				
			}
		}
		
		total = parseFloat((total).toFixed(2));
		tax = parseFloat((total * (0.08875)).toFixed(2));
		totalTax = parseFloat(total + tax + shipping).toFixed(2);

		req.authentication.Total = totalTax;


		var statement = 'Select * from customer where username = \'' + req.authentication.user +'\'';
		connection.query(statement, function(err, rows, fields)
		{
				req.authentication.userID = rows[0].Customer_id;
				req.authentication.userFullName = rows[0].FirstName + ' ' + rows[0].LastName;
				req.authentication.userStreet = rows[0].Street;
				req.authentication.userLocation = rows[0].City + ', ' + rows[0].State + ', ' + rows[0].Zip;				

					var statement2 = 'Select * from paymenttype where Customer_id = \'' + req.authentication.userID + '\'';
					console.log(statement2);
					connection.query(statement2, function(err, rows, fields)
					{
							
							req.authentication.cardInfo = rows[0].Card_number;
							req.authentication.cardInfo = req.authentication.cardInfo.replace(/.(?=.{4})/g, 'x');

							var userInfo = 
							{
								userID: req.authentication.userID,
								FullName: req.authentication.userFullName,
								Street : req.authentication.userStreet,
								Location: req.authentication.userLocation,
								Card: req.authentication.cardInfo
							}
						
						 res.render('checkout', {userInfo, items, total, totalTax, tax, quantity});
					});
			
		});
			
	}

	}
	else
	{
		res.redirect('/login');
	}
});

router.post('/', function(req, res)
{

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		today = mm+'/'+dd+'/'+yyyy;

		var statement3 = 'insert into transactionhistory (TransactionDate, Amount, Customer_id) Values ( \'';
		statement3 += today + '\',';
		statement3 += '\'' + req.authentication.Total + '\',';
		statement3 += '\'' + req.authentication.userID + '\');';

		console.log(statement3);

		connection.query(statement3, function(err, rows, fields){
			if(err)
			{
				console.log(err);
				error = true;
				res.redirect('./checkout');
			}

			else
			{
				console.log('successfully added');
				var userTemp = req.authentication.user;
				var userNameTemp = req.authentication.fullName;
				req.authentication.reset();
				
				req.authentication.user = userTemp;
				req.authentication.fullName = userNameTemp;
				req.authentication.cart = new Array();
              	req.authentication.count = 0;
              	req.authentication.quantity = new Array();

				res.redirect('./');
			}
		});		


});

module.exports = router;