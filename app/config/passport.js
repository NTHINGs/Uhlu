var LocalStrategy   = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');
// Model
var User = require('../models/').User;

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
        User.findOne({
            where: {
                email: email,
            }
        })
        .then(function(user) {
            if (!user)
                return done(null, false, req.flash('message', 'Ese usuario no existe!.'));

            if (!bcrypt.compareSync(password, user.password))
                return done(null, false, req.flash('message', 'Oops! contraseña incorrecta.'));

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
                    return done(null, false, req.flash('message', 'Ese Email Ya Existe En Uhlu.'));
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
};
