// https://www.youtube.com/watch?v=JEnGFGckk8A

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');

var app = express();

var port = 8080;
var url	= "https://indeed.org";

request(url, function(err, res, body){
	var $ = cheerio.load(body);
	// var companyName = $('.company')
	// var companyNameText = companyName.text()

	$('.company').filter(function(){
		var companyName = $(this);
		companyNameText = companyName.text();
	});

	console.log(companyNameText)
});


app.listen(port, function(){
	console.log('*** Server is listening on'+port);
});
