// https://www.youtube.com/watch?v=myLfVoSjLAw

var request = require('request')
	, cheerio = require('cheerio')
	, fs = require('fs');

var url = 'https://unsplash.com/search?utf8%E2%9C%93&keyword=cat&button=';
var images = [];

request(url, function(err, res, body){
	if(!err && res.statusCode === 200){
		var $ = cheerio.load(body);
		$('img', 'div.photo-grid').each(function(){
			var img = $(this).attr('src');
			images.push(img);
		});
		for(var i = 0; i < images.length; i++){
			request(images[i]).pipe(fs.createWriteStream('images/cat' + i + '.jpg'));
		};
	};
});
