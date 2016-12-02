const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
var mysql = require('mysql');
const http = require('http');
var path = require('path');
var db = require('./db.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./controllers'));
app.use(express.static(__dirname + '/public'));
app.use('/img',express.static(path.join(__dirname, 'public/images')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/javascript',express.static(path.join(__dirname, 'public/javascript')));


app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);



var server = app.listen(3000, function (){

    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});


db.connectToDB();

db.newQuery('Select * from customer');
