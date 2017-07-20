// app/routes.js
var path = require('path');  
// Controlers
var scouts = require('../app/controllers/scouts');
var users = require('../app/controllers/users');

module.exports = function(app, passport, models) {

//-------Render main AngularJS apps----------------------------------------------------------------------------
    app.get("/", inicioSesion, faltanDatosUsuario,function(req, res) {
        models.sequelize
          .authenticate()
          .then(function () {
            console.log('Connection successful');
            res.render(path.join(__dirname, '../public' ,'index.ejs'),{
                user: JSON.stringify(req.user)
            });
          })
          .catch(function(error) {
            console.log("Error creating connection:", error);
          });
    });

    app.get("/registrar", inicioSesion, function(req, res) {
        console.log(req.user)
        res.render(path.join(__dirname, '../public' ,'registrar.ejs'),{
            user: JSON.stringify(req.user)
        });
    });

    app.get("/bye", function(req, res) {
        res.render(path.join(__dirname, '../public' ,'bye.ejs'));
    });

    app.get("/notificate",inicioSesion,function(req,res) {

    });
//-------Facebook Login---------------------------------------------------------------------------------------
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect : '/',
          failureRedirect : '/error'
    }));

	app.get('/logout', function(req, res) {
	    req.logout();
	    res.redirect('/bye');
	});

//-------API EndPoints----------------------------------------------------------------------------
    app.get('/users', inicioSesion, users.index);
    app.get('/users/:id', inicioSesion, users.show);
    app.post('/users', inicioSesion, users.create);
    app.put('/users', inicioSesion, users.update);
    app.delete('/users/:id', inicioSesion, users.delete);

    app.get('/scoutsfromuser/:id', inicioSesion, scouts.index);
    app.get('/scouts/:cum', inicioSesion, scouts.show);
    app.post('/scouts', inicioSesion, scouts.create);
    app.put('/scouts', inicioSesion, scouts.update);
    app.delete('/scouts/:cum', inicioSesion, scouts.delete);
//-------------------------------------------------------------------------------------------------------------

};
// Middlewares
// route middleware to make sure a user is logged in
function inicioSesion(req, res, next) {
    // Si el usuario tiene todos sus campos llenos. Continuar, si no mandarlo a la pagina para que los llene

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/facebook');
}

function faltanDatosUsuario(req, res, next) {
    users.findById(req.user.id)
    .then(function (User) {
        if(User.dataValues.cum == ''|| User.dataValues.seccion == '' || User.dataValues.grupo == '' || User.dataValues.provincia == ''){
            res.redirect('/registrar');
        }else{
            return next();
        }
    })
    .catch(function (error){
        console.log("ERROR" + error)
      return error;
    });

}