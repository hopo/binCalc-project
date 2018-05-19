//require
var express=require('express');
var jade=require('jade');
var bodyParser=require('body-parser');
var OrientDB=require('orientjs');

//variable
var app=express();
var server=OrientDB({
	host:'localhost',
	port:2424,
	user:'root',
	password:''
});
var db=server.use('o2');

//set
app.set('views','./views_orientdb');
app.set('view engine','jade');
app.locals.pretty=true;
app.use(bodyParser.urlencoded({extended:false}));

//body
app.listen(3000,function(){
	console.log(' * connected to port 3000 * ');
});
app.get('/',function(req,res){
	res.redirect('/topic');
});
app.get('/topic',function(req,res){
	var sql='SELECT FROM `topic`';
	db.query(sql).then(function(topics){
		res.render('view',{topics:topics});
	});
});
app.get('/topic/add',function(req,res){
	var sql='SELECT FROM `topic`';
	db.query(sql).then(function(topics){
		res.render('add',{topics:topics});
	});
});
app.post('/topic/add',function(req,res){
	var title=req.body.title;
	var description=req.body.description;
	var author=req.body.author;
	var sql='INSERT INTO `topic`(title,description,author) VALUES(:tit,:des,:aut)';
	db.query(sql,{params:{
			tit:title,
			des:description,
			aut:author
		}
	}).then(function(results){
		var rid=encodeURIComponent(results[0]['@rid']);
		res.redirect('/topic/'+rid);
	});
});
app.get('/topic/:id',function(req,res){
	var sql='SELECT FROM `topic`';
	db.query(sql).then(function(topics){
		var id=req.params.id;
		if(id){
			var sql2='SELECT FROM `topic` WHERE @rid=:rid';
			db.query(sql2,{params:{
					rid:id
				}
			}).then(function(topic){
				console.log(topic);
				res.render('view',{topics:topics,topic:topic[0]});
			});
		}else{
			res.render('view',{topics:topics});
		}
	});
});
app.get('/topic/:id/edit',function(req,res){
	var sql='SELECT FROM `topic`';
	var id=req.params.id;
	db.query(sql).then(function(topics){
		var sql2='SELECT FROM `topic` WHERE @rid=:rid';
			db.query(sql2,{params:{			
					rid:id
				}
			}).then(function(topic){
				console.log(topic);
				res.render('edit',{topics:topics,topic:topic[0]});
			});
	});
});
app.post('/topic/:id/edit',function(req,res){
	var sql='UPDATE `topic` SET title=:t,description=:d,author=:a WHERE @rid=:rid';
	var id=req.params.id;
	var title=req.body.title;
	var description=req.body.description;
	var author=req.body.author;
	db.query(sql,{params:{
			t:title,
			d:description,
			a:author,
			rid:id
		}
	}).then(function(topics){
		var rid=encodeURIComponent(id);
		res.redirect('/topic/'+rid);
	});
});
app.get('/topic/:id/delete',function(req,res){
	var sql='SELECT FROM `topic`';
	var id=req.params.id;
	db.query(sql).then(function(topics){
		var sql2='SELECT FROM `topic` WHERE @rid=:rid';
		db.query(sql2,{params:{
				rid:id
			}
		}).then(function(topic){
			console.log(topic);
			res.render('delete',{topics:topics,topic:topic[0]});
		});
	});
});
app.post('/topic/:id/delete',function(req,res){
	var sql='DELETE FROM topic WHERE @rid=:rid';
	var id=req.params.id;
	db.query(sql,{params:{
			rid:id
		}
	}).then(function(topics){
		res.redirect('/topic/');
	});
});