// require

var express = require('express'),
	bodyParser = require('body-parser'),
	mysql = require('mysql');

var db_config = require('./config/secret.json');


// var

var app = express();


// set

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', __dirname+'/views');


// app use

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


// listen

app.listen(3000, function(){
	console.log("* Connected To Port 3000 : app.js *");
});


// route - get & post

app.get('/', function(req, res){
	res.redirect('/o2'); // o2 in DBs
});

/*
app.get('/auth/login', function(req, res){
	res.render('login.jade');
});

app.get('/:dbUser', function(req, res){
	var dbUser = req.params.dbUser;
	if(dbUser === db_config.user){
		var conn = mysql.createConnection({
			host: db_config.host,
			port: db_config.port,
			user: dbUser,
			password: db_config.password
		});
		// conn.connect();
		var sql = 'SHOW databases'
		conn.query(sql, function(err, rows, fields){
			if(err){
				console.log(err);
			}else{
				console.log(rows);
				res.render('databases.jade', {dbUser: dbUser, dbs: rows});
			}
		});
	}else{
		// console.log("Error");
		res.send("No DB user - "+dbUser);
	}
});
*/


app.get('/:dbName', function(req, res){
	var	dbName = req.params.dbName;
	var conn = mysql.createConnection({
		host: db_config.host,
		port: db_config.port,
		user: db_config.user,
		password: db_config.password,
		database: dbName
	});	
	var sql = 'SHOW tables';
	conn.query(sql, function(err, rows, fields){
		if(err){
			res.send("Unknown database - "+dbName);
		}else{
			res.render('indb.jade', {dbName: dbName, tabs: rows, fields:fields});
		}
	});
});

app.get('/:dbName/:tabName', function(req, res){
	var	dbName = req.params.dbName;
	var	tabName = req.params.tabName;
	var conn = mysql.createConnection({
		host: db_config.host,
		port: db_config.port,
		user: db_config.user,
		password: db_config.password,
		database: dbName
	});
	var sql = 'SELECT * FROM '+tabName;
	conn.query(sql, function(err, rows, fields){
		console.log(rows);
		res.render('intab.jade', {dbName: dbName, tabName: tabName, qrys: rows});
	});
});

app.get('/:dbName/:tabName/add', function(req, res){
	var dbName = req.params.dbName;
	var	tabName = req.params.tabName;
	res.render('intab_add.jade', {dbName: dbName, tabName: tabName})
});

app.post('/:dbName/:tabName/add', function(req, res){
	var dbName = req.params.dbName;
	var	tabName = req.params.tabName;
	var tit = req.body.title;
	var des = req.body.description;
	var conn = mysql.createConnection({
		host: db_config.host,
		port: db_config.port,
		user: db_config.user,
		password: db_config.password,
		database: dbName
	});
	var sql = 'INSERT INTO '+tabName+' (title, description) VALUES (?, ?)';
	var params = [tit, des];
	conn.query(sql, params, function(err, row, fields){
		if(err){
			console.log(err);
			res.send('Internal server error.');
		}else{
			console.log(row);
			res.redirect('/'+dbName+'/'+tabName+'/'+row.insertId);
		};
	});
});

app.get('/:dbName/:tabName/:id', function(req, res){
	var	dbName = req.params.dbName;
	var	tabName = req.params.tabName;
	var id = req.params.id;
	var conn = mysql.createConnection({
		host: db_config.host,
		port: db_config.port,
		user: db_config.user,
		password: db_config.password,
		database: dbName
	});
	var sql = 'SELECT * FROM '+tabName;
	conn.query(sql, function(err, rows, fields){
		var sql2 = 'SELECT * FROM '+tabName+' WHERE id=?';
		conn.query(sql2, [id], function(err, row, fields){
			if(err){
				console.log(err);
				res.send('Internal server error.');
			}else{
				console.log(row);
				res.render('intab.jade', {dbName: dbName, tabName: tabName, qrys: rows, qry0: row[0]});
			};
		});
	});
});

app.get('/:dbName/:tabName/:id/edit', function(req, res){
	var dbName = req.params.dbName;
	var tabName = req.params.tabName;
	var id = req.params.id;
	var conn = mysql.createConnection({
		host: db_config.host,
		port: db_config.port,
		user: db_config.user,
		password: db_config.password,
		database: dbName
	});
	var sql = 'SELECT * FROM '+tabName+' WHERE id=?';
	conn.query(sql, [id], function(err, row, fields){
		if(err){
			console.log(err);
			res.send('Internal server error.');
		}else{
			console.log(row);
			res.render('intab_edit.jade', {dbName: dbName, tabName: tabName, qry0: row[0]});
		};		
	});
});
app.post('/:dbName/:tabName/:id/edit', function(req, res){
	var dbName = req.params.dbName;
	var tabName = req.params.tabName;
	var id = req.params.id;
	var tit = req.body.title;
	var des = req.body.description;
	var conn = mysql.createConnection({
		host: db_config.host,
		port: db_config.port,
		user: db_config.user,
		password: db_config.password,
		database: dbName
	});
	var sql = 'UPDATE '+tabName+' SET title=?, description=? WHERE id=?';
	var params = [tit, des, id];
	conn.query(sql, params, function(err, row, fields){
		if(err){
			console.log(err);
			res.send('Internal server error.');
		}else{
			res.redirect('/'+dbName+'/'+tabName+'/'+id);
		};
	});

});

app.get('/:dbName/:tabName/:id/delete', function(req, res){
	var dbName = req.params.dbName;
	var tabName = req.params.tabName;
	var id = req.params.id;
	var conn = mysql.createConnection({
		host: db_config.host,
		port: db_config.port,
		user: db_config.user,
		password: db_config.password,
		database: dbName
	});
	var sql = 'SELECT * FROM '+tabName+' WHERE id=?';
	conn.query(sql, [id], function(err, row, fields){
		if(err){
			console.log(err);
			res.send('Internal server error.');
		}else{
			res.render('intab_delete.jade', {dbName: dbName, tabName: tabName, qry0: row[0]});
		};
	});

});
app.post('/:dbName/:tabName/:id/delete', function(req, res){
	var dbName = req.params.dbName;
	var tabName = req.params.tabName;
	var id = req.params.id;
	var conn = mysql.createConnection({
		host: db_config.host,
		port: db_config.port,
		user: db_config.user,
		password: db_config.password,
		database: dbName
	});
	var sql = 'DELETE FROM '+tabName+' WHERE id=?';
	conn.query(sql, [id], function(err, row, fields){
		if(err){
			console.log(err);
			res.send('Internal server error');
		}else{
			console.log(row);
			res.redirect('/'+dbName+'/'+tabName);
		};
	});

});
