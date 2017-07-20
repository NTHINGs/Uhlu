#!/usr/bin/env node
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var MemoryStore = require('session-memory-store')(session);
var models = require('./app/models/');

var app      = express();
var port     = process.env.PORT || 8080;

var passport = require('passport');
var flash    = require('connect-flash');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.set('view engine', 'ejs');

// required for passport
app.use(session({
    secret: 'siemprelistos',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore(),
 } )); // session secret
require('./app/config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport, models); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('La magia pasa en el puerto ' + port);