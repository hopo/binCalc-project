var express=require('express');
var bodyParser=require('body-parser');
var mysql=require('mysql');
var session=require('express-session');
//var FileStore=require('session-file-store')(session);
var MySQLStore=require('express-mysql-session')(session);
//var bkfd2Password=require('pbkdf2-password');

var app=express();
var conn=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'12344321',
	database:'o2'
});
//conn.connect();
//var hasher=bkfd2Password();

// app.locals.pretty=true;
// app.set('view engine','jade');
// app.set('views','./views_multi_user');
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

app.listen('3000',function(){
	console.log('* Connected to port 3000 *');
});

app.get('/',function(req,res){
	res.redirect('/count')
});
app.get('/count',function(req,res){
	if(req.session.count){
		req.session.count++;
	}else{
		req.session.count=1;
	}
	res.send('count: '+req.session.count+`<a href="/welcome"> >>></a>`);
});
app.get('/welcome',function(req,res){
	if(req.session.displayName){
		res.send(`
			<h1>HELLO, ${req.session.displayName}</h1>
			<a href="/auth/logout">logout</a>
		`);
	}else{
		res.send(`
			<h1>welcome</h1>
			<div><a href="/auth/login">>login<</a></div>
			<div><a href="/auth/register">>register<</a></div>
		`);
	}
});
app.get('/auth/register',function(req,res){
	var output=`
		<h1>Register</h1>
		<form action="/auth/register" method="post">
			<p>
				<input type="text" name="username" placeholder="username">
			</p>
			<p>
				<input type="password" name="password" placeholder="password">
			</p>
			<p>
				<input type="text" name="displayName" placeholder="displayName">
			</p>
			<p>
				<input type="submit">
			</p>
	`;
	res.send(output);
});
app.post('/auth/register',function(req,res){
	var user=req.body.username;
	var pass=req.body.password;
	var disp=req.body.displayName;
	//var salt:salt;
	var sql='INSERT INTO `users`(username,password,displayName) VALUES(?,?,?)';
	var params=[user,pass,disp];
	conn.query(sql,params,function(err,row){
		if(err){
			console.log(err);
			res.status(500).send('ERROR! '+`<a href="/auth/register"> <<<</a>`)
		}else{
			req.session.displayName=req.body.displayName;
			req.session.save(function(){
				res.redirect('/welcome')
			})
		}
	});
});
app.get('/auth/login',function(req,res){
	var output=`
		<h1>LOGIN</h1>
		<form action="/auth/login" method="post">
			<p>
				<input type="text" name="username" placeholder="username" autofocus>
			</p>
			<p>
				<input type="password" name="password" placeholder="password">
			</p>
			<p>
				<input type="submit">
			</p>
		</form>
	`
	res.send(output);
});
app.post('/auth/login',function(req,res){
	var user=req.body.username;
	var pass=req.body.password;
	var sql='SELECT * FROM `users` WHERE username=?';
	
});
app.post('/auth/login',function(req,res){
	var user=req.body.username;
	var pass=req.body.password;
	var sql='SELECT * FROM `users` WHERE username=?';
	conn.query(sql,[user],function(err,row){
		if(err){
			console.log(err);
			res.status(500).send('ERROR! '+`<a href="/auth/register"> <<<</a>`)
		}else{
			if(pass===row[0].password){
				req.session.displayName=row[0].displayName;
				req.session.save(function(){
					res.redirect('/welcome');
				});
			}else{
				res.send('Wrong password. <a href="/auth/login">login</a>');
			}
		}
	})
});
app.get('/auth/logout',function(req,res){
	delete req.session.displayName;
	res.redirect('/welcome');
});
