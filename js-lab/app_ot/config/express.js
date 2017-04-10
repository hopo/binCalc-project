var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var db_config = require('./secrets');

var app = express();

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'secretstrings',
	resave: false,
	saveUninitialized: true,
	store: new MySQLStore({
		host: db_config.host,
		port: 3306,
		user: db_config.user,
		password: db_config.password,
		database: db_config.database
	})
}));

module.exports = app;
