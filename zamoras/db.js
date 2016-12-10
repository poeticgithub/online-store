var mysql = require('mysql');

var connection = mysql.createConnection({
			    host     : 'localhost',
			    user     : 'root',
			    password : 't430',
			    database : 'zamoras'
			});

var sessionUser;

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
	},

	setSession: function(customerID)
	{
		sessionUser = customerID;
	},

	getSession: function()
	{
		return sessionUser;
	}, 

	isSessioned: function()
	{
		return true;
	}
};
