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
            .then(function (data) {
                var file = new Blob([data], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
  });
  
