// app/routes.js
var multer  = require('multer')
var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');
var path = require('path');  

// Controlers
var scouts = require('../app/controllers/scouts');

var upload = multer({ 
    dest: 'public/fotoscasas/',
    rename: function(fieldname, filename) {
        return filename;
    },
    onFileUploadStart: function(file) {
        if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            return false;
        }
    } 
});

module.exports = function(app, passport, models) {
    app.get("/", function(req, res) {
        models.sequelize
          .authenticate()
          .then(function () {
            console.log('Connection successful');
            res.sendFile(path.join(__dirname, '../public/views' ,'index.html'))
          })
          .catch(function(error) {
            console.log("Error creating connection:", error);
          });
    });

    app.get('/scouts', scouts.index);
    app.get('/scouts/:cum', scouts.show);
    app.post('/scouts', scouts.create);
    app.put('/scouts', scouts.update);
    app.delete('/scouts/:cum', scouts.delete);

	app.get('/logout', function(req, res) {
	    req.logout();
	    res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function inicioSesion(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}