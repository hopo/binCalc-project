var express=require('express');
var bodyParser=require('body-parser');
var session=require('express-session');
//var FileStore=require('session-file-store')(session);
var bkfd2Password=require('pbkdf2-password');

var app=express();
var hasher=bkfd2Password();

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
	secret:'fiw392jfl#^$fks',
	resave:false,
	saveUninitialized:true,
	store:new FileStore()
}));

var users=[
	{
		username:'harpa',
		password:'YStHm8+OAUsi04snc8n1FxaRhmQM/SOQDtkQl4RLuUAOmeOTnTvrwMXNoVKJTKTv4+8BqdCBtRzWiRSQSWZT2eiz5Bd18h7QnozjZuS06XF5af5FryjyPN5HVVDJxYyxmbb/l10dMfYcxAc8PmpMTdpOi6pXtOCBKSj8NWYE/SI=',
		salt:'3SW3VCi3mytCrTK+ghWVfK0bkuHvaR8Bx4X9J7BgwMmdc8KD6I109nsNsShEg8O/pBZlk2D4ehh2bQZb0yBhJg==',
		displayName:'Harpa'
	}
];

app.get('/count',function(req,res){
	if(req.session.count){
		req.session.count++;
	}else{
		req.session.count=1;
	}
	res.send('count : '+req.session.count);
});
app.get('/auth/logout',function(req,res){
	delete req.session.displayName;
	res.redirect('/welcome');
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


app.listen('3000',function(){
	console.log(' * Connected to port 3000 * ');
});