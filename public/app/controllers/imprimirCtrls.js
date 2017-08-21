app.controller('imprimirCtrl', function($scope, $rootScope, $mdDialog, Patrullas){
    $scope.patrullaClicked = false;

    Patrullas.all($rootScope.user.id).then(function(patrullas) {
        $scope.patrullas = patrullas;
    });
	$scope.cancel = function(){
        $mdDialog.cancel(); 
    };
});
