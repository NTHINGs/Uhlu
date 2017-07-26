app.controller('fichasCtrl', function($scope, $rootScope, $route, $location, SweetAlert, $mdDialog, Fichas){
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	$rootScope.currentRoute='Tus Fichas';
	$scope.fichas = [];
	Fichas.all($rootScope.user.id).then(function(fichas) {
		$scope.fichas = fichas;
		console.log(fichas)
	});

	$scope.buscar = function(ev) {
		Fichas.search($scope.busqueda.ficha)
		.then(function(fichas) {
			$scope.fichas = fichas;
		})
		.catch(function (error) {
			SweetAlert.swal("Ooops..", "Ocurrio un error: "+error.data, "error");
		});
	};

	$scope.borrar = function(ficha) {
		var ficha = ficha;
		SweetAlert.swal({
			title: "Estas seguro de querer eliminar a "+ficha.nombre+"?",
			text: "No vas a poder recuperarlo",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#692B8D",
			confirmButtonText: "Si, eliminalo!",
			closeOnConfirm: false
		},function(isConfirmed) {
			if(isConfirmed){
				Fichas.delete(ficha.id).then(function (s) {
					SweetAlert.swal({
						title: "Eliminado!",
						text: ''+ficha.nombre+' ha sido eliminado correctamente',
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
				$scope.ficha = {};
				$scope.ficha.foto = 'img/fpo_avatar_multi.png';
				FichaProcess($scope);
				// Modal Actions
				$scope.cancel = function(){
					$mdDialog.cancel(); 
				};

				$scope.save = function(){
					console.log($scope.ficha);
					$mdDialog.hide($scope.ficha);	
				};
			},
			templateUrl: '/dialogs/agregarficha.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: 'false' // Only for -xs, -sm breakpoints.
		})
		.then(function(ficha) {
			if (ficha.myImage == 'img/fpo_avatar_multi.png') {
				ficha.foto = 'img/fpo_avatar_multi.png';
			}
			
			ficha.user_id = $rootScope.user.id;
			console.log(ficha);
			Fichas.new(ficha).then(function (ficha) {
				SweetAlert.swal({
					title: "Exito!",
					text: ''+ficha.nombre+' Fue Agregado Correctamente',
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
});//end fichasCtrl

app.controller('fichaCtrl',function($scope,$rootScope, $route, $location, SweetAlert, $routeParams, Fichas){
	
	Fichas.get($routeParams.id, $routeParams.nombre).then(function(ficha) {
		// body...
		$scope.ficha = ficha[0];
		console.log($scope.ficha);
		$rootScope.currentRoute='Patrulla '+$scope.ficha.nombre;
		FichaProcess($scope);
	});
	// console.log($scope.ficha);

	$scope.save = function(){
		if ($scope.ficha.myImage == 'img/fpo_avatar_multi.png') {
			$scope.ficha.foto = 'img/fpo_avatar_multi.png';
		}
		// 'Exito', ''+ficha.nombre+' Fue Agregad'+s+' Correctamente'
		$scope.ficha.user_id = $rootScope.user.id
		Fichas.update($scope.ficha).then(function (ficha) {
			SweetAlert.swal({
			   title: "Exito!",
			   text: ''+$scope.ficha.nombre+' Fue Editado Correctamente',
			   type: "success",
			   showCancelButton: false,
			   confirmButtonColor: "#692B8D",
			   confirmButtonText: "Ok!",
			   closeOnConfirm: true}, 
			function(){ 
				$location.path('/ficha/'+$scope.ficha.id+'/'+$scope.ficha.nombre);
			});
        })
        .catch(function (error) {
        	console.log(error)
        	SweetAlert.swal("Ooops..", "Ocurrio un error: "+error.data, "error");
        });
	};
}); // end fichaCtrl

function FichaProcess($scope) {
	// ImageCrop
	$scope.ficha.myImage='img/fpo_avatar_multi.png';
	if($scope.ficha.foto != 'img/fpo_avatar_multi.png'){
		$scope.ficha.myImage = $scope.ficha.foto;
	}

	$scope.defaultFoto = function($event) {
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.ficha.foto = 'img/fpo_avatar_multi.png';
		$scope.ficha.myImage='img/fpo_avatar_multi.png';
	};
}//en patrullCtrl
