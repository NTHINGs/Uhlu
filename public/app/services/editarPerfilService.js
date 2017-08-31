app.service('EditarPerfil', function($http, $q) {
    return {
        getProvincias: function(){
            var deferred = $q.defer();
            $http
            .get('http://www.scouts.org.mx/dirpro.html')
            .then(function(response){
                var html = response.data;
 
                deferred.resolve();
            })
            .catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
  });
  
