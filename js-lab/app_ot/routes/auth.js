module.exports = function(passport){
	var bkfd2Password = require('pbkdf2-password');
	var router = require('express').Router();

	var conn = require('../config/db');

	var hasher = bkfd2Password();

	router.get('/register', function(req, res){
		var sql = 'SELECT id, title FROM `topics`';
		conn.query(sql, function(err, topics, fields){
			res.render('register', {topics: topics});
		});
	});
	router.post('/register', function(req, res){
		hasher({password: req.body.password}, function(err, pass, salt, hash){
			var user = {
				authId: 'local:'+req.body.username,
				username: req.body.username,
				password: hash,
				salt: salt,
				displayName: req.body.displayName
			};
			var sql = 'INSERT INTO `users` SET ?';
			conn.query(sql, user, function(err, results){
				if(err){
					console.log(err);
					res.status(500);
				}else{
					req.login(user, function(err){ // err?
						req.session.save(function(){
							res.redirect('/topic');
						});
					});
				}
			});
		});
	});
	router.get('/login', function(req, res){
		var sql = 'SELECT id, title FROM `topics`';
		conn.query(sql, function(err, topics, fields){
			res.render('login', {topics: topics});
		});
	});
	router.post('/login',
		passport.authenticate('local', {
			successRedirect: '/topic',
			failureRedirect: '/auth/login',
			failureFlash: false
		})
	);
	router.get('/logout', function(req, res){
		req.logout(); // logout() in passportjs
		req.session.save(function(){
				res.redirect('/topic');
		});
	});
	// router.get('/facebook',
	// 	passport.authenticate('facebook',
	// 		{scope:'email'} //search 'facebook login scope'
	// 	)
	// );
	// router.get('/facebook/callback',
	// 	passport.authenticate('facebook',{
	// 		successRedirect:'/topic',
	// 		failureRedirect:'/auth/login'
	// 	})
	// );
	return router;
};
