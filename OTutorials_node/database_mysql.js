var mysql=require('mysql');
var conn=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'12344321',
	database:'o2'
});

conn.connect();
/*
//Read
var sql='SELECT * FROM topic';
conn.query(sql,function(err,rows,fields){
	if(err){
		console.log(err);
	}else{
		//console.log('rows',rows);
		//console.log('fields',fields);
		for(var i=0;i<rows.length;i++){
			console.log(rows[i].title);
		}
	}
});
*/
/*
//Create
var sql='INSERT INTO `topic`(title,description,author) VALUES(?,?,?)';
var params=['supervisor','watcher','overoad'];
conn.query(sql,params,function(err,rows,fields){
	if(err){
		console.log(err);
	}else{
		console.log(rows.insertId);
	}
});
*/
/*
//Update
var sql='UPDATE `topic` SET title=?,author=? WHERE id=?';
var params=['JavaScript','hp',1];
conn.query(sql,params,function(err,rows,fields){
	if(err){
		console.log(err);
	}else{
		console.log(rows);
	}
});
*/
//Delete
var sql='DELETE FROM `topic` WHERE id=?';
var params=[9];
conn.query(sql,params,function(err,rows,fields){
	if(err){
		console.log(err);
	}else{
		console.log(rows);
	}
});
conn.end();
