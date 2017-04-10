var app = require('./config/express');
var	passport = require('./config/passport')(app);
var	auth = require('./routes/auth')(passport);
var	topic = require('./routes/topic');

app.use('/auth', auth);
app.use('/topic', topic);

app.get('/count', function(req, res){
	if(req.session.count){
		req.session.count++;
	}else{
		req.session.count=1;
	}
	res.send('count: '+req.session.count+'<p><a href="/topic">enter</a>');
});
app.get('/', function(req, res){
	res.redirect('/count');
});

app.listen(3000, function(){
	console.log('* CONNECTED TO PORT 3000 *');
});
