app.controller('scoutsCtrl', function($scope, $rootScope, $route, $location, SweetAlert, $mdDialog, Patrullas, Scouts){
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	$rootScope.currentRoute='Tus Scouts';
	$scope.scouts = [];
	Scouts.all($rootScope.user.id).then(function(scouts) {
		$scope.scouts = scouts;
		console.log($scope.scouts)
	});

	$scope.borrar = function(scout) {
		var scout = scout;
		SweetAlert.swal({
			title: "Estas seguro de querer eliminar a "+scout.nombre+"?",
			text: "No vas a poder recuperarlo",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#692B8D",
			confirmButtonText: "Si, eliminalo!",
			closeOnConfirm: false
		},function() {
			Scouts.delete(scout.cum).then(function (s) {
				SweetAlert.swal({
					title: "Eliminado!",
					text: ''+scout.nombre+' ha sido eliminado correctamente',
					type: "success",
					showCancelButton: false,
					confirmButtonColor: "#692B8D",
					confirmButtonText: "Ok!",
					closeOnConfirm: true
				}, 
				function(){ 
					console.log("EXITO");
					$route.reload();
				});
	        })
	        .catch(function (error) {
	        	SweetAlert.swal("Ooops..", "Ocurrio un error: "+error.data, "error");
	        });
			
		});
	}

	//Modal
	$scope.showAgregarScout = function(ev) {
		Patrullas.all($rootScope.user.id).then(function(patrullasArr) {
			if(patrullasArr.length > 0){
				$mdDialog.show({
					controller: function($scope,Patrullas){
						$scope.scout = {};
						$scope.scout.foto = 'img/fpo_avatar.png';
						ScoutProcess($scope, $rootScope, Patrullas);
						// Modal Actions
						$scope.cancel = function(){
							$mdDialog.cancel(); 
						};

						$scope.save = function(){
							console.log($scope.scout);
							$mdDialog.hide($scope.scout);	
						};
					},
					templateUrl: '/dialogs/agregarscout.html',
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
					// PARSE ProgresionPersonal
					var fechas=scout.progresion.fechas;
					var fechasFlatted = {};

					for (var key in fechas) {
					  if(key != 'promesa' && key != 'enlace'){
					    for (var subKey in fechas[key]) {
					      fechasFlatted['fecha' + key + subKey] = fechas[key][subKey];
					    }
					  }else{
					    fechasFlatted['fecha' + key]=fechas[key];
					  }
					}
					delete scout.progresion.fechas;
					scout.progresionpersonal = jsonConcat(scout.progresion, fechasFlatted);
					delete scout.progresion;
					delete scout.patrullas;
					scout = jsonConcat(scout, scout.fichamedica);
					scout = jsonConcat(scout, scout.progresionpersonal);
					delete scout.fichamedica;
					delete scout.progresionpersonal;
					scout.porcentaje = calcularPorcentaje(scout, $rootScope.totalseccion);
					scout.user_id = $rootScope.user.id;
					console.log(scout);
					Scouts.new(scout).then(function (scout) {
						SweetAlert.swal({
							title: "Exito!",
							text: ''+scout.nombre+' Fue Agregad'+s+' Correctamente',
							type: "success",
							showCancelButton: false,
							confirmButtonColor: "#692B8D",
							confirmButtonText: "Ok!",
							closeOnConfirm: true
						}, 
						function(){ 
							console.log("EXITO");
							$route.reload();
						});
			        })
			        .catch(function (error) {
			        	SweetAlert.swal("Ooops..", "Ocurrio un error: "+error.data, "error");
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


app.controller('scoutCtrl',function($scope,$rootScope, $route, $location, SweetAlert, $routeParams, Patrullas, Scouts){
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
	
	Scouts.get($routeParams.cum).then(function(scout) {
		// body...
		$scope.scout = scout[0];
		console.log($scope.scout);
		$scope.scout.fechanacimiento = new Date($scope.scout.fechanacimiento);
		$rootScope.currentRoute='Scout '+$scope.scout.nombre;
		ScoutProcess($scope, $rootcope, Patrullas);
		$rootScope.insignias.forEach(function(insignia){			
			if(!insignia.especial){
				for (var i = 0 ; i < Object.keys(insignia.opciones).length; i++) {
					$scope.scout['fecha'+insignia.nombre+(i + 1)] = new Date($scope.scout['fecha'+insignia.nombre+(i + 1)]);
					if($scope.scout['fecha'+insignia.nombre+(i + 1)].getFullYear() == '1969'){
						$scope.scout['fecha'+insignia.nombre+(i + 1)] = null;
					}
				}
			}else{
				$scope.scout['fecha'+insignia.nombre] = new Date($scope.scout['fecha'+insignia.nombre]);
				if($scope.scout['fecha'+insignia.nombre].getFullYear() == '1969'){
					$scope.scout['fecha'+insignia.nombre] = null;
				}
			}
			
		});
	});
	// console.log($scope.scout);

	$scope.save = function(){
		if ($scope.scout.myImage == 'img/fpo_avatar.png') {
			$scope.scout.foto = 'img/fpo_avatar.png';
		}
		var s = 'a'
		if($scope.scout.genero == 'M'){
			s = 'o';
		}
		console.log($rootScope.totalseccion)
		$scope.scout.porcentaje = calcularPorcentaje($scope.scout, $rootScope.totalseccion);
		// 'Exito', ''+scout.nombre+' Fue Agregad'+s+' Correctamente'
		$scope.scout.user_id = $rootScope.user.id
		Scouts.update($scope.scout).then(function (scout) {
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
        })
        .catch(function (error) {
        	SweetAlert.swal("Ooops..", "Ocurrio un error: "+error.data, "error");
        });
	};
}); // end scoutCtrl

function ScoutProcess($scope, $rootScope, Patrullas) {
	// Patrullas del servicio para llenar el select en el modal
	Patrullas.all($rootScope.user.id).then(function(patrullas) {
		// body...
		$scope.scout.patrullas = patrullas;
		$scope.scout.patrulla_id = $scope.scout.patrullas[0].id;
	});
	// ImageCrop
	$scope.scout.myImage='img/fpo_avatar.png';
	if($scope.scout.foto != 'img/fpo_avatar.png'){
		$scope.scout.myImage = $scope.scout.foto;
	}

	$scope.defaultFoto = function($event) {
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.scout.foto = 'img/fpo_avatar.png';
		$scope.scout.myImage='img/fpo_avatar.png';
	};

	$scope.desarrollo= [{clicked: false, value: 1}, {clicked: false, value: 2}, {clicked: false, value: 5}];
	switch($scope.scout.desarrollo){
		case 1:
			$scope.desarrollo= [{clicked: true, value: 1}, {clicked: false, value: 2}, {clicked: false, value: 5}];
		break;
		case 2:
			$scope.desarrollo= [{clicked: false, value: 1}, {clicked: true, value: 2}, {clicked: false, value: 5}];
		break;
		case 3:
			$scope.desarrollo= [{clicked: true, value: 1}, {clicked: true, value: 2}, {clicked: false, value: 5}];
		break;
		case 5:
			$scope.desarrollo= [{clicked: false, value: 1}, {clicked: false, value: 2}, {clicked: true, value: 5}];
		break;
		case 6:
			$scope.desarrollo= [{clicked: true, value: 1}, {clicked: false, value: 2}, {clicked: true, value: 5}];
		break;
		case 7:
			$scope.desarrollo= [{clicked: false, value: 1}, {clicked: true, value: 2}, {clicked: true, value: 5}];
		break;
		case 8:
			$scope.desarrollo= [{clicked: true, value: 1}, {clicked: true, value: 2}, {clicked: true, value: 5}];
		break;
	}
	$scope.desarrolloClick = function(i) {
		$scope.desarrollo[i-1].clicked = !$scope.desarrollo[i-1].clicked;
		var valor = 0
		$scope.desarrollo.forEach(function(d) {
			if(d.clicked){
				valor += d.value;
			}
		})
		$scope.scout.desarrollo = valor;
	};

	$scope.borrar = function(insignia) {
		$scope.scout[insignia] = 0;
		if(insignia == 'desarrollo'){
			$scope.desarrollo.forEach(function(d) {
				d.clicked = false;	
			})
		}
	};
}

function jsonConcat(o1, o2) {
 for (var key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}

function calcularPorcentaje(scout, totalseccion) {
	var puntaje = scout.promesa + scout.etapa + scout.deporte + scout.expresion + scout.humanidades + scout.rescate + scout.ciencia + scout.vida + scout.desarrollo + scout.enlace;
	return (puntaje*100/totalseccion).toFixed(2);
}