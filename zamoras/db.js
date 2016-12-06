var mysql = require('mysql');

var connection = mysql.createConnection({
			    host     : 'localhost',
			    user     : 'root',
			    password : 'zamora23',
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
