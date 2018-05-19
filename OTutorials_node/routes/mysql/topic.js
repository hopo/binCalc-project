module.exports=function(){
	var route=require('express').Router();
	var conn=require('../../config/mysql/db')();
	
	route.get('/add',function(req,res){
		var sql='SELECT id,title FROM `topic`';
		conn.query(sql,function(err,rows,fields){
			if(err){
				console.log(err);
				res.status(500).send('INTERNAL SERVER ERROR');
			}else{
				res.render('topic/add',{topics:rows,user:req.user}) //user:req.user!!
			}
		});
	});
	route.post('/add',function(req,res){
		var tit=req.body.title;
		var des=req.body.description;
		var aut=req.body.author;
		var sql='INSERT INTO `topic`(title,description,author) VALUES(?,?,?)';
		var params=[tit,des,aut];
		conn.query(sql,params,function(err,row,fields){
			if(err){
				console.log(err);
				res.status(500).send('INTERNAL SERVER ERROR');
			}else{
				res.redirect('/topic/'+row.insertId);
			}
		});
	});
	route.get('/',function(req,res){
		var sql='SELECT id,title FROM `topic`';
		conn.query(sql,function(err,rows,fields){
			res.render('topic/view',{topics:rows,user:req.user});
		});
	});
	route.get('/:id',function(req,res){
		var sql='SELECT id,title FROM `topic`';
		conn.query(sql,function(err,rows,fields){
			var id=req.params.id;
			var sql2='SELECT * FROM `topic` WHERE id=?';
			conn.query(sql2,[id],function(err,row,fields){
				if(err){
					console.log(err);
					res.status(500).send('INTERNAL SERVER ERROR');
				}else{
					res.render('topic/view',{topics:rows,topic:row[0],user:req.user});
				}
			});
		});
	});
	route.get('/:id/edit',function(req,res){
		var sql='SELECT id,title FROM `topic`'
		conn.query(sql,function(err,rows,fields){
			var id=req.params.id;
			if(id){
				var sql2='SELECT * FROM `topic` WHERE id=?';
				conn.query(sql2,[id],function(err,row,fields){
					res.render('topic/edit',{topics:rows,topic:row[0],user:req.user});	
				});
			}else{
				console.log('THERE IS NO ID');
				res.status(500).send('INTERNAL SERVER ERROR');
			}	
		});
	});
	route.post('/:id/edit',function(req,res){
		var tit=req.body.title;
		var des=req.body.description;
		var aut=req.body.author;
		var id=req.params.id;
		var sql='UPDATE `topic` SET title=?,description=?,author=? WHERE id=?';
		var params=[tit,des,aut,id];
		conn.query(sql,params,function(err,row,fields){
			if(err){
				console.log(err);
				res.status(500).send('INTERNAL SERVER ERROR');
			}else{
				res.redirect('/topic/'+id);
			}
		});
	});
	route.get('/:id/delete',function(req,res){
		var sql='SELECT id,title FROM `topic`'
		var id=req.params.id;
		conn.query(sql,function(err,rows,fields){
			var sql='SELECT * FROM `topic` WHERE id=?';
			conn.query(sql,[id],function(err,row,fields){
				if(err){
					console.log(err);
					res.status(500).send('INTERNAL SERVER ERROR');	
				}else{
					if(row.length===0){
						console.log('THERE IS NO RECORD');
						res.status(500).send('INTERNAL SERVER ERROR');
					}else{
						res.render('topic/delete',{topics:rows,topic:row[0],user:req.user})
					}
				}
			});
		});
	});
	route.post('/:id/delete',function(req,res){
		var id=req.params.id;
		var sql='DELETE FROM `topic` WHERE id=?';
		conn.query(sql,[id],function(err,row,fields){
			res.redirect('/topic');
		});
	});
	return route;
};