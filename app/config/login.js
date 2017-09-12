var path        = require('path');  
var nodemailer  = require('nodemailer');
var bcrypt      = require('bcrypt-nodejs');
var async       = require('async');
var crypto      = require('crypto');

var User        = require('../models/').User;
var users       = require('../controllers/users');

module.exports = {
    mandarEmailRecuperacion: function(req, res){
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
                    .then(function (updatedRecords) {
                        done(null, token, user);
                    })
                    .catch(function (error){
                        console.log(error);
                        done(error, token, user);
                    });
                })
                .catch(function(error){
                    done(error, token, null);
                });
            },
            function(token, user, done){
                console.log(user);
                var smtp = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // use SSL
                    auth: {
                        user: 'uhluscout@gmail.com',
                        pass: process.env.GMAIL_PASSWORD
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: '',
                    subject: 'Reinicio de contraseña Uhlu',
                    text: 'Estas recibiendo esto debido a que solicitaste un reinicio de tu contraseña'+
                    'Da click al siguiente link, o pégalo en tu navegador para completar el reinicio '+
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
    },
    getOlvide: function(req, res){
        users.findByToken(req.params.token)
        .then(function(result){
            if(!result[0]){
                console.log("token "+req.params.token+" inválido")
                req.flash('message', 'Este link es inválido o ya expiró');
                return res.redirect('/entrar');
            }
            var user = result[0].dataValues;

            res.render(path.join(__dirname, '../../public' ,'olvide.ejs'), {token: req.params.token});
        })
        .catch(function(error){
            req.flash('message', 'Algo salió mal: '+error);
            return res.redirect('/entrar');
        })
    },
    postOlvide: function(req, res){
        async.waterfall([
            function(done){
                users.findByToken(req.params.token)
                .then(function(result){
                    var user = result[0].dataValues;
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
                    .then(function (updatedRecords) {
                        done(null, user);
                    })
                    .catch(function (error){
                        console.log(error);
                        done(error, user);
                    });
                });
            },
            function(user, done){
                var smtp = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // use SSL
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
    },
    faltanDatos: function(req, res){
        res.render(path.join(__dirname, '../../public' ,'faltandatos.ejs'), {user: JSON.stringify(req.user)});        
    },
    postFaltanDatos: function(req, res){
        User.update(req.body, {
            where: {
              id: req.user.id
            }
        })
        .then(function (updatedRecords) {
            res.redirect('/')
        })
        .catch(function (error){
            console.log(error);
            res.status(500);
        });
    }

}