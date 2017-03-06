var mysql = require('mysql');
var conn = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '12344321',
	database: 'o2'
});

conn.connect();

module.exports = conn;
