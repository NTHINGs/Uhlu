// var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy   = require('passport-local').Strategy;

// Model
var User = require('../models/').User;

// Variables
// var configAuth = require('./auth');

module.exports = function(passport, env) {

    // Serializar usuario a la sesion
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserializar usuario de la sesion
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

    // =========================================================================
    // LOCAL ===================================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({
            where: {
                email: email,
            }
        })
        .then(function(user) {
            if (!user)
                return done(null, false, req.flash('loginMessage', 'Ese usuario no existe!.'));

            if (!bcrypt.compareSync(password, user.password))
                return done(null, false, req.flash('loginMessage', 'Oops! contraseña incorrecta.'));

            return done(null, user);
        })
        .catch(function (error){
            return done(error);
        });

    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({
                where: {
                    email: email,
                }
            })
            .then(function(user) {
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'Ese Email Ya Existe En Uhlu.'));
                } else {
                    var newUser = {};

                    newUser.cum = req.body.cum;
                    newUser.seccion = req.body.seccion;
                    newUser.grupo = req.body.grupo;
                    newUser.provincia = req.body.provincia;
                    newUser.nombre = req.body.nombre;
                    newUser.email = email;
                    newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

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

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    // passport.use(new FacebookStrategy(configAuth[env].facebookAuth,
    // function(token, refreshToken, profile, done) {
    //     process.nextTick(function() {
    //         // Encontrar al usuario en la base de datos
    //         User.findAll({
    //             where: {
    //                 facebookid: profile.id,
    //                 $and:{ facebookemail: profile.emails[0].value }
    //              }
    //         })
    //         .then(function (user) {
    //             if (user[0]) {
    //                 return done(null, user[0]);
    //             } else {
    //                 var newUser = {};
    //                 newUser.cum = "";
    //                 newUser.seccion = "";
    //                 newUser.grupo = "";
    //                 newUser.provincia = "";
    //                 newUser.facebookid    = profile.id;
    //                 newUser.facebooktoken = token;
    //                 newUser.facebookname  = (profile.name.givenName || "") + " " + (profile.name.middleName || "") + " " +  (profile.name.familyName || "");
    //                 newUser.facebookemail = profile.emails[0].value;

    //                 User.create(newUser)
    //                 .then(function (newUser) {
    //                     return done(null, newUser);
    //                 })
    //                 .catch(function (error){
    //                     throw err
    //                 });
    //             }
    //         })
    //         .catch(function (error){
    //           return done(error);
    //         });
    //     });

    // }));

};
