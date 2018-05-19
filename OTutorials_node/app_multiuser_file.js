var express=require('express');
var bodyParser=require('body-parser');
var session=require('express-session');
//var FileStore=require('session-file-store')(session);
var sha256=require('sha256')

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
	var uname=req.body.username;
	var pwd=req.body.password;
	for(var i=0;i<users.length;i++){
		var user=users[i];
		if(uname===user.username&&sha256(pwd+user.salt)===user.password){
			req.session.displayName=user.displayName;
			res.redirect('/welcome');
		}

	}
	res.send('who are you? <a href="/auth/login">login</a>');
});
var users=[
	{
		username:'harpa',
		password:'f074ae13fadccfe24d1058792ef4b09e1712796ded4b8fa315e79e4aabcba9f6',
		salt:'32jhdsaf309',
		displayName:'Harpa'
	},
	{
		username:'amber',
		password:'430c0f76236e20837216e82b03d1812662e94b87d8de56763a3c8eb72b46d757',
		salt:'a53jhdgaf9m',
		displayName:'Amber'
	}
];
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
