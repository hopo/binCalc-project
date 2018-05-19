var express=require('express');
var bodyParser=require('body-parser');
var session=require('express-session');
//var FileStore=require('session-file-store')(session);
var md5=require('md5')

var app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
	secret:'fiw392jfl#^$fks',
	resave:false,
	saveUninitialized:true,
	store:new FileStore()
}));

app.listen('3000',function(){
	console.log(' * Connected to port 3000 * ');
});

app.get('/count',function(req,res){
	if(req.session.count){
		req.session.count++;
	}else{
		req.session.count=1;
	}
	res.send('count : '+req.session.count);
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
	var salt='fasjh83fsdu';
	var user=
		{
			username:'harpa',
			password:'be7eac5171b223a7c1be29d09f3a5c93',
			displayName:'Harpa'
		};
	var uname=req.body.username;
	var pwd=req.body.password;
	if(uname===user.username&&md5(pwd+salt)===user.password){
		req.session.displayName=user.displayName;
		res.redirect('/welcome');
	}else{
		res.send('who are you? <a href="/auth/login">login</a>');
	}
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
			<a href="/auth/login">login</a>
		`);
	}
});
app.get('/auth/logout',function(req,res){
	delete req.session.displayName;
	res.redirect('/welcome');
});
