module.exports=function(){
	var express=require('express');
	var bodyParser=require('body-parser');
	var session=require('express-session');
	var MySQLStore=require('express-mysql-session')(session);

	var app=express();

	app.locals.pretty=true;
	app.set('view engine','jade');
	app.set('views','./views/mysql');

	app.use(bodyParser.urlencoded({extended:false}));
	app.use(session({
		secret:'secretstrings',
		resave:false,
		saveUninitialized:true,
		store:new MySQLStore({
			host:'localhost',
			port:3306,
			user:'root',
			password:'12344321',
			database:'o2'
		})
	}));
	return app;
}