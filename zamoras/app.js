const express = require('express');
const app = express();
var mysql = require('mysql');
const http = require('http');
var path = require('path');
var db = require('./db.js');

app.use(require('./controllers'));

app.use(express.static(__dirname + '/public'));
app.use('/img',express.static(path.join(__dirname, 'public/images')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));

var server = app.listen (3000, function (){

    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});


db.connectToDB();

db.newQuery('Select username from customer');

// connection.query('select username from customer', function (err, rows, fields){
//  	console.log(rows)});

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'zamora23',
//     database: 'zamoras'
// });

// connection.connect();


// connection.query('select username from customer', function (err, rows, fields){
// 	console.log(rows);

//     if (err) throw err;
// });

//connection.end();
