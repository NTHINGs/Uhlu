#!/usr/bin/env node
var express  = require('express');
var redirect = require("express-redirect");
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var MemoryStore = require('session-memory-store')(session);
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('Uhlu', 'uhlu', 's13mpr3l1st0s', {
//   host: 'localhost',
//   dialect: 'sqlite',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },

//   // SQLite only
//   storage: 'Uhlu.sqlite'
// });

// const User = sequelize.define('user', {
//   username: Sequelize.STRING,
//   birthday: Sequelize.DATE
// });

// sequelize.sync()
//   .then(() => User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   }))
//   .then(jane => {
//     console.log(jane.get({
//       plain: true
//     }));
//   });

var app      = express();
var port     = process.env.PORT || 8080;

var passport = require('passport');
var flash    = require('connect-flash');

var app = express();
// app.use(favicon(__dirname + '/assets/uhlu.ico'));
redirect(app);
// require('./config/passport')(passport);
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// required for passport
app.use(session({
    secret: 'siemprelistos',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore(),
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('La magia pasa en el puerto ' + port);