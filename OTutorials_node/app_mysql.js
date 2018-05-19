var app=require('./config/mysql/express')();
var passport=require('./config/mysql/passport')(app);
var auth=require('./routes/mysql/auth')(passport);
app.use('/auth',auth);

var topic=require('./routes/mysql/topic')();
app.use('/topic',topic);

app.listen(3000, function(){
	console.log('* Connected to port 3000 *');
});




app.get('/',function(req,res){
	res.redirect('/topic');
});
// app.get('/count',function(req,res){
// 	if(req.session.count){
// 		req.session.count++;
// 	}else{
// 		req.session.count=1;
// 	}
// 	res.send('count: '+req.session.count+'<a href="/welcome"> >>></a>');
// });
// app.get('/welcome',function(req,res){
// 	if(req.user&&req.user.displayName){ //req.user and deserial... study!!!
// 		res.send(`
// 			<h1>Hello, ${req.user.displayName}</h1>
// 			<a href="/auth/logout">logout</a>
// 		`);
// 	}else{
// 		res.send(`
// 			<h1>WELCOME</h1>
// 			<div><a href="/auth/login">login</a></div>
// 			<div><a href="/auth/register">register</a></div>
// 		`);
// 	}
// });
