// https://www.youtube.com/watch?v=JEnGFGckk8A

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');

var app = express();

var port = 8000;
var url	= "https://google.com";

// Example 1
// request(url, function(err, res, body){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(body);
// 	};
// });

// Example 2
// var destination = fs.createWriteStream('./downloads/google.html');
// request(url)
// 	.pipe(destination);

//Example 3
// var destination = fs.createWriteStream('./downloads/google.html');
// request(url)
// 	.pipe(destination)
// 	.on('finish', function(){
// 		console.log('done');
// 	})
// 	.on('error', function(err){
// 		console.log(err);
// 	});


app.listen(port, function(){
	console.log('*** Server is listening on'+port);
});
