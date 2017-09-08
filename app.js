var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var MemoryStore = require('session-memory-store')(session);
var models = require('./app/models/');

var app      = express();
var port     = process.env.PORT || 8080;
var env      = process.env.NODE_ENV || 'development';

var passport = require('passport');
var flash    = require('connect-flash');

app.use(morgan('dev')); // log
app.use(cookieParser()); // cookies
app.use(bodyParser.urlencoded({
	limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.set('view engine', 'ejs');

// passport
app.use(session({
    secret: 'siemprelistos',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore(),
 } )); // secret
require('./app/config/passport')(passport, env);
app.use(passport.initialize());
app.use(passport.session()); // sessions
app.use(flash());

app.use(function(req, res, next){
    res.locals.message = req.flash('message');
    res.locals.success = req.flash('success');
    req.flash();
    next();
});

// routes ======================================================================
require('./app/routes.js')(app, passport, models, port);

// launch ======================================================================
app.listen(port);
console.log('La magia pasa en el puerto ' + port);
