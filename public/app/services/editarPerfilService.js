app.service('EditarPerfil', function($http, $q) {
    return {
        getProvincias: function(){
            var deferred = $q.defer();
            $http
            .get('/config/provincias')
            .then(function(response){ 
                deferred.resolve(response.data);
            })
            .catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        editarPerfil: function(user){
            var deferred = $q.defer();
            $http
            .put('/users', user)
            .then(function(response){ 
                deferred.resolve(response.data);
            })
            .catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
  });
  
