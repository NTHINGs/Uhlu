app.controller('editarPerfilCtrl', function($scope, $rootScope, SweetAlert, EditarPerfil){
    $scope.user = $rootScope.user;
    
    EditarPerfil.getProvincias().then(function(provincias){
        $scope.provincias = provincias;
    });

    $scope.save = function(){
        EditarPerfil.editarPerfil($scope.user).then(function(){
            SweetAlert.swal({
                title: "Exito!",
                text: 'Perfil Editado Correctamente',
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
        .catch(function(error){
            console.log(error);
        });
    }
});
