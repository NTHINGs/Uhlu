// SELECT S.foto, S.nombre,S.cum,(P.nombre) as patrulla,Pr.porcentaje FROM scouts S, patrullas P, users U,progresionespersonales  Pr WHERE S.patrulla=P.idpatrullas AND P.usuario=U.id AND S.cum=Pr.scout AND U.username=:username
var app = angular.module('Uhlu', ['ngRoute', 'ui.bootstrap','dialogs','ngImgCrop', 'oitozero.ngSweetAlert']);
app.config(function($routeProvider) {
	$routeProvider
	  .when("/", {
	    templateUrl : "views/scouts.html", 
	    controller: "scoutsCtrl"
	  })
	  .when("/scout/:cum/:tab", {
	    templateUrl : "views/scout.html", 
	    controller: "scoutCtrl"
	  })
	  .when("/scout/:cum", {
	    templateUrl : "views/scout.html", 
	    controller: "scoutCtrl"
	  })
	  .when("/patrullas", {
	    templateUrl : "views/patrullas.html", 
	    controller: "patrullasCtrl"
	  })
	  .when("/patrulla/:idpatrulla/:nombre", {
	    templateUrl : "views/patrulla.html", 
	    controller: "patrullaCtrl"
	  })
	  .when("/informes", {
	    templateUrl : "views/informes.html", 
	    controller: "informesCtrl"
	  })
	  .when("/fichasreme", {
	    templateUrl : "views/fichasreme.html", 
	    controller: "fichasRemeCtrl"
	  })
	  .when("/fichareme/:id", {
	    templateUrl : "views/fichareme.html", 
	    controller: "fichaRemeCtrl"
	  })
	  .when("/editarperfil", {
	    templateUrl : "views/editarperfil.html", 
	    controller: "editarPerfilCtrl"
	  });
});

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});