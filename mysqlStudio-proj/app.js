// require

var express = require('express');
var	bodyParser = require('body-parser');
var	mysql = require('mysql');

var db_config = require('./config/secret.json');


// variable


var conn;
var dbUser;
var dbName;
var tabName;

var app = express();
var connSet = function(){
	conn = mysql.createConnection({
		host: db_config.host,
		port: db_config.port,
		user: dbUser,
		password: db_config.password,
		database: dbName
	});
	return conn;
};

// set

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', __dirname+'/views');
// conn.connect();

// app use

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


// listen

app.listen(3000, function(){
	console.log("* Connected To Port 3000 : app.js *");
});


// route - get & post

app.get('/', function(req, res){
	dbUser = 'root';
	dbName = 'o2';
	connSet();
	res.redirect('/'+dbName); // o2 in DBs
});


/*
app.get('/auth/login', function(req, res){
	res.render('login.jade');
});

app.get('/:dbUser', function(req, res){
	var dbUser = req.params.dbUser;
	if(dbUser === db_config.user){
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
	tabName = req.params.tabName;
	var sql = 'SELECT * FROM '+tabName;
	conn.query(sql, function(err, rows, fields){
		var cols = [];
		for(i=0; i<fields.length; i++){
			colnames.push(fields[i].name);
		};		
		console.log(cols);
		res.render('intab.jade', {dbName: dbName, tabName: tabName, qrys: rows});
	});
});

app.get('/:dbName/:tabName/add', function(req, res){
	res.render('intab_add.jade', {dbName: dbName, tabName: tabName})
});

app.post('/:dbName/:tabName/add', function(req, res){
	var tit = req.body.title;
	var des = req.body.description;
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
	var id = req.params.id;
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
	var id = req.params.id;
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
	var id = req.params.id;
	var tit = req.body.title;
	var des = req.body.description;
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
	var id = req.params.id;
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
	var id = req.params.id;
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