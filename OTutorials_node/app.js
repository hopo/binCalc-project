var express=require('express');
var bodyParser=require('body-parser');
var app=express();

app.locals.pretty = true;
app.set('view engine','jade');
app.set('views', './views'); //Default. Omission is possible.

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.listen(3000,function(){
	console.log('Connected port 3000!');
});
app.get('/',function(req,res){
	res.send('<h1>welcome to my homepage\n</h1>');
});
app.get('/login',function(req,res){
	res.send('please login..\n');
});
app.get('/mountain',function(req,res){
	res.send('<p>High, Higher, HIGHEST!</p><img src="/mountain.jpg">');
});
app.get('/dynamic',function(rew,res){
	var lis='';
	for(var i=0;i<5;i++){
		lis=lis+'<li>coding</li>';
	};
	var time=Date();
	var output=`
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
			</head>
			<body>
				<p>Hello This is Dynamic(.html).</p>
				<ul>
					${lis}
				</ul>
				${time}
			</body>
		</html>
		`;
	res.send(output);
});
app.get('/template',function(req,res){
	res.render('temp',{_title:'Jade-temp.html',time:Date()});
});
app.get('/topic/:id',function(req,res){
	var topics=[
		'JavaScript is .....',
		'nodejs is .....',
		'express is .....'
	];
	var output=`
		<a href="/topic/0">JavaScript</a><br>
		<a href="/topic/1">nodejs</a><br>
		<a href="/topic/2">express</a><br>
		<br>
		${topics[req.params.id]}
	`;
	res.send(output);
});
app.get('/topic/:id/:mode',function(req,res){
	res.send(req.params.id+', '+req.params.mode);
});
app.get('/form',function(req,res){
	res.render('form');
});
app.get('/form_reciever',function(req,res){
	var title=req.query.title;
	var descr=req.query.descr;
	res.send('Ge. '+title+' is '+descr+'.');
});
app.post('/form_reciever',function(req,res){
	var title=req.body.title;
	var descr=req.body.descr;
	res.send('Po. '+title+' is '+descr+'.');
});
