app.service('Fichas', function($http, $q) {
  return {
    all: function(){
      var deferred = $q.defer();
      $http
        .get('/fichas')
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
    },
    new: function (ficha) {
      var deferred = $q.defer();
      $http
        .post('/fichas', ficha)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    },
    update: function(ficha) {
      var deferred = $q.defer();
      $http
        .put('/fichas', ficha)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    },
    get: function(id) {
      var deferred = $q.defer();
      $http
        .get('/fichas/'+id)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
    },
    delete: function(id) {
      var deferred = $q.defer();
      $http
        .delete('/fichas/'+id)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
    },
    search: function(query) {
      var deferred = $q.defer();
      $http
        .get('/buscarficha/'+query)
        .then(function (response) {
          deferred.resolve(response.data);
        })
        .catch(function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
    },
  }
});
