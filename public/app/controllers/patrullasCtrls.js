app.controller('patrullasCtrl', function($scope, $rootScope, $route, $location, SweetAlert, $mdDialog, Patrullas){
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	$rootScope.currentRoute='Tus '+$rootScope.user.pequenogrupo.charAt(0).toUpperCase() + $rootScope.user.pequenogrupo.slice(1);
	$scope.patrullas = [];
	Patrullas.all($rootScope.user.id).then(function(patrullas) {
		$scope.patrullas = patrullas;
		console.log(patrullas)
	});

	$scope.borrar = function(patrulla) {
		var patrulla = patrulla;
		SweetAlert.swal({
			title: "Estas seguro de querer eliminar a "+patrulla.nombre+"?",
			text: "No vas a poder recuperarlo",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#692B8D",
			confirmButtonText: "Si, eliminalo!",
			closeOnConfirm: false
		},function(isConfirmed) {
			if(isConfirmed){
				Patrullas.delete(patrulla.id).then(function (s) {
					SweetAlert.swal({
						title: "Eliminado!",
						text: ''+patrulla.nombre+' ha sido eliminado correctamente',
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
			}
		});
	}

	//Modal
	$scope.showAgregarPatrulla = function(ev) {
		$mdDialog.show({
			controller: function($scope){
				$scope.patrulla = {};
				$scope.patrulla.foto = 'img/fpo_avatar_multi.png';
				PatrullaProcess($scope);
				// Modal Actions
				$scope.cancel = function(){
					$mdDialog.cancel(); 
				};

				$scope.save = function(){
					console.log($scope.patrulla);
					$mdDialog.hide($scope.patrulla);	
				};
			},
			templateUrl: '/dialogs/agregarpatrulla.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: 'false' // Only for -xs, -sm breakpoints.
		})
		.then(function(patrulla) {
			if (patrulla.myImage == 'img/fpo_avatar_multi.png') {
				patrulla.foto = 'img/fpo_avatar_multi.png';
			}
			
			patrulla.user_id = $rootScope.user.id;
			console.log(patrulla);
			Patrullas.new(patrulla).then(function (patrulla) {
				SweetAlert.swal({
					title: "Exito!",
					text: ''+patrulla.nombre+' Fue Agregado Correctamente',
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
	        	console.log(error);
	        	SweetAlert.swal("Ooops..", "Ocurrio un error: "+error.data, "error");
	        });
		}, function() {
			
		});
		
	}//end modal
});//end patrullasCtrl

app.controller('patrullaCtrl',function($scope,$rootScope, $route, $location, SweetAlert, $routeParams, Patrullas){
	
	Patrullas.get($routeParams.id, $routeParams.nombre).then(function(patrulla) {
		// body...
		$scope.patrulla = patrulla[0];
		console.log($scope.patrulla);
		$rootScope.currentRoute='Patrulla '+$scope.patrulla.nombre;
		PatrullaProcess($scope);
	});
	// console.log($scope.patrulla);

	$scope.save = function(){
		if ($scope.patrulla.myImage == 'img/fpo_avatar_multi.png') {
			$scope.patrulla.foto = 'img/fpo_avatar_multi.png';
		}
		// 'Exito', ''+patrulla.nombre+' Fue Agregad'+s+' Correctamente'
		$scope.patrulla.user_id = $rootScope.user.id
		Patrullas.update($scope.patrulla).then(function (patrulla) {
			SweetAlert.swal({
			   title: "Exito!",
			   text: ''+$scope.patrulla.nombre+' Fue Editado Correctamente',
			   type: "success",
			   showCancelButton: false,
			   confirmButtonColor: "#692B8D",
			   confirmButtonText: "Ok!",
			   closeOnConfirm: true}, 
			function(){ 
				$location.path('/patrulla/'+$scope.patrulla.id+'/'+$scope.patrulla.nombre);
			});
        })
        .catch(function (error) {
        	console.log(error)
        	SweetAlert.swal("Ooops..", "Ocurrio un error: "+error.data, "error");
        });
	};
}); // end patrullaCtrl

function PatrullaProcess($scope) {
	// ImageCrop
	$scope.patrulla.myImage='img/fpo_avatar_multi.png';
	if($scope.patrulla.foto != 'img/fpo_avatar_multi.png'){
		$scope.patrulla.myImage = $scope.patrulla.foto;
	}

	$scope.defaultFoto = function($event) {
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.patrulla.foto = 'img/fpo_avatar_multi.png';
		$scope.patrulla.myImage='img/fpo_avatar_multi.png';
	};
}//en patrullCtrl
