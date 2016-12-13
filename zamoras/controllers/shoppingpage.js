var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var db = require('../db');
//var blobUtil = require('blob-util');

var testing = db.isSessioned(); //Bool to check if the user has logged in or not
var send = true;
var cartCount = 0;

var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 't430',
      database: 'zamoras'
  });

//define the root shopping page route
router.get('/', function (req,res) {
  
    console.log("made it here " + req.authentication.user);
    cartCount = req.authentication.count;

    if(req.authentication.search)
    {
        console.log('yay');
        rows = req.authentication.search;
       
        res.render('shoppingpage', {rows, cartCount});
    }
    else if(req.authentication.user)
    {

      connection.query('Select Product_id, Cost, imgsrc, ProductName from inventory', function(err, rows, fields)
      {
          res.render('shoppingpage', {cartCount, rows});
      });

      
    }
    else
      res.redirect('/login');


});


//process a submitted search form
router.post('/', function(req,res) 
{

 
  console.log('Still under user: ' + req.authentication.user);

  //connection.connect();
  console.log(req.body.search);
  connection.query('Select * from inventory where ProductName = \'' + req.body.search + '\'', function (err, rows, fields)
   {

    if(rows[0] != undefined)
    {
  	 for (var i in rows)
      { 
          console.log('Product_id: ' + rows[i].Product_id + ' ProductName: ' + rows[i].ProductName);        
         
      }
      
        res.render('shoppingpage', {rows, cartCount});
    }

    else
    {
      connection.query('Select Product_id, Cost, imgsrc, ProductName from inventory', function(err, rows, fields)
      {
          var noMatch = true;
          res.render('shoppingpage', {cartCount, rows, noMatch});
          console.log('Did not find what you were looking for');
      });
      
      
    } 

    
    //connection.end();
   });

});

router.post('/cart', function(req,res) 
{

  console.log('Still under user: ' + req.authentication.user);
  for(var i in req.authentication.cart)
    console.log (req.body.cart[i]);

    connection.query('Select Product_id, Cost, imgsrc from inventory where Product_id = \'' + req.body.cart + '\'', function (err, rows, fields)
   {

    if(rows[0] != undefined)
    {
 
          console.log('Product_id: ' + rows[0].Product_id);
          var name = rows[0].ProductName;
          var price = rows[0].Cost;
          var picture = rows[0].imgsrc;
        
        
        // req.authentication.cart[req.authentication.count] = rows[0];
        // console.log("Cart items: " + req.authentication.cart[req.authentication.count])
        // req.authentication.count ++;

        req.authentication.cart[req.authentication.count] = rows[0];
        req.authentication.quantity[req.authentication.count] = 1;
        req.authentication.count++;
        console.log(req.authentication.cart);
        // req.authentication.cart += rows[0];
        // console.log(req.authentication.cart);

      
        return res.redirect('/shoppingcart');
    }

    else
    {
      res.render('shoppingpage', {testing});
      console.log('We do not have any more of that item. Cannot add to cart');
    } 

    
    //connection.end();
  });

});

router.post('/womenssearch', function(req, res)
{


    var statement = 'Select Product_id, ProductName, Cost, imgsrc from inventory where Gender = \'' + 'F' + '\' and ProductName = \'' + req.body.search + '\'';
    connection.query(statement, function(err, rows, fields)
    {
      
            console.log(statement);
            req.authentication.search = rows;
            res.redirect('/shoppingpage');
            //res.render('shoppingpage', {rows});
        
    });

});

router.post('/menssearch', function(req, res)
{


    var statement = 'Select Product_id, ProductName, Cost, imgsrc from inventory where Gender = \'' + 'M' + '\' and ProductName = \'' + req.body.search + '\'';
    connection.query(statement, function(err, rows, fields)
    {
      
            console.log(statement);
            req.authentication.search = rows;
            res.redirect('/shoppingpage');
            //res.render('shoppingpage', {rows});
        
    });

});

router.post('/unisearch', function(req, res)
{


    var statement = 'Select Product_id, ProductName, Cost, imgsrc from inventory where Gender = \'' + 'U' + '\' and ProductName = \'' + req.body.search + '\'';
    connection.query(statement, function(err, rows, fields)
    {
      
            console.log(statement);
            req.authentication.search = rows;
            res.redirect('/shoppingpage');
            //res.render('shoppingpage', {rows});
        
    });

});


module.exports = router;