// app/routes.js
var path        = require('path');  
// Controlers
var scouts      = require('../app/controllers/scouts');
var users       = require('../app/controllers/users');
var patrullas   = require('../app/controllers/patrullas');
var fichas      = require('../app/controllers/fichas');

// Config
var config      = require('../app/config/config');

module.exports = function(app, passport, models, port) {

//-------Render main AngularJS apps----------------------------------------------------------------------------
    app.get("/", inicioSesion, function(req, res) {
        models.sequelize
          .authenticate()
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
        res.render(path.join(__dirname, '../public' ,'login.ejs'), { message: req.flash('loginMessage') });
    });

    app.post('/entrar', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/entrar',
        failureFlash : true
    }));

    app.get("/registrarse", function(req, res) {
        res.render(path.join(__dirname, '../public' ,'registrar.ejs'),{ message: req.flash('signupMessage') });
    });

    app.post('/registrarse', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/registrarse',
        failureFlash : true
    }));

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
