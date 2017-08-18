app.controller('mainCtrl', function($scope, $rootScope, $http, $location, Config){
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	$scope.user = function(user) {
		$rootScope.user = JSON.parse(user);
		console.log(user);
	}

	$scope.isActive = function(route) {
		return route === $location.path();
	}

	Config.radiosFichaMedica().then(function(data){
		$rootScope.radios = data;
	});

	Config.insigniasPorSeccion($rootScope.user.seccion).then(function(data){
		$rootScope = $rootScope.concat(data);
	});

	$rootScope.parseArea = function(seccion){
		Config.areaYObjetivoPorSeccion(seccion, "").then(function(data){
			return data.area;
		});
	};
	$rootScope.parseObjetivo= function(seccion, area){
		Config.areaYObjetivoPorSeccion(seccion, area).then(function(data){
			return data.objetivo;
		});
	};
	
});
