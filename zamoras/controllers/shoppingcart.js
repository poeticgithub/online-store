var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var quantity = new Array();


// define the login route
router.get('/', function(req, res) 
{
	console.log(req.authentication.user);
	if(req.authentication.cart != undefined)
	{
		var items = new Array();
		var total = 0;
		var quantity = new Array();
		var subtotal = new Array();

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
				

				// if(quantity[i] > 1)
				// 	var cost = quantity * req.authentication.cart[i].Cost;
				// else
				// 	var cost = req.authentication.cart[i].Cost;

				//total += cost;
			}
		}

		total = total.toFixed(2);
		console.log("quantity array: " + quantity);
		return res.render('shoppingcart', {items, total, quantity})
	}

	else
	{
  		return res.render('shoppingcart');
	}
});


router.post('/delete', function (req, res)
{

	for(var i in req.authentication.cart)
	{
		if(req.authentication.cart[i])
			if(req.authentication.cart[i].Product_id == req.body.delete)
			{
				delete req.authentication.cart[i];
				req.authentication.count--;
			}
	}

	res.redirect('/shoppingcart');

});

router.post('/update', function(req, res)
{	

	console.log('New Quantity Entered: ' + req.body.quantity);
	for(var i in req.authentication.cart)
	{
		//quantity[i] = 1;
		if(req.authentication.cart[i])
			if(req.authentication.cart[i].Product_id == req.body.update)
			{
				req.authentication.quantity[i] = req.body.quantity;
			}
	}

	res.redirect('/shoppingcart');

});

module.exports = router;

