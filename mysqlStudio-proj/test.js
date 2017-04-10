var express = require('express'),
	bodyParser = require('body-parser'),
	cons = require('consolidate');

var app = express();

app.locals.pretty = true;
app.engine('html', cons.swig); // view engine for html
// app.set('view engine', 'jade') // view engine for jade
app.set('views', __dirname+'/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.listen(4000, '127.0.0.1', function(){
  console.log("* Connected To Port 4000 : test_app.js *");
})

app.get('/', function(req, res){
  res.redirect('/qstr');
});

app.get('/qstr', function(req, res){
	var dbn = req.query.dbName;
	res.render('test_qstr.jade', {dbn: dbn});
});
