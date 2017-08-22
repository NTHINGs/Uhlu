app.service('Imprimir', function($http, $q) {
    return {
        generarReporte: function(tipo, print){
            var deferred = $q.defer();
            var body = {
                tipo: tipo,
                print: print
            }
            $http
            .post('/generarReporte', body)
            .then(function (response) {
                deferred.resolve(response.data);
            })
            .catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
  });
  
