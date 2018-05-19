// https://www.youtube.com/watch?v=JEnGFGckk8A

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');

var app = express();

var port = 8080;
var url	= "https://www.pinterst.com/pin/16395986122172500/";


request(url, function(err, res, body){
	var pin = {};
	var $ = cheerio.load(body);

	var img = $("meta[itemprop = 'image']").get(1);
	var $img = $(img).attr('content');
	var $desc = $("meta[itemprop = 'text']").attr('content');

	var pin = {
		img: $img,
		desc: $desc,
		url: url
	};
	console.log("scraped: ", pin);
});

app.listen(port, function(){
	console.log('*** Server is listening on'+port);
});
