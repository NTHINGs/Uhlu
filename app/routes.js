// app/routes.js
var path        = require('path');  
var PDFDocument = require('pdfkit');
// Controlers
var scouts      = require('../app/controllers/scouts');
var users       = require('../app/controllers/users');
var patrullas   = require('../app/controllers/patrullas');
var fichas      = require('../app/controllers/fichas');


module.exports = function(app, passport, models, port) {

//-------Render main AngularJS apps----------------------------------------------------------------------------
    app.get("/",function(req, res) {
        models.sequelize
          .authenticate()
          .then(function () {
            console.log('Connection successful');
            users.findById(1).then(function(user) {
                res.render(path.join(__dirname, '../public' ,'index.ejs'),{
                    user: JSON.stringify(user)
                    // user: JSON.stringify(req.user)
                });
            })
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
    //For database deploy at Heroku
    app.get("/database", function(req,res){
       res.download(path.join(__dirname, '../' ,'Uhlu.sqlite'), 'Uhlu.sqlite');
    });

//-------PDF Generations--------------------------------------------------------------------------------------
    app.post('/printFicha', function(req, res){
        doc = new PDFDocument();
        // Adding PDF Content
        doc.text("Hola!");
        doc.pipe(res);
        doc.end();     
        // req.body
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
    app.get('/users', users.index);
    app.get('/users/:id', users.show);
    app.post('/users', users.create);
    app.put('/users', users.update);
    app.delete('/users/:id', users.delete);

    // app.get('/patrullas', patrullas.index);
    app.get('/patrullas/:id', patrullas.index);
    app.get('/patrullas/:id/:nombre', patrullas.show);
    app.post('/patrullas', patrullas.create);
    app.put('/patrullas', patrullas.update);
    app.delete('/patrullas/:id', patrullas.delete);

    // app.get('/fichas', fichas.index);
    app.get('/fichas', fichas.index);
    app.get('/fichas/:id', fichas.show);
    app.post('/fichas', fichas.create);
    app.put('/fichas', fichas.update);
    app.delete('/fichas/:id', fichas.delete);

    app.get('/scoutsfromuser/:id', scouts.index);
    app.get('/scouts/:cum', scouts.show);
    app.post('/scouts', scouts.create);
    app.put('/scouts', scouts.update);
    app.delete('/scouts/:cum', scouts.delete);
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
