app.controller('fichasCtrl', function($scope, $rootScope, $route, $location, $timeout, $document, SweetAlert, $mdDialog, Fichas){
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
	$scope.showAgregarFicha = function(ev) {
		$mdDialog.show({
			controller: function($scope){
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

	$scope.parseArea = function(seccion, area){
		var nuevaarea = "";
		switch (seccion) {
			case 'manada':
				switch(area){
					case "corporalidad":
						nuevaarea = "Bagheera (Corporalidad)";
					case "creatividad":
						nuevaarea = "Kaa (Creatividad)";
					case "caracter":
						nuevaarea = "Baloo (Carácter)";
					case "afectividad":
						nuevaarea = "Rikki-Tikki-Tavi (Afectividad)";
					case "sociabilidad":
						nuevaarea = "Kotick (Sociabilidad)";
					case "espiritualidad":
						nuevaarea = "Francisco de Asís (Espiritualidad)";
				};
				break;
			case 'tropa':
				switch(area){
					case "corporalidad":
						nuevaarea = "Pez (Corporalidad)";
					case "creatividad":
						nuevaarea = "Ave (Creatividad)";
					case "caracter":
						nuevaarea = "Tortuga (Carácter)";
					case "afectividad":
						nuevaarea = "Flor (Afectividad)";
					case "sociabilidad":
						nuevaarea = "Abeja (Sociabilidad)";
					case "espiritualidad":
						nuevaarea = "Árbol (Espiritualidad)";
				};
				break;
			case 'comunidad':
				switch(area){
					case "corporalidad":
						nuevaarea = "Delfín (Corporalidad)";
					case "creatividad":
						nuevaarea = "Ave (Creatividad)";
					case "caracter":
						nuevaarea = "Caballo (Carácter)";
					case "afectividad":
						nuevaarea = "Flor (Afectividad)";
					case "sociabilidad":
						nuevaarea = "Abeja (Sociabilidad)";
					case "espiritualidad":
						nuevaarea = "Árbol (Espiritualidad)";
				};
				break;
			case 'clan':
				switch(area){
					case "corporalidad":
						nuevaarea = "Corporalidad";
					case "creatividad":
						nuevaarea = "Creatividad";
					case "caracter":
						nuevaarea = "Carácter";
					case "afectividad":
						nuevaarea = "Afectividad";
					case "sociabilidad":
						nuevaarea = "Sociabilidad";
					case "espiritualidad":
						nuevaarea = "Espiritualidad";
				};
				break;

			return nuevaarea
		}
		
	};//end parseArea
});//end fichasCtrl

app.controller('fichaCtrl',function($scope,$rootScope, $route, $location, SweetAlert, $routeParams, Fichas){
	
	Fichas.get($routeParams.id).then(function(ficha) {
		// body...
		$scope.ficha = ficha[0];
		console.log($scope.ficha);
		$rootScope.currentRoute=$scope.ficha.nombreactividad;
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
			   text: ''+$scope.ficha.nombreactividad+' Fue Editado Correctamente',
			   type: "success",
			   showCancelButton: false,
			   confirmButtonColor: "#692B8D",
			   confirmButtonText: "Ok!",
			   closeOnConfirm: true}, 
			function(){ 
				$location.path('/ficha/'+$scope.ficha.id);
			});
        })
        .catch(function (error) {
        	console.log(error)
        	SweetAlert.swal("Ooops..", "Ocurrio un error: "+error.data, "error");
        });
	};
}); // end fichaCtrl

