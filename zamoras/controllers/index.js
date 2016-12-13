var express = require('express');
const router = express.Router();
var path = require('path');

router.use('/login', require('./login'));
router.use('/shoppingpage', require('./shoppingpage'));
router.use('/signup', require('./signup'));
router.use('/shoppingcart', require('./shoppingcart'));
router.use('/creditcard', require('./creditcard'));
router.use('/checkout', require('./checkout'));


// define the homepage route
router.get('/', function(req, res) {
	if(req.authentication.user)
	{
		var user = true
		var name = req.authentication.fullName;
		return res.render('homepage', {user , name});
	}
	else
  		return res.render('homepage');
 });

router.get('/logout', function (req, res){
	req.authentication.reset();
	res.render('homepage');
});


// process a submitted form
router.post('/', function(req, res) {
     console.log(req.body.Username);
 });



module.exports = router;

