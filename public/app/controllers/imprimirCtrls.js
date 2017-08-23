app.controller('imprimirCtrl', function($scope, $rootScope, $mdDialog, Patrullas, Imprimir){
    $scope.patrullaClicked = false;

    Patrullas.all($rootScope.user.id).then(function(patrullas) {
        $scope.patrullas = patrullas;
    });

    $scope.generarReporte = function(tipo){
        console.log(tipo);
        Imprimir.generarReporte(tipo, $scope.print);
        
    };

	$scope.cancel = function(){
        $mdDialog.cancel(); 
    };
});
