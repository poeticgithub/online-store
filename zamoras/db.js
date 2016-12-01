var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'zamora23',
    database : 'zamoras'
});

connection.connect(function(err) {
    if (err) throw err;
});

connection.query('Select * from customer', function(err, rows, fields){
	console.log(rows);
})

module.exports = connection;