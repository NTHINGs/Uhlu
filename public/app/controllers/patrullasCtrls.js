app.controller('patrullasCtrl', function($scope, $rootScope, $dialogs, patrullas, scouts, $location, SweetAlert){
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	$rootScope.currentRoute='Tus Patrullas';
	$scope.patrullas = [];
	patrullas.getPatrullas(1).then(function(patrullas) {
		$scope.patrullas = patrullas;
	});

	// TODO Hacerlo con una peticion get
	//Modal
	$scope.modal = function() {
		dlg = $dialogs.create('/views/dialogs/agregarpatrulla.html','agregarPatrullaCtrl',{},{key: true,back: 'static', size:'lg'});
		dlg.result.then(function(patrulla){
			if (patrulla.myImage == 'img/fpo_avatar_multi.png') {
				patrulla.foto = 'img/fpo_avatar_multi.png';
			}
			// 'Exito', ''+patrulla.nombre+' Fue Agregad'+s+' Correctamente'
			SweetAlert.swal({
			   title: "Exito!",
			   text: ''+patrulla.nombre+' Fue Agregado Correctamente',
			   type: "success",
			   showCancelButton: false,
			   confirmButtonColor: "#692B8D",
			   confirmButtonText: "Ok!",
			   closeOnConfirm: true}, 
			function(){ 
				console.log("EXITO");
				$location.path('/patrullas');
			});
        },function(){
        	//Close Fallback 
        });	
	}//end modal
});//end patrullasCtrl

app.controller('agregarPatrullaCtrl',function($scope,$modalInstance,data){
	$scope.patrulla = {};
	// ImageCrop
	$scope.patrulla.myImage='img/fpo_avatar_multi.png';
	$scope.patrulla.foto='';
	$scope.defaultFoto = function($event) {
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.patrulla.foto = 'img/fpo_avatar_multi.png';
		$scope.patrulla.myImage='img/fpo_avatar_multi.png';
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

	// Modal Actions
	$scope.cancel = function(){
		$modalInstance.dismiss('canceled');  
	};

	$scope.save = function(){
		$modalInstance.close($scope.patrulla);
	};
}); // end agregarPatrulaCtrl

app.controller('patrullaCtrl',function($scope,$rootScope, $dialogs, patrullas, scouts, $location, SweetAlert, $routeParams, $timeout){
	$scope.patrulla = {};
	$rootScope.currentRoute=$routeParams.nombre;
	
	patrullas.getPatrulla($routeParams.idpatrulla).then(function(patrulla) {
		// body...
		$scope.patrulla = patrulla;
	});
	// ImageCrop
	$scope.patrulla.myImage='img/fpo_avatar_multi.png';
	$scope.patrulla.foto='';
	$scope.defaultFoto = function($event) {
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.patrulla.foto = 'img/fpo_avatar_multi.png';
		$scope.patrulla.myImage='img/fpo_avatar_multi.png';
	};

	$scope.save = function(){
		if ($scope.patrulla.myImage == 'img/fpo_avatar_multi.png') {
			$scope.patrulla.foto = 'img/fpo_avatar_multi.png';
		}
		// 'Exito', ''+patrulla.nombre+' Fue Agregad'+s+' Correctamente'
		SweetAlert.swal({
		   title: "Exito!",
		   text: ''+$scope.patrulla.nombre+' Fue Editado Correctamente',
		   type: "success",
		   showCancelButton: false,
		   confirmButtonColor: "#692B8D",
		   confirmButtonText: "Ok!",
		   closeOnConfirm: true}, 
		function(){ 
			$location.path('/patrulla/'+$scope.patrulla.idpatrulla+'/'+$scope.patrulla.nombre);
		});
	};
}); // end patrullaCtrl