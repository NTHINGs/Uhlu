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
                console.log(data);
                var file = new Blob([data], {type: 'application/pdf'});
                console.log(file);
                var fileURL = URL.createObjectURL(file);
                console.log(fileURL);
                window.open(fileURL);
            })
            .catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
  });
  
