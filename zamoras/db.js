var mysql = require('mysql');

var connection = mysql.createConnection({
			    host     : '127.0.0.1',
			    user     : 'root',
			    password : 'root',
			    database : 'zamoras'
			});

module.exports = 
{
    connectToDB: function()
	{
		
		connection.connect(function(err) 
			{
   				 if (err) throw err;
			});

	},

	newQuery: function(statement)
	{
		connection.query(statement, function(err, rows, fields){
			console.log(rows);
		});
	}
};
