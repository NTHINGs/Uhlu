app.controller('mainCtrl', function($scope, $rootScope, $http, $location,$localStorage, Config){
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	$scope.user = function(user) {
		console.log(user);
		$rootScope.user = JSON.parse(user);
		Config.insigniasPorSeccion($rootScope.user.seccion).then(function(data){
			$rootScope.area1 = data.area1;
			$rootScope.area2 = data.area2;
			$rootScope.area3 = data.area3;
			$rootScope.area4 = data.area4;
			$rootScope.area5 = data.area5;
			$rootScope.area6 = data.area6;
			$rootScope.objetivo = data.objetivo;
			$rootScope.totalseccion = data.totalseccion;
			$rootScope.user.clan = data.user.clan;
			$rootScope.user.pequenogrupo = data.user.pequenogrupo;
			$rootScope.insignias = Object.values(data.insignias);
			Config.radiosFichaMedica().then(function(data){
				$rootScope.radios = data;
			});
		});
	}

	// Manejar el menu responsivo para tamaño movil
	$scope.windowWidth= window.innerWidth;
	$(window).resize(function(){
		$scope.$apply(function(){
		   $scope.windowWidth= window.innerWidth;
		   if ($scope.windowWidth < 768) {
				   $scope.toggle = false;
		   }
		});
	});

	$scope.isActive = function(route) {
		return route === $location.path();
	}
	
});
