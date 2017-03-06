var router = require('express').Router()
	, conn = require('../config/db');

router.get('/', function(req, res){
	var sql = 'SELECT id, title FROM `topic`';
	conn.query(sql, function(err, rows, fields){
		res.render('view', {topics: rows, user: req.user});
	});
});

router.get('/add', function(req, res){
	var sql = 'SELECT id, title FROM `topic`';
	conn.query(sql, function(err, rows, fields){
		if(err){
			console.log(err);
			res.status(500).send('Internal server error.');
		}else{
			res.render('add', {topics: rows, user: req.user}) // user: req.user!!
		}
	});
});
router.post('/add', function(req, res){
	var tit = req.body.title
		, des = req.body.description
		, aut = req.body.author;
	var sql = 'INSERT INTO `topic` (title, description, author) VALUES (?, ?, ?)';
	var params = [tit, des, aut];
	conn.query(sql, params, function(err, row, fields){
		if(err){
			console.log(err);
			res.status(500).send('Internal server error.');
		}else{
			res.redirect('/topic/'+row.insertId);
		}
	});
});
router.get('/:id', function(req, res){
	var sql = 'SELECT id, title FROM `topic`';
	conn.query(sql, function(err, rows, fields){
		var id = req.params.id;
		var sql2 = 'SELECT * FROM `topic` WHERE id = ?';
		conn.query(sql2, [id], function(err, row, fields){
			if(err){
				console.log(err);
				res.status(500).send('Internal server error.');
			}else{
				res.render('view', {topics: rows, topic: row[0], user: req.user});
			}
		});
	});
});
router.get('/:id/edit', function(req, res){
	var sql = 'SELECT id, title FROM `topic`';
	conn.query(sql, function(err, rows, fields){
		var id = req.params.id;
		if(id){
			var sql2 = 'SELECT * FROM `topic` WHERE id=?';
			conn.query(sql2, [id], function(err, row, fields){
				res.render('edit', {topics: rows, topic: row[0], user: req.user});
			});
		}else{
			console.log('THERE IS NO ID');
			res.status(500).send('Internal server error.');
		}
	});
});
router.post('/:id/edit', function(req, res){
	var tit = req.body.title
		, des = req.body.description
		, aut = req.body.author
		, id = req.params.id;
	var sql = 'UPDATE `topic` SET title=?, description=?, author=? WHERE id=?';
	var params = [tit, des, aut, id];
	conn.query(sql, params, function(err, row, fields){
		if(err){
			console.log(err);
			res.status(500).send('INTERNAL SERVER ERROR');
		}else{
			res.redirect('/topic/'+id);
		}
	});
});
router.get('/:id/delete', function(req, res){
	var sql = 'SELECT id, title FROM `topic`';
	var id = req.params.id;
	conn.query(sql, function(err, rows, fields){
		var sql = 'SELECT * FROM `topic` WHERE id=?';
		conn.query(sql, [id], function(err, row, fields){
			if(err){
				console.log(err);
				res.status(500).send('INTERNAL SERVER ERROR');
			}else{
				if(row.length === 0){
					console.log('THERE IS NO RECORD');
					res.status(500).send('Internal server error.');
				}else{
					res.render('delete', {topics: rows, topic: row[0], user: req.user})
				}
			}
		});
	});
});
router.post('/:id/delete', function(req, res){
	var id = req.params.id;
	var sql = 'DELETE FROM `topic` WHERE id=?';
	conn.query(sql, [id], function(err, row, fields){
		res.redirect('/topic');
	});
});


module.exports = router;
