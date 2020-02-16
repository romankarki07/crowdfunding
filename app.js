var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var profile = require('/routes/profile');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var expressValidator = require('express-validator');
const session = require('express-session');

app.use(expressValidator());
app.use(session({secret:'masdsdsx', saveUninitialized: true, resave: true,
cookie: {
	secure:false,
    maxAge: 1000 * 60 * 60 * 24 * 7
},
}));
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
