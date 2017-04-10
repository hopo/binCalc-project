// require
var express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MySQLStore = require('express-mysql-session')(session),
	mysql = require('mysql'),
	bkfd2Password = require('pbkdf2-password'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

var db_config = require('./config/secret.json');


// var
var app = express();
var conn = mysql.createConnection({
		host: db_config.host,
		port: db_config.port,
		user: db_config.user,
		password: db_config.password,
		database: db_config.database
	});
var hasher = bkfd2Password();

// set
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', __dirname+'/views_refer');
conn.connect();

// app use
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'secretstrings',
	resave: false,
	saveUninitialized: true,
	store: new MySQLStore({
		host: db_config.host,
		port: db_config.port,
		user: db_config.user,
		password: db_config.password,
		database: db_config.database
	})
}));
app.use(passport.initialize());
app.use(passport.session()); // below that use session function.

// passport use
passport.use(new LocalStrategy(
	function(username, password, done){
		var uname = username;
		var	pwd = password;
		var sql = 'SELECT * FROM `users` WHERE authId=?';
		conn.query(sql, ['local:'+uname], function(err, results){
			if(err){
				return done('There is no user.');
			}
			var user = results[0];
			return hasher({password: pwd, salt: user.salt}, function(err, pass, salt, hash){
				if(hash === user.password){
					console.log('LocalStrategy', user.authId);
					done(null, user);
				}else{
					done(null, false);
				}
			});
		});
	}
));

passport.serializeUser(function(user, done){
	console.log('serializeUser', user.displayName);
	done(null, user.authId); // set value into session
});
passport.deserializeUser(function(id, done){ // equal id and user.authId
	console.log('deserializeUser', id);
	var sql = 'SELECT * FROM `users` WHERE authID=?';
	conn.query(sql, [id], function(err, results){
		if(err){
			console.log(err);
			done('There is no user.');
		}else{
			done(null, results[0]);
		}
	});
});

// begin app
app.listen(3000, function(){
	console.log('* CONNECTED TO PORT 3000 *');
});

app.get('/', function(req,res){
	res.redirect('/count');
});
app.get('/count', function(req, res){
	if(req.session.count){
		req.session.count++;
	}else{
		req.session.count=1;
	}
	res.send('count: '+req.session.count+'<p><a href="/topic">enter</a>');
});

//auth
app.get('/auth/register', function(req, res){
	var sql = 'SELECT id, title FROM `topics`';
	conn.query(sql, function(err, topics, fields){
		res.render('register', {topics: topics});
	});
});
app.post('/auth/register', function(req, res){
	hasher({password: req.body.password}, function(err, pass, salt, hash){
		var user = {
			authId: 'local:'+req.body.username,
			username: req.body.username,
			password: hash,
			salt: salt,
			displayName: req.body.displayName
		};
		var sql = 'INSERT INTO `users` SET ?';
		conn.query(sql, user, function(err, results){
			if(err){
				console.log(err);
				res.status(500);
			}else{
				req.login(user, function(err){ // err?
					req.session.save(function(){
						res.redirect('/topic');
					});
				});
			}
		});
	});
});
app.get('/auth/login', function(req, res){
	var sql = 'SELECT id, title FROM `topics`';
	conn.query(sql, function(err, topics, fields){
		res.render('login',{topics: topics});
	});
});
app.post('/auth/login',
	passport.authenticate('local', {
		successRedirect: '/topic',
		failureRedirect: '/auth/login',
		failureFlash: false
	})
);
app.get('/auth/logout', function(req, res){
	req.logout(); // logout() in passportjs
	req.session.save(function(){
			res.redirect('/topic');
	});
});

//topic CRUD
app.get('/topic', function(req, res){
	var sql = 'SELECT id, title FROM `topics`';
	conn.query(sql, function(err, rows, fields){
		res.render('view', {topics: rows, user: req.user});
	});
});

app.get('/topic/add',function(req, res){
	var sql = 'SELECT id, title FROM `topics`';
	conn.query(sql, function(err, rows, fields){
		if(err){
			console.log(err);
			res.status(500).send('Internal server error.');
		}else{
			res.render('add', {topics: rows, user: req.user}) // user:req.user!!
		}
	});
});
app.post('/topic/add', function(req, res){
	var tit = req.body.title;
	var	des = req.body.description;
	var	aut = req.body.author;
	var sql = 'INSERT INTO `topics` (title, description, author) VALUES(?, ?, ?)';
	var params = [tit, des, aut];
	conn.query(sql, params, function(err, row, fields){
		if(err){
			console.log(err);
			res.status(500).send('Internal server error.');
		}else{
			res.redirect('/topic/'+row.insertId);
		}
	});
});
app.get('/topic/:id', function(req, res){
	var sql = 'SELECT id, title FROM `topics`';
	conn.query(sql, function(err, rows, fields){
		var id = req.params.id;
		var sql2 = 'SELECT * FROM `topics` WHERE id=?';
		conn.query(sql2, [id], function(err, row, fields){
			if(err){
				console.log(err);
				res.status(500).send('Internal server error.');
			}else{
				res.render('view', {topics: rows, topic: row[0], user: req.user});
			}
		});
	});
});
app.get('/topic/:id/edit', function(req, res){
	var sql='SELECT id, title FROM `topics`'
	conn.query(sql, function(err,rows,fields){
		var id = req.params.id;
		if(id){
			var sql2 = 'SELECT * FROM `topics` WHERE id=?';
			conn.query(sql2, [id], function(err, row, fields){
				res.render('edit', {topics: rows, topic: row[0], user: req.user});
			});
		}else{
			console.log('THERE IS NO ID');
			res.status(500).send('Internal server error.');
		}
	});
});
app.post('/topic/:id/edit', function(req, res){
	var tit = req.body.title,
	var	des = req.body.description;
	var	aut = req.body.author;
	var	id = req.params.id;
	var sql = 'UPDATE `topics` SET title=?, description=?, author=? WHERE id=?';
	var params = [tit, des, aut, id];
	conn.query(sql, params, function(err, row, fields){
		if(err){
			console.log(err);
			res.status(500).send('INTERNAL SERVER ERROR');
		}else{
			res.redirect('/topic/'+id);
		}
	});
});
app.get('/topic/:id/delete', function(req, res){
	var id = req.params.id;
	var sql = 'SELECT id, title FROM `topics`'
	conn.query(sql, function(err, rows, fields){
		var sql='SELECT * FROM `topics` WHERE id=?';
		conn.query(sql, [id], function(err, row, fields){
			if(err){
				console.log(err);
				res.status(500).send('INTERNAL SERVER ERROR');
			}else{
				if(row.length === 0){
					console.log('THERE IS NO RECORD');
					res.status(500).send('Internal server error.');
				}else{
					res.render('delete', {topics: rows, topic: row[0], user: req.user})
				}
			}
		});
	});
});
app.post('/topic/:id/delete', function(req, res){
	var id = req.params.id;
	var sql = 'DELETE FROM `topics` WHERE id=?';
	conn.query(sql, [id], function(err, row, fields){
		res.redirect('/topic');
	});
});
