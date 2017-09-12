// app/routes.js
var path        = require('path');  

// Controlers
var scouts      = require('../app/controllers/scouts');
var users       = require('../app/controllers/users');
var patrullas   = require('../app/controllers/patrullas');
var fichas      = require('../app/controllers/fichas');

// Config
var config      = require('../app/config/config');
var login       = require('../app/config/login');

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
        failureRedirect : '/registrarse',
        failureFlash : true
    }));

    app.post('/mandarEmailRecuperacion', login.mandarEmailRecuperacion);

    app.get('/olvide/:token', login.getOlvide);

    app.post('/olvide/:token', login.postOlvide);
    
    app.get('/faltandatos', inicioSesion, login.faltanDatos);

    app.post('/faltandatos', inicioSesion, login.postFaltanDatos);

    app.get('/logout', function(req, res) {
        req.logout();
	    res.redirect("/entrar")
    });
    
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
    app.get('/config/host', config.getHost);

//-------------------------------------------------------------------------------------------------------------

};
// Middlewares
function inicioSesion(req, res, next) {
    if (req.isAuthenticated()){
        if((!req.user.cum || !req.user.seccion || !req.user.grupo || !req.user.provincia || !req.user.nombre) && req.route.path != '/faltandatos'){
            res.redirect('/faltandatos');
        }
        return next();
    }

    res.redirect('/entrar');
}