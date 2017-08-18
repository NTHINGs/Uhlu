app.controller('mainCtrl', function($scope, $rootScope, $http, $location, Config){
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	$scope.user = function(user) {
		$rootScope.user = JSON.parse(user);
		console.log(user);
		Config.insigniasPorSeccion($rootScope.user.seccion).then(function(data){
			console.log(data);
			$rootScope = $rootScope.concat(data);
		});
		Config.radiosFichaMedica().then(function(data){
			$rootScope.radios = data;
		});
	}

	$scope.isActive = function(route) {
		return route === $location.path();
	}

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
