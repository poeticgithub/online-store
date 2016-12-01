var express = require('express');
var router = express.Router();
var path = require('path');
// var temp = require("app").temp;




// define the homepage route
router.get('/', function(req, res) {
  return res.sendFile(path.join(__dirname , 'index.html'));
  });



router.post('/', function(req, res){
	console.log(req.body);
})

//define specific page in website
router.get('/shoppingpage', function(req, res) {
 res.sendFile(path.join(__dirname, 'shoppingpage.html'));
});


module.exports = router;

