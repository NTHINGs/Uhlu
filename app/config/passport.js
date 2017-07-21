// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../models/').User;

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport, port) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
            // done(null, user);
        User.findById(id)
        .then(function(user) {
            done(null, user);
        })
        .catch(function(err) {
            done(err, null);
        })
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : 'http://localhost:'+port+'/auth/facebook/callback',
        profileFields   : configAuth.facebookAuth.profileFields

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findAll({
                where: {
                    facebookid: profile.id
                 }
            })
            .then(function (user) {
                if (user[0]) {
                    return done(null, user[0]); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = {};

                    // set all of the facebook information in our user model
                    newUser.cum = "";
                    newUser.seccion = "";
                    newUser.grupo = "";
                    newUser.provincia = "";
                    newUser.facebookid    = profile.id; // set the users facebook id                   
                    newUser.facebooktoken = token; // we will save the token that facebook provides to the user  
                    newUser.facebookname  = (profile.name.givenName || "") + " " + (profile.name.middleName || "") + " " +  (profile.name.familyName || ""); // look at the passport user profile to see how names are returned
                    newUser.facebookemail = profile.emails[0].value;

                    // newUser.facebookemail = profile.emails[0].value; // facebook can return multiple emails so we'll take the first                
                    // return done(null, newUser);
                    // save our user to the database
                    User.create(newUser)
                      .then(function (newUser) {
                        return done(null, newUser);
                      })
                      .catch(function (error){
                        throw err
                      });
                }
            })
            .catch(function (error){
              return done(error);
            });
        });

    }));

};