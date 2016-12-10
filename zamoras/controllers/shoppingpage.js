var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var db = require('../db');

var testing = db.isSessioned(); //Bool to check if the user has logged in or not


var send = true;

//define the root shopping page route
router.get('/', function (req,res) {
  res.render('shoppingpage');
  
});


//process a submitted search form
router.post('/', function(req,res) 
{

// var testing = db.isSessioned();

  var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 't430',
      database: 'zamoras'
  });

  connection.connect();
  console.log(req.body.search);
  connection.query('Select * from inventory where ProductName = \'' + req.body.search + '\'', function (err, rows, fields)
   {

    if(rows[0] != undefined)
    {
  	 for (var i in rows)
      { 
          console.log('Product_id: ' + rows[i].Product_id + ' ProductName: ' + rows[i].ProductName);        
         
      }
      
        res.render('shoppingpage', {rows});
    }

    else
    {
      res.render('shoppingpage', {testing});
      console.log('Did not find what you were looking for');
    } 

    
    connection.end();
   });

});



module.exports = router;