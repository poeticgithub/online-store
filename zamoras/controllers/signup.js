var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var db = require('../db');
//var bcrypt = require('bcrypt');




// define the login route
router.get('/', function(req, res) {
  return res.render('signup');
  });

//process a submitted signup form
router.post('/', function(req,res) {
		   var connection = mysql.createConnection({
		    host: 'localhost',
		    user: 'root',
		    password: 't430',
		    database: 'zamoras'
		});

		connection.connect();
		console.log(req.body);

		var firstName = req.body.firstname;
		var lastName = req.body.lastname;
		var street = req.body.street;
		var city = req.body.city;
		var state = req.body.state;
		var zipcode = req.body.zipcode;
		var username = req.body.username;
		var password = req.body.password;

		var statement = 'insert into customer (FirstName, LastName, City, State, Street, Zip, username, password) values ( \'';
		statement += firstName + '\',';
		statement += '\'' + lastName + '\',';
		statement += '\'' + city + '\',';
		statement += '\'' + state + '\',';
		statement += '\'' + street + '\',';
		statement += '\'' + zipcode + '\',';
		statement += '\'' + username + '\',';
		//bcrypt.hash(password, 10, function(err, bcrpytedPassword) {
			
        //});
       // console.log(password);
		statement += '\'' + password + '\');';
		console.log(statement);   

		req.authentication.userTemp = username;
		req.authentication.fullName = firstName + ' ' + lastName;

		connection.query(statement);

		connection.query('Select Customer_id from customer where username = \'' + username + '\'', function(err, rows, fields){


					//db.setSession(rows[0].Customer_id);
					req.authentication.user = rows[0].Customer_id;
					console.log(req.authentication.user); 
					res.redirect('/creditcard');
					//console.log(rows[0].Customer_id);
		});
 

		


});

module.exports = router;

