// dobest.io

var request = require('request');
var cheerio = require("cheerio");

var url = "http://www.assembly.go.kr/assm/memact/congressman/memCond/memCondListAjax.do?rowPerPage=1000";

request(url, function(err, res, body){
	if(err) {throw err};

	var $ = cheerio.load(body);

	var postElements = $("section.posts section.post");
	postElements.each(function(){
		var postTitle = $(this).find("h1").text();
		var postUrl = $(this).find("h1 a").attr("href");
	});
});
