app.controller('fichasRemeCtrl', function($scope, $rootScope, $location, SweetAlert,fichasReme) {
	$rootScope.currentRoute='Banco de Fichas Reme';
	// Inicializar variables utilizadas en todo el codigo y que provienen de la sesion del usuario
	$scope.fichasreme = [];
	fichasReme.getFichasReme(1).then(function(fichasreme) {
		$scope.fichasreme = fichasreme;
	});

	// TODO Hacerlo con una peticion get
	//Modal
	$scope.modal = function() {
		dlg = $dialogs.create('/views/dialogs/agregarfichareme.html','agregarFichaRemeCtrl',{},{key: true,back: 'static', size:'lg'});
		dlg.result.then(function(fichareme){
			SweetAlert.swal({
			   title: "Exito!",
			   text: ''+fichareme.nombreactividad+' Fue Agregada Correctamente',
			   type: "success",
			   showCancelButton: false,
			   confirmButtonColor: "#692B8D",
			   confirmButtonText: "Ok!",
			   closeOnConfirm: true}, 
			function(){ 
				console.log("EXITO");
				$location.path('/fichasreme');
			});
        },function(){
        	//Close Fallback 
        });	
	}//end modal
});

app.controller('agregarFichaRemeCtrl',function($scope,$rootScope, $modalInstance,data, fichasReme){
	$scope.fichareme = {};
	$scope.fichareme.area = "corporalidad";

	$scope.fichareme.materiales = [];
	$scope.add = function($event){
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.fichareme.materiales.push({material: ''});
	}

	$scope.del = function(i, $event){
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.fichareme.materiales.splice(i,1);
	}
	// Modal Actions
	$scope.cancel = function(){
		$modalInstance.dismiss('canceled');  
	};

	$scope.save = function(){
		$modalInstance.close($scope.fichareme);
	};
}); // end agregarPatrulaCtrl

app.controller('fichaRemeCtrl',function($scope,$rootScope, $dialogs, $location, SweetAlert, $routeParams, fichasReme){
	$scope.fichareme = {};

	fichasReme.getFichaReme($routeParams.id).then(function(fichareme){
		$scope.fichareme = fichareme;
		console.log($scope.fichareme)
	});

	$scope.add = function($event){
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.fichareme.materiales.push({material: ''});
	}

	$scope.del = function(i, $event){
		$event.preventDefault();
	   	$event.stopPropagation();
		$scope.fichareme.materiales.splice(i,1);
	}
	// Modal Actions
	$scope.cancel = function(){
		$modalInstance.dismiss('canceled');  
	};

	$scope.save = function(){
		// 'Exito', ''+patrulla.nombre+' Fue Agregad'+s+' Correctamente'
		SweetAlert.swal({
		   title: "Exito!",
		   text: ''+$scope.fichareme.nombreacividad+' Fue Editada Correctamente',
		   type: "success",
		   showCancelButton: false,
		   confirmButtonColor: "#692B8D",
		   confirmButtonText: "Ok!",
		   closeOnConfirm: true}, 
		function(){ 
			$location.path('/fichareme/'+$scope.fichareme.idfichareme+'/'+$scope.patrulla.nombre);
		});
	};
}); // end patrullaCtrl
