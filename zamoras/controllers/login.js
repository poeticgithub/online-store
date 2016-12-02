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
    password: 't430',
    database: 'zamoras'
});

connection.connect();
console.log(req.body);
 connection.query('Select * from customer', function (err, rows, fields){
	 for (var i in rows) {
            if  (req.body.username == rows[i].username){
            	console.log('CONGRATULATIONS. YOU HAVE SUCCESSFULLY LOGGED IN');
            }
            else {
                res.render('login');
                console.log('Incorrect username or password');
            }  
     }
  connection.end();
 });

});

module.exports = router;

