var casper = require('casper').create({
	verbose: true,
	logLevel: 'error'
	// clientScripts: [];
});

var links = [];

function getLinks(){
	var links = document.querySelectorAll('.b_algo a');
	return Array.prototype.map.call(links, function(e){
		return e.getAttribute('href');
	});
};

casper.start('http://bing.com/', function(){
	this.fill('form[action="/search"]', {q:'caperjs'}, true);
});

casper.then(function(){
	links = this.evaluate(getLinks);

	// now search for 'phantomjs' by filling the form in again
	this.fill('form[action="/search"]', {q:'phantomjs'}, true);
});

casper.then(function(){
	links = links.concat(this.evaluate(getLinks));
});

casper.run(function(){
	// echo results in a readable fashion
	this.echo(links.length + 'links found:');
	this.echo('-' + links.join('\n - ')).exit();
});