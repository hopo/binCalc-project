var express=require('express');
var bodyParser=require('body-parser');
var session=require('express-session');
var FileStore=require('session-file-store')(session);
var bkfd2Password=require('pbkdf2-password');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;

var app=express();
var hasher=bkfd2Password();

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
	secret:'secretstrings',
	resave:false,
	saveUninitialized:true,
	store:new FileStore()
}));
app.use(passport.initialize());
app.use(passport.session()); //below that use session func.

passport.use(new LocalStrategy(
	function(username,password,done){
		var uname=username;
		var pwd=password;
		for(var i=0;i<users.length;i++){
			var user=users[i];
			if(uname===user.username){
				return hasher({password:pwd,salt:user.salt},
				function(err,pass,salt,hash){
					if(hash===user.password){
						console.log('LocalStrategy',user);
						done(null,user);
					}else{
						done(null,false);
					}
				});
			}
		}
		done(null,false);
	}
));
passport.use(new FacebookStrategy( //need App. enter 'https://developers.facebook.com'
	{
		clientID:'FACEBOOK_APP_ID',
		clientSecret:'FACEBOOK_APP_SECRET',
		callbackURL:"/auth/facebook/callback",
		profileFields:['id','email','gender','link','local','name','timezone','updated_time','verified','displayName'] //clarify (for scope)
	},
	function(accessToken,refreshToken,profile,done){
		console.log(profile);
		var authId='facebook:'+profile.id;
		for(vari=0;i<users.length;i++){
			var user=users[i];
			if(user.authId===authId){
				return done(null,user);
			}
		}
		var newuser={
			'authId':authId,
			'displayName':profile.displayName,
			'email':profile.emails[0].value
		};
		users.push(newuser);
		done(null,newuser)
	}
));

passport.serializeUser(function(user,done){
	console.log('serializeUser',user);
	done(null,user.authId); //set session
});
passport.deserializeUser(function(id,done){ //equal id and user.username
	console.log('deserializeUser',id);
	for(var i=0;i<users.length;i++){
		var user=users[i];
		if(user.authId===id){
			return done(null,user);
		}
	}
	done('There is no user.');
});

app.get('/',function(req,res){
	res.redirect('/count');
});
app.get('/count',function(req,res){
	if(req.session.count){
		req.session.count++;
	}else{
		req.session.count=1;
	}
	res.send('count: '+req.session.count+'<a href="/welcome"> >>></a>');
});
app.get('/welcome',function(req,res){
	if(req.user&&req.user.displayName){ //req.user and deserial... study!!!
		res.send(`
			<h1>HELLO, ${req.user.displayName}</h1>
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
var users=[
	{
		authId:'local:harpa',
		username:'harpa',
		password:'YStHm8+OAUsi04snc8n1FxaRhmQM/SOQDtkQl4RLuUAOmeOTnTvrwMXNoVKJTKTv4+8BqdCBtRzWiRSQSWZT2eiz5Bd18h7QnozjZuS06XF5af5FryjyPN5HVVDJxYyxmbb/l10dMfYcxAc8PmpMTdpOi6pXtOCBKSj8NWYE/SI=',
		salt:'3SW3VCi3mytCrTK+ghWVfK0bkuHvaR8Bx4X9J7BgwMmdc8KD6I109nsNsShEg8O/pBZlk2D4ehh2bQZb0yBhJg==',
		displayName:'Harpa'
	}
];
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
	hasher({password:req.body.password}, function(err,pass,salt,hash){
		var user={
			authId:'local:'+req.body.username,
			username:req.body.username,
			password:hash,
			salt:salt,
			displayName:req.body.displayName
		};
		users.push(user);
		req.login(user,function(){
			req.session.save(function(){
				res.redirect('/welcome')
			});
		//req.session.displayName=req.body.displayName;
		});
	})
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
		<a href="/auth/facebook">facebook</a>
	`
	res.send(output);
});
app.post('/auth/login',
	passport.authenticate('local',
		{
			successRedirect:'/welcome',
			failureRedirect:'/auth/login',
			failureFlash:false
		}
	)
);
app.get('/auth/facebook',
	passport.authenticate('facebook',
		{scope:'email'} //search 'facebook login scope'
	)
);
app.get('/auth/facebook/callback',
	passport.authenticate('facebook',
		{
			successRedirect:'/welcome',
			failureRedirect:'/auth/login'
		}
	)
);
app.get('/auth/logout',function(req,res){
	req.logout(); //logout() in passportjs
	req.session.save(function(){
			res.redirect('/welcome');
	});
});

app.listen('3000',function(){
	console.log('* Connected to port 3000 *');
});
