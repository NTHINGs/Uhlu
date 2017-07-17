app.controller('scoutsCtrl', function($scope, $rootScope, $location, SweetAlert, $mdDialog, patrullas, scouts){
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	$rootScope.currentRoute='Tus Scouts';
	$scope.scouts = [];
	scouts.getScouts(1).then(function(scouts) {
		$scope.scouts = scouts;
		$scope.scouts.forEach(function(scout) {
			patrullas.getNombrePatrulla(scout.patrulla).then(function(nombre) {
				scout.patrulla = nombre;
			});
		});
	});

	// TODO Hacerlo con una peticion get
	//Modal
	$scope.showAgregarScout = function(ev) {
		patrullas.getPatrullas(1).then(function(patrullasArr) {
			if(patrullasArr.length > 0){
				$mdDialog.show({
					controller: function($scope,patrullas){
						ScoutProcess($scope, patrullas);
						$scope.save = function(){
							console.log($scope.scout);
							$mdDialog.hide($scope.scout);
						};
					},
					templateUrl: '/views/dialogs/agregarscout.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true,
					fullscreen: 'false' // Only for -xs, -sm breakpoints.
				})
				.then(function(scout) {
					if (scout.myImage == 'img/fpo_avatar.png') {
						scout.foto = 'img/fpo_avatar.png';
					}
					var s = 'a'
					if(scout.genero == 'M'){
						s = 'o';
					}
					// 'Exito', ''+scout.nombre+' Fue Agregad'+s+' Correctamente'
					SweetAlert.swal({
					   title: "Exito!",
					   text: ''+scout.nombre+' Fue Agregad'+s+' Correctamente',
					   type: "success",
					   showCancelButton: false,
					   confirmButtonColor: "#692B8D",
					   confirmButtonText: "Ok!",
					   closeOnConfirm: true}, 
					function(){ 
						console.log("EXITO");
						$location.path('/');
					});
				}, function() {
					
				});
				
			}else{
				SweetAlert.swal({
				   title: "Aun no tienes patrullas registradas, deseas agregar una?",
				   type: "error",
				   showCancelButton: true,
				   confirmButtonColor: "#692B8D",
				   confirmButtonText: "Agregar Patrulla",
				   closeOnConfirm: true}, 
				function(isConfirm){ 
					if (isConfirm) {
						console.log("EXITO");
						$location.path('/patrullas');
					}
				});
			}
		});
		
	}//end modal
});//end scoutsCtrl


app.controller('scoutCtrl',function($scope,$rootScope, $location, SweetAlert, $routeParams, patrullas, scouts){
	switch($routeParams.tab){ 
		case "informacion":
			$scope.informacion = true;
			$scope.ficha = false;
			$scope.progresion = false;
		break;
		case "fichamedica":
			$scope.informacion = false;
			$scope.ficha = true;
			$scope.progresion = false;
		break;
		case "progresionpersonal":
			$scope.informacion = false;
			$scope.ficha = false;
			$scope.progresion = true;
		break;
		default:
			$scope.informacion = true;
			$scope.ficha = false;
			$scope.progresion = false;
	}
	
	scouts.getScout($routeParams.cum).then(function(scout) {
		// body...
		$scope.scout = scout;
		$scope.scout.fechanacimiento = new Date($scope.scout.fechanacimiento);
		$rootScope.currentRoute='Scout '+$scope.scout.nombre;
	});
	// console.log($scope.scout);
	ScoutProcess($scope, patrullas);

	$scope.save = function(){
		if ($scope.scout.myImage == 'img/fpo_avatar.png') {
			$scope.scout.foto = 'img/fpo_avatar.png';
		}
		var s = 'a'
		if($scope.scout.genero == 'M'){
			s = 'o';
		}
		// 'Exito', ''+scout.nombre+' Fue Agregad'+s+' Correctamente'
		SweetAlert.swal({
		   title: "Exito!",
		   text: ''+$scope.scout.nombre+' Fue Editad'+s+' Correctamente',
		   type: "success",
		   showCancelButton: false,
		   confirmButtonColor: "#692B8D",
		   confirmButtonText: "Ok!",
		   closeOnConfirm: true}, 
		function(){ 
			$location.path('/scout/'+$scope.scout.cum);
		});
	};
}); // end scoutCtrl

function ScoutProcess($scope, patrullas) {
	$scope.scout = {};
	// Patrullas del servicio para llenar el select en el modal
	patrullas.getPatrullas(1).then(function(patrullas) {
		// body...
		$scope.scout.patrullas = patrullas;
		$scope.scout.patrulla = $scope.scout.patrullas[0].idpatrulla;
	});
	// ImageCrop
	$scope.scout.myImage='img/fpo_avatar.png';
	$scope.scout.foto='';
	$scope.defaultFoto = function($event) {
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.scout.foto = 'img/fpo_avatar.png';
		$scope.scout.myImage='img/fpo_avatar.png';
	};

	$scope.desarrollo= [{clicked: false, value: 1}, {clicked: false, value: 2}, {clicked: false, value: 5}];
	$scope.desarrolloClick = function(i) {
		$scope.desarrollo[i-1].clicked = !$scope.desarrollo[i-1].clicked;
		var valor = 0
		$scope.desarrollo.forEach(function(d) {
			if(d.clicked){
				valor += d.value;
			}
		})
		$scope.scout.progresion.desarrollo = valor;
	};

	$scope.borrar = function(insignia) {
		$scope.scout.progresion[insignia] = 0;
		if(insignia == 'desarrollo'){
			$scope.desarrollo.forEach(function(d) {
				d.clicked = false;	
			})
		}
	};

	// Modal Actions
	$scope.cancel = function(){
		$mdDialog.cancel(); 
	};
}