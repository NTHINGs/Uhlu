app.controller('imprimirCtrl', function($scope, $rootScope, $http, $location, Config){
    $scope.patrullaClicked = false;
	$scope.cancel = function(){
        $mdDialog.cancel(); 
    };
});
