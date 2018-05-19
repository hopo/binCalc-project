var express=require('express');
var bodyParser=require('body-parser');
var session=require('express-session');
//var FileStore=require('session-file-store')(session);
var MySQLStore=require('express-mysql-session')(session);
var bkfd2Password=require('pbkdf2-password');

var app=express();
var hasher=bkfd2Password();

app.set('view engine','jade');
app.set('views','./views_multi_user');
app.locals.pretty=true;
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
	secret:'fiw392jfl#^$fks',
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

var users=[
	{
		username:'harpa',
		password:'YStHm8+OAUsi04snc8n1FxaRhmQM/SOQDtkQl4RLuUAOmeOTnTvrwMXNoVKJTKTv4+8BqdCBtRzWiRSQSWZT2eiz5Bd18h7QnozjZuS06XF5af5FryjyPN5HVVDJxYyxmbb/l10dMfYcxAc8PmpMTdpOi6pXtOCBKSj8NWYE/SI=',
		salt:'3SW3VCi3mytCrTK+ghWVfK0bkuHvaR8Bx4X9J7BgwMmdc8KD6I109nsNsShEg8O/pBZlk2D4ehh2bQZb0yBhJg==',
		displayName:'Harpa'
	}
];

app.get('/auth/login',function(req,res){
	res.render('login');
});
app.post('/auth/login',function(req,res){
	var uname=req.body.username;
	var pwd=req.body.password;
	for(var i=0;i<users.length;i++){
		var user=users[i];
		if(uname===user.username){
			return hasher({password:pwd,salt:user.salt},function(err,pass,salt,hash){
				if(hash===user.password){
					req.session.displayName=user.displayName;
					req.session.save(function() {
						res.redirect('/welcome')
					});
				}else{
					res.send('who are you? <a href="/auth/login">login</a>');
				}
			});
		}
	}
});
app.get('/auth/register',function(req,res){
	res.render('register');
});
app.post('/auth/register',function(req,res){
	hasher({password:req.body.password}, function(err,pass,salt,hash){
		var user={
			username:req.body.username,
			password:hash,
			salt:salt,
			displayName:req.body.displayName
		};
		users.push(user);
		req.session.displayName=req.body.displayName;
		req.session.save(function(){
			res.redirect('/welcome')
		});
	})
});
app.get('/count',function(req,res){
	if(req.session.count){
		req.session.count++;
	}else{
		req.session.count=1;
	}
	res.send('count : '+req.session.count);
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
			<div><a href="/auth/login">login</a></div>
			<div><a href="/auth/register">register</a></div>
		`);
	}
});
app.get('/auth/logout',function(req,res){
	delete req.session.displayName;
	res.redirect('/welcome');
});

app.listen('3000',function(){
	console.log(' * Connected to port 3000 * ');
});