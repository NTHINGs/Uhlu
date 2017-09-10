app.service('Config', function($http, $q) {
    return {
        insigniasPorSeccion: function(seccion){
            var deferred = $q.defer();
            $http
            .get('/config/insigniasPorSeccion/' + seccion)
            .then(function (response) {
                deferred.resolve(response.data);
            })
            .catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        radiosFichaMedica: function(){
            var deferred = $q.defer();
            $http
            .get('/config/radiosFichaMedica')
            .then(function (response) {
                deferred.resolve(response.data);
            })
            .catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        getHost: function(){
            var deferred = $q.defer();
            $http
            .get('/config/host')
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
  
