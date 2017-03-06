var express = require('express')
	,	bodyParser = require('body-parser')
	, session = require('express-session')
	, MySQLStore = require('express-mysql-session')(session);

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
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: '12344321',
		database: 'o2'
	})
}));

module.exports = app;
