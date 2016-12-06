var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');


// define the login route
router.get('/', function(req, res) {
  return res.render('login');
  });


//process a submitted login form
router.post('/', function(req,res) {

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'zamoras'
});

connection.connect();
console.log(req.body);
var statement = 'Select * from customer where username = \'' + req.body.username + '\' and password = \'' + req.body.password + '\'' ;
console.log(statement);

connection.query(statement, function (err, rows, fields){
	 
   console.log(rows);
   if(rows[0] != undefined)
   {
      res.redirect('/shoppingpage');
   }

   else
   {
      //something eventually 
   }
  connection.end();
 });

});

module.exports = router;

