var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var profile = require('/routes/profile');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var expressValidator = require('express-validator');
var expressSession = require('express-session');
app.use(expressValidator());
app.use(expressSession({secret:'max', saveUninitialized: false, resave: false}));
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
var router = require('./routers/routes');

// app.use('/profile',profile);


//routes of the library
app.use('/', router);

// app.get('/addproject', router.addproject);

//setting Port
app.listen(3000, function(){
	console.log('running port 3000');
});
