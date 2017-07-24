// SELECT S.foto, S.nombre,S.cum,(P.nombre) as patrulla,Pr.porcentaje FROM scouts S, patrullas P, users U,progresionespersonales  Pr WHERE S.patrulla=P.idpatrullas AND P.usuario=U.id AND S.cum=Pr.scout AND U.username=:username
var app = angular.module('Uhlu', ['ngRoute', 'ngMaterial','ngMessages','ngImgCrop', 'oitozero.ngSweetAlert']);
app.config(function($routeProvider, $mdThemingProvider) {
	$routeProvider
	  .when("/", {
	    templateUrl : "scouts.html", 
	    controller: "scoutsCtrl"
	  })
	  .when("/scout/:cum/:tab", {
	    templateUrl : "scout.html", 
	    controller: "scoutCtrl"
	  })
	  .when("/scout/:cum", {
	    templateUrl : "scout.html", 
	    controller: "scoutCtrl"
	  })
	  .when("/patrullas", {
	    templateUrl : "patrullas.html", 
	    controller: "patrullasCtrl"
	  })
	  .when("/patrulla/:id/:nombre", {
	    templateUrl : "patrulla.html", 
	    controller: "patrullaCtrl"
	  })
	  .when("/informes", {
	    templateUrl : "informes.html", 
	    controller: "informesCtrl"
	  })
	  .when("/fichasreme", {
	    templateUrl : "fichasreme.html", 
	    controller: "fichasRemeCtrl"
	  })
	  .when("/fichareme/:id", {
	    templateUrl : "fichareme.html", 
	    controller: "fichaRemeCtrl"
	  })
	  .when("/editarperfil", {
	    templateUrl : "editarperfil.html", 
	    controller: "editarPerfilCtrl"
	  });

	  $mdThemingProvider.theme('default')
	      .primaryPalette('purple', {'default': '800'})
	      .accentPalette('purple', {'default': '800'})
});

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
