var express = require('express');
var request = require('request');

var app = express();

var url = "http://www.assembly.go.kr/assm/memact/congressman/memCond/memCondListAjax.do?rowPerPage=1000"

request(url, function(err, res, body){
	console.log(body);
});

app.listen(8000, function(){
	console.log("*** Connected to port 8000");
});
