var express = require('express');
const router = express.Router();
var path = require('path');
router.use('/login', require('./login'));
router.use('/shoppingpage', require('./shoppingpage'));
router.use('/signup', require('./signup'));
router.use('/shoppingcart', require('./shoppingcart'));
router.use('/creditcard', require('./creditcard'))




// define the homepage route
router.get('/', function(req, res) {
  return res.render('homepage');
 });


// process a submitted form
router.post('/', function(req, res) {
     console.log(req.body.Username);
 });


module.exports = router;

