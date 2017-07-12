app.controller('scoutsCtrl', function($scope, $rootScope, $dialogs, patrullas, scouts, $location, SweetAlert){
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
	$scope.modal = function() {
		patrullas.getPatrullas(1).then(function(patrullasArr) {
			if(patrullasArr.length > 0){
				dlg = $dialogs.create('/views/dialogs/agregarscout.html','agregarScoutCtrl',{},{key: true,back: 'static', size:'lg'});
				dlg.result.then(function(scout){
					if (scout.myImage == 'assets/img/fpo_avatar.png') {
						scout.foto = 'assets/img/fpo_avatar.png';
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
		        },function(){
		        	//Close Fallback 
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

app.controller('agregarScoutCtrl',function($scope,$modalInstance,data, patrullas){
	$scope.scout = {};
	// Patrullas del servicio para llenar el select en el modal
	patrullas.getPatrullas(1).then(function(patrullas) {
		// body...
		$scope.scout.patrullas = patrullas;
		$scope.scout.patrulla = $scope.scout.patrullas[0].idpatrulla;
	});
	// ImageCrop
	$scope.scout.myImage='assets/img/fpo_avatar.png';
	$scope.scout.foto='';
	$scope.defaultFoto = function($event) {
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.scout.foto = 'assets/img/fpo_avatar.png';
		$scope.scout.myImage='assets/img/fpo_avatar.png';
	};

	// DatePickers
	$scope.openDatePickers = [];
	$scope.open = function ($event, datePickerIndex) {
	   $event.preventDefault();
	   $event.stopPropagation();

	   if ($scope.openDatePickers[datePickerIndex] === true) {
	      $scope.openDatePickers.length = 0;
	   } else {
	      $scope.openDatePickers.length = 0;
	      $scope.openDatePickers[datePickerIndex] = true;
	   }
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
		$modalInstance.dismiss('canceled');  
	};

	$scope.save = function(){
		$modalInstance.close($scope.scout);
	};
}); // end agregarScoutCtrl

app.controller('scoutCtrl',function($scope,$rootScope, $dialogs, patrullas, scouts, $location, SweetAlert, $routeParams, $timeout){
	$scope.scout = {};
	
	scouts.getScout($routeParams.cum).then(function(scout) {
		// body...
		$scope.scout = scout;
		$rootScope.currentRoute='Scout '+$scope.scout.nombre;
	});
	// console.log($scope.scout);
	// Patrullas del servicio para llenar el select en el modal
	patrullas.getPatrullas(1).then(function(patrullas) {
		// body...
		$scope.scout.patrullas = patrullas;
	});
	// ImageCrop
	$scope.scout.myImage='assets/img/fpo_avatar.png';
	$scope.scout.foto='';
	$scope.defaultFoto = function($event) {
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.scout.foto = 'assets/img/fpo_avatar.png';
		$scope.scout.myImage='assets/img/fpo_avatar.png';
	};

	// DatePickers
	$scope.openDatePickers = [];
	$scope.open = function ($event, datePickerIndex) {
	   $event.preventDefault();
	   $event.stopPropagation();

	   if ($scope.openDatePickers[datePickerIndex] === true) {
	      $scope.openDatePickers.length = 0;
	   } else {
	      $scope.openDatePickers.length = 0;
	      $scope.openDatePickers[datePickerIndex] = true;
	   }
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

	$scope.save = function(){
		if ($scope.scout.myImage == 'assets/img/fpo_avatar.png') {
			$scope.scout.foto = 'assets/img/fpo_avatar.png';
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

	if(typeof($routeParams.tab) != 'undefined'){
		$timeout(function() {
		    angular.element(document.querySelector('#'+$routeParams.tab+'btn').click());
		}, 100);
	}
}); // end scoutCtrl