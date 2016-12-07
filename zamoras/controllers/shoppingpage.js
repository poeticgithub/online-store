var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var name, price, pic;



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
var statement = 'Select * from inventory where ProductName = \'' + req.body.search + '\'' ;
 connection.query(statement, function (err, rows, fields){
      console.log(rows);
       for (var i in rows) { 
          if(rows[i] != undefined){      
              name = rows[i].ProductName;
              price = rows[i].Cost;
              pic = rows[i].ProductPicture;
              //console.log(name);
              res.render('results', {name, price, pic});            	
          }
        }

          
        if (rows[i] == undefined) {
              res.render('shoppingpage');
              console.log('we do not have what you are looking for');
        }
       
  connection.end();
  });
 
});

module.exports = router;