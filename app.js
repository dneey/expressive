var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs')
;
var db = mongojs('express', ['users']);

var app = express();

//middleware
// var logger = function(req, res, next){
// 	console.log('logging');
// 	next();
// }
// app.use(logger);//using middleware. The order is importanrt

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static path for css and jquery files
app.use(express.static(path.join(__dirname, 'public')))

// Global errors
app.use(function(req, res, next){
	res.locals.errors = null;
	res.locals.title = 'customer';
	next();
})
//Express Validator middleware
app.use(expressValidator());
app.get('/', function(req, res){
	db.users.find(function (err, docs) {
		consol.log(docs);
		var title = 'customer';
		res.render('index',{
			title: title,
			users: docs
		});
})
});

app.post('/users/add', function(req, res){

	req.checkBody('first_name', 'First Name is required').notEmpty();
	req.checkBody('last_name', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();

	var errors= req.validationErrors();
	if (errors) {
		res.render('index',{
			title:'customers',
			users:users,
			errors:errors
		});
	}else{
	var newUser = {
	first_name :req.body.first_name,
	last_name :req.body.last_name,
	email :req.body.email
}
	}
	console.log(newUser);
})
app.listen(3000, function(){
	console.log('Server started on port 3000');
})
