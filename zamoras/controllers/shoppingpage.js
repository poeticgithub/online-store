var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');



//define the root shopping page route
router.get('/', function (req,res) {
  res.render('shoppingpage');
});


//process a submitted search form
router.post('/', function(req,res) {

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 't430',
    database: 'zamoras'
});

connection.connect();
console.log(req.body.search);
 connection.query('Select * from inventory', function (err, rows, fields){
	 for (var i in rows) {
            if  (req.body.search == rows[i].ProductName){
            	console.log('succcessfully found what you are looking for');
            }
            else {
                res.render('shoppingpage');
                console.log('we do not have what youre looking for');
            }  
     }
  connection.end();
 });

});

module.exports = router;