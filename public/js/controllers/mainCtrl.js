app.controller('mainCtrl', function($scope, $rootScope, $http, $location){
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	// TODO Hacerlo con una peticion get
	$rootScope.user={
		colorbarra: 'progress-bar-success',
		pequenogrupo: 'Patrulla',
		clan: false
	}

	$scope.isActive = function(route) {
		return route === $location.path();
	}

	$http.get('json/radios.json').then(function(data) {
		$rootScope.radios = data.data;
	});
	$http.get('json/insignias.json').then(function(data) {
		$rootScope.insignias = data.data;
		switch ('tropa') {
			case 'manada':
				$rootScope.insignias.etapa.opciones.amarilla= "Lobo Pata Tierna";
				$rootScope.insignias.etapa.opciones.verde= "Lobo Saltador";
				$rootScope.insignias.etapa.opciones.azul= "Lobo Rastreador";
				$rootScope.insignias.etapa.opciones.roja= "Lobo Cazador";
				$rootScope.insignias.desarrollo.opciones.verde= "Kaniwuara";
				$rootScope.insignias.desarrollo.opciones.azul= "Waigunga";
				$rootScope.insignias.desarrollo.opciones.roja = "Seeonee";
				$rootScope.insignias.etapa.seccion='manada';
				$rootScope.insignias.desarrollo.seccion='manada';
				$rootScope.insignias.enlace.seccion='manada';
				$rootScope.objetivo="Presa";
				//Corporalidad
				$rootScope.area1="Bagheera (Corporalidad)";
				// Creatividad
				$rootScope.area2="Kaa (Creatividad)";
				// Caracter
				$rootScope.area3="Baloo (Carácter)";
				// Afectividad
				$rootScope.area4="Rikki-Tikki-Tavi (Afectividad)";
				// Sociabilidad
				$rootScope.area5="Kotick (Sociabilidad)";
				// Espiritualidad
				$rootScope.area6="Francisco de Asís (Espiritualidad)";
				$rootScope.totalseccion = 38;
				  
				break;
			case 'tropa':
				$rootScope.insignias.etapa.opciones.amarilla= "Pista";
				$rootScope.insignias.etapa.opciones.verde= "Senda";
				$rootScope.insignias.etapa.opciones.azul= "Rumbo";
				$rootScope.insignias.etapa.opciones.roja= "Travesía";
				$rootScope.insignias.desarrollo.opciones.verde= "Mafeking";
				$rootScope.insignias.desarrollo.opciones.azul= "Paxtu";
				$rootScope.insignias.desarrollo.opciones.roja = "Brownsea";
				$rootScope.insignias.etapa.seccion='tropa';
				$rootScope.insignias.desarrollo.seccion='tropa';
				$rootScope.insignias.enlace.seccion='tropa';
				$rootScope.objetivo="Territorio";
				//Corporalidad
				$rootScope.area1="Pez (Corporalidad)";
				// Creatividad
				$rootScope.area2="Ave (Creatividad)";
				// Caracter
				$rootScope.area3="Tortuga (Carácter)";
				// Afectividad
				$rootScope.area4="Flor (Afectividad)";
				// Sociabilidad
				$rootScope.area5="Abeja (Sociabilidad)";
				// Espiritualidad
				$rootScope.area6="Arbol (Espiritualidad)";
				$rootScope.totalseccion = 38;
				  
				break;
			case 'comunidad':
				$rootScope.insignias.etapa.opciones.amarilla= "Búsqueda";
				$rootScope.insignias.etapa.opciones.verde= "Encuentro";
				$rootScope.insignias.etapa.opciones.azul= "Desafío";
				delete $rootScope.insignias.etapa.opciones.roja;
				$rootScope.insignias.desarrollo.opciones.verde= "Desarrollo Comunitario";
				$rootScope.insignias.desarrollo.opciones.azul= "Paz";
				$rootScope.insignias.desarrollo.opciones.roja = "Medio Ambiente";
				$rootScope.insignias.etapa.seccion='comunidad';
				$rootScope.insignias.desarrollo.seccion='comunidad';
				$rootScope.insignias.enlace.seccion='comunidad';
				$rootScope.objetivo="Desafío";
				//Corporalidad
				$rootScope.area1="Delfín (Corporalidad)";
				// Creatividad
				$rootScope.area2="Ave (Creatividad)";
				// Caracter
				$rootScope.area3="Caballo (Carácter)";
				// Afectividad
				$rootScope.area4="Flor (Afectividad)";
				// Sociabilidad
				$rootScope.area5="Abeja (Sociabilidad)";
				// Espiritualidad
				$rootScope.area6="Arbol (Espiritualidad)";
				$rootScope.totalseccion = 37;
				  

				break;
			case 'clan':
				$rootScope.insignias.etapa.opciones.amarilla= "Horquilla Amarilla";
				$rootScope.insignias.etapa.opciones.verde= "Horquilla Verde";
				$rootScope.insignias.etapa.opciones.azul= "Horquilla Azul";
				$rootScope.insignias.etapa.opciones.roja= "Horquilla Roja";
				delete $rootScope.insignias.desarrollo.opciones.verde;
				delete $rootScope.insignias.desarrollo.opciones.azul;
				$rootScope.insignias.desarrollo.opciones.roja = 'Scouts del Mundo';
				$rootScope.insignias.etapa.seccion='clan';
				$rootScope.insignias.desarrollo.seccion='clan';
				$rootScope.insignias.enlace.seccion='clan';
				$rootScope.objetivo="Área de Desarrollo";
				//Corporalidad
				$rootScope.area1="Corporalidad";
				// Creatividad
				$rootScope.area2="Creatividad";
				// Caracter
				$rootScope.area3="Carácter";
				// Afectividad
				$rootScope.area4="Afectividad";
				// Sociabilidad
				$rootScope.area5="Sociabilidad";
				// Espiritualidad
				$rootScope.area6="Espiritualidad";
				$rootScope.totalseccion = 31;
				break;
		}
		$rootScope.insignias = Object.values($rootScope.insignias);

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
	});
	
});