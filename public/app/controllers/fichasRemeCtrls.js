app.controller('fichasCtrl', function($scope, $rootScope, $route, SweetAlert, $mdDialog, Fichas){
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	$rootScope.currentRoute='Tus Fichas';
	$scope.fichas = [];
	Fichas.all().then(function(fichas) {
		// TODO
		$scope.fichas = fichas		
		console.log($scope.fichas);
	});

	// Lazy Load
	$scope.fichasDisplayed = 2;
	$scope.loadMore = function(){
		$scope.fichasDisplayed += 2;
	};
	//Modal
	$scope.showAgregarFicha = function(ev) {
		$mdDialog.show({
			controller: function($scope){
				$scope.actividad = "Agregar";
				$scope.ficha = {};
				$scope.ficha.materiales = [];
				$scope.ficha.areadedesarrollo = "corporalidad";
				$scope.ficha.foto = 'img/fpo_avatar_multi.png';
				// Modal Actions
				$scope.cancel = function(){
					$mdDialog.cancel(); 
				};

				$scope.save = function(){
					$mdDialog.hide($scope.ficha);	
				};

				$scope.add = function($event){
					$event.preventDefault();
				   	$event.stopPropagation();
					$scope.ficha.materiales.push({material: ''});
				}

				$scope.del = function(i, $event){
					$event.preventDefault();
				   	$event.stopPropagation();
					$scope.ficha.materiales.splice(i,1);
				}
			},
			templateUrl: '/dialogs/agregarFichaReme.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: 'false' // Only for -xs, -sm breakpoints.
		})
		.then(function(ficha) {
			ficha.seccion = $rootScope.user.seccion;
			var materiales = "";
			ficha.materiales.forEach(function(material) {
				materiales += material.material +'<br>';
			});
			ficha.materiales = materiales;
			ficha.autor = $rootScope.user.id;

			console.log(ficha);
			Fichas.new(ficha).then(function (ficha) {
				SweetAlert.swal({
					title: "Exito!",
					text: ''+ficha.nombreactividad+' Fue Agregado Correctamente',
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
	$scope.parseArea = $rootScope.parseArea;
	$scope.parseObjetivo = $rootScope.parseObjetivo;
});//end fichasCtrl

app.controller('fichaCtrl',function($scope, $rootScope, $route,$routeParams, $location, SweetAlert, $mdDialog, Fichas){
	$scope.parseArea = $rootScope.parseArea;
	$scope.parseObjetivo = $rootScope.parseObjetivo;
	Fichas.get($routeParams.id).then(function(ficha) {
		// body...
		$scope.ficha = ficha[0];
		console.log($scope.ficha);
		$rootScope.currentRoute=$scope.ficha.nombreactividad;
	});

	$scope.imprimir = function(id, event){

	};
	//Modal
	$scope.editar = function(id, ev) {
		$mdDialog.show({
			controller: function($scope){
				// Modal Actions
				$scope.actividad = "Editar";
				console.log(id);
				Fichas.get(id).then(function(ficha) {
					// body...
					$scope.ficha = ficha[0];
					console.log($scope.ficha);
				});
				$scope.cancel = function(){
					$mdDialog.cancel(); 
				};

				$scope.save = function(){
					$mdDialog.hide($scope.ficha);	
				};

				$scope.add = function($event){
					$event.preventDefault();
				   	$event.stopPropagation();
					$scope.ficha.materiales.push({material: ''});
				}

				$scope.del = function(i, $event){
					$event.preventDefault();
				   	$event.stopPropagation();
					$scope.ficha.materiales.splice(i,1);
				}
			},
			templateUrl: '/dialogs/agregarFichaReme.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: 'false' // Only for -xs, -sm breakpoints.
		})
		.then(function(ficha) {
			ficha.seccion = $rootScope.user.seccion;
			var materiales = "";
			ficha.materiales.forEach(function(material) {
				materiales += material.material +'<br>';
			});
			ficha.materiales = materiales;
			ficha.autor = $rootScope.user.id;

			console.log(ficha);
			Fichas.update(ficha).then(function (ficha) {
				SweetAlert.swal({
					title: "Exito!",
					text: 'La Ficha '+ficha.nombreactividad+' Fue Editada Correctamente',
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
		
	};//end modal

	$scope.eliminar = function(){
		SweetAlert.swal({
			title: "Estas seguro de querer eliminar la ficha "+$scope.ficha.nombreactividad+"?",
			text: "No vas a poder recuperarla",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#692B8D",
			confirmButtonText: "Si, eliminala!",
			closeOnConfirm: false
		},function(isConfirmed) {
			if(isConfirmed){
				Fichas.delete($scope.ficha.id).then(function (s) {
					SweetAlert.swal({
						title: "Eliminada!",
						text: 'La Ficha '+$scope.ficha.nombreactividad+' ha sido eliminada correctamente',
						type: "success",
						showCancelButton: false,
						confirmButtonColor: "#692B8D",
						confirmButtonText: "Ok!",
						closeOnConfirm: true
					}, 
					function(){ 
						console.log("EXITO");
						$location.path("/fichasreme");
					});
				})
				.catch(function (error) {
					SweetAlert.swal("Ooops..", "Ocurrio un error: "+error.data, "error");
				});
			}
		});
	};
}); // end fichaCtrl

