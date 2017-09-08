// app/routes.js
var path        = require('path');  
var nodemailer  = require('nodemailer');
var bcrypt      = require('bcrypt-nodejs');
var async       = require('async');
var crypto      = require('crypto');

// Controlers
var scouts      = require('../app/controllers/scouts');
var users       = require('../app/controllers/users');
var patrullas   = require('../app/controllers/patrullas');
var fichas      = require('../app/controllers/fichas');

var User        = require('../app/models/').User;

// Config
var config      = require('../app/config/config');

module.exports = function(app, passport, models, port) {

//-------Render main AngularJS apps----------------------------------------------------------------------------
    app.get("/", inicioSesion, function(req, res) {
        models.sequelize
          .authenticate( )
          .then(function () {
            console.log('Connection successful');
            // users.findById(1).then(function(user) {
                res.render(path.join(__dirname, '../public' ,'index.ejs'),{
                    // user: JSON.stringify(user)
                    user: JSON.stringify(req.user)
                });
            // })
          })
          .catch(function(error) {
            console.log("Error creating connection:", error);
          });
    });

    app.get("/entrar", function(req, res){
        res.render(path.join(__dirname, '../public' ,'login.ejs'));
    });

    app.post('/entrar', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/entrar',
        failureFlash : true
    }));

    app.get("/registrarse", function(req, res) {
        res.render(path.join(__dirname, '../public' ,'registrar.ejs'));
    });

    app.post('/registrarse', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.post('/mandarEmailRecuperacion',function(req, res){
        async.waterfall([
            function(done){
                crypto.randomBytes(20, function(err, buf){
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done){
                users.findByEmail(req.body.email)
                .then(function(result){
                    var user = result[0].dataValues;
                    if(!user){
                        done('No tenemos registrada una cuenta con ese email', token, user);
                    }
                    
                    user.passwordToken = token;
                    user.passwordExpires = Date.now() + 3600000;

                    User.update(user, {
                        where: {
                          id: user.id
                        }
                    })
                    .then(function (user) {
                        done(null, user);
                    })
                    .catch(function (error){
                        console.log(error);
                        done(error, user);
                    });
                })
                .catch(function(error){
                    done(error, token, null);
                });
            },
            function(token, user, done){
                var smtp = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'uhluscout@gmail.com',
                        pass: '3838134223'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: '',
                    subject: 'Reinicio de contraseña Uhlu',
                    text: 'Estas recibiendo esto debido a que solicitaste un reinicio de tu contraseña'+
                    'Da click al siguiente link, o pégalo en tu navegador para completar el reinicio'+
                    'http://' + req.headers.host + '/olvide/' + token + '\n\n' +
                    'SI NO SOLICITASTE UN REINICIO DE CONTRASEÑA, SIMPLEMENTE IGNORA ESTE CORREO.'
                };
                smtp.sendMail(mailOptions, function(err){
                    done(err, 'Envíamos correctamente un correo con instrucciones al correo: '+user.email);
                })
            }
        ], function(err, message){
            if(err){
                console.log(err);
                return res.status(500).send('Ocurrió un error '+ err);
            }
            //Todo salio bien
            res.status(200).send(message);
        })
    });

    app.get('/olvide/:token', function(req, res){
        users.findByToken(req.params.token)
        .then(function(user){
            if(!user){
                req.flash('message', 'Este link es inválido o ya expiró');
                return res.redirect('/entrar');
            }

            res.render(path.join(__dirname, '../public' ,'olvide.ejs'), {token: req.params.token});
        })
        .catch(function(error){
            req.flash('message', 'Algo salió mal: '+error);
            return res.redirect('/entrar');
        })
    });

    app.post('/olvide/:token', function(req, res){
        async.waterfall([
            function(done){
                users.findByToken(req.params.token)
                .then(function(user){
                    if(!user){
                        req.flash('message', 'Este link es inválido o ya expiró');
                        return res.redirect('/entrar');
                    }
                    
                    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
                    user.passwordToken = undefined;
                    user.passwordExpires = undefined;

                    User.update(user, {
                        where: {
                          id: user.id
                        }
                    })
                    .then(function (user) {
                        done(null, user);
                    })
                    .catch(function (error){
                        console.log(error);
                        done(error, user);
                    });
                });
            },
            function(user, done){
                var smtp = nodemailer.createTransport('SMTP', {
                    service: 'Gmail',
                    auth: {
                        user: 'uhluscout@gmail.com',
                        pass: '3838134223'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: '',
                    subject: 'Tu contraseña en Uhlu ha cambiado',
                    text: 'Estas recibiendo esto debido a que solicitaste un reinicio de tu contraseña'+
                    'La contraseña en la cuenta '+user.email+' ha sido cambiada correctamente.'
                };
                smtp.sendMail(mailOptions, function(err){
                    done(err, 'Tu contraseña ha sido reiniciada correctamente');
                });
            }
        ], function(err, message){
            if(err){
                req.flash('message', 'Ocurrió un error '+err);
                return res.redirect('/entrar');
            }
            //Todo salio bien
            req.flash('success', message);
            return res.redirect('/entrar');
        })
    })

    app.get('/logout', function(req, res) {
        req.logout();
	    res.render(path.join(__dirname, '../public' ,'bye.ejs'));
    });
    
    //For database deploy at Heroku
    app.get("/database", inicioSesion, function(req,res){
        res.download(path.join(__dirname, '../' ,'Uhlu.sqlite'), 'Uhlu.sqlite');
    });

    //-------Facebook Login---------------------------------------------------------------------------------------
    // app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    
    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', {
    //         successRedirect : '/',
    //         failureRedirect : '/error'
    //     })
    // );
    
    
    //-------API EndPoints----------------------------------------------------------------------------
    app.get('/users/:id', inicioSesion, users.show);
    app.put('/users', inicioSesion, users.update);
    app.delete('/users/:id', inicioSesion, users.delete);
    
    app.get('/patrullas/:id', inicioSesion, patrullas.index);
    app.get('/patrullas/:id/:nombre', inicioSesion, patrullas.show);
    app.post('/patrullas', inicioSesion, patrullas.create);
    app.put('/patrullas', inicioSesion, patrullas.update);
    app.delete('/patrullas/:id', inicioSesion, patrullas.delete);
    
    app.get('/fichas', inicioSesion, fichas.index);
    app.get('/fichas/:id', inicioSesion, fichas.show);
    app.post('/fichas', inicioSesion, fichas.create);
    app.put('/fichas', inicioSesion, fichas.update);
    app.delete('/fichas/:id', inicioSesion, fichas.delete);
    app.get('/imprimirFicha/:id', inicioSesion, fichas.print);
    
    app.get('/scoutsfromuser/:id', inicioSesion, scouts.index);
    app.get('/scouts/:cum', inicioSesion, scouts.show);
    app.post('/scouts', inicioSesion, scouts.create);
    app.put('/scouts', inicioSesion, scouts.update);
    app.delete('/scouts/:cum', inicioSesion, scouts.delete);
    app.get('/generarReporte', inicioSesion, scouts.reporte);

    app.get('/config/insigniasPorSeccion/:seccion', inicioSesion,function(req, res){
        res.status(200).json(config.insigniasPorSeccion(req.params.seccion));
    });

    app.get('/config/radiosFichaMedica', inicioSesion,function(req, res){
        res.status(200).json(config.radiosFichaMedica());
    });
    
    app.get('/config/areaYObjetivoPorSeccion/:seccion/:area', inicioSesion,function(req, res){
        res.status(200).json(config.areaYObjetivoPorSeccion(req.params.seccion, req.params.area));
    });

    app.get('/config/provincias', config.provincias);

//-------------------------------------------------------------------------------------------------------------

};
// Middlewares
// route middleware to make sure a user is logged in
function inicioSesion(req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    
    // if they aren't redirect them to the home page
    // res.redirect('/auth/facebook');
    res.redirect('/entrar');
}

// Si el usuario tiene todos sus campos llenos. Continuar, si no mandarlo a la pagina para que los llene
// function faltanDatosUsuario(req, res, next) {
//     users.findById(req.user.id)
//     .then(function (User) {
//         if(User.dataValues.cum == ''|| User.dataValues.seccion == '' || User.dataValues.grupo == '' || User.dataValues.provincia == ''){
//             res.redirect('/registrar');
//         }else{
//             return next();
//         }
//     })
//     .catch(function (error){
//         console.log("ERROR" + error)
//       return error;
//     });

// }
