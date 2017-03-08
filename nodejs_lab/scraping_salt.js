//http://blog.saltfactory.net/web-scraping-using-with-node-and-phantomjs/

var request = require('request');

var url = 'http://blog.saltfactory.net/web-scraping-using-with-node-and-phantomjs/'

request(url, function(err, res, html){
	if(err){throw err};
	console.log(html)
});
