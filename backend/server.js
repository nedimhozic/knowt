var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var Promise = require('bluebird');

var index = require('./routes/index');
var user = require('./routes/user');
var task = require('./routes/task');
var contractor = require('./routes/contractor');

var config = require('./config');

var app = express();

var port = 8000;

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, './images/contractor')));

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(cookieParser());

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //res.set('Access-Control-Allow-Credentials', true);
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization,X-Requested-With, token');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/', index);
app.use('/api/user', user);
app.use('/api/task', task);
app.use('/api/contractor', contractor);

mongoose.Promise = Promise;
mongoose.connect(config.database);

app.listen(port, function(){
    console.log('Server started on port ' + port);
});

