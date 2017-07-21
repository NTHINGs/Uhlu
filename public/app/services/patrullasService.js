app.service('Patrullas', function($http, $q) {
	return {
		all: function(id){
			var deferred = $q.defer();
			$http
			  .get('/patrullas/'+id)
			  .then(function (response) {
			    deferred.resolve(response.data);
			  })
			  .catch(function (error) {
			    deferred.reject(error);
			  });
			  return deferred.promise;
		},
		new: function (patrulla) {
		  var deferred = $q.defer();
		  $http
		    .post('/patrullas', patrulla)
		    .then(function (response) {
		      deferred.resolve(response.data);
		    })
		    .catch(function (error) {
		      deferred.reject(error);
		    });
		  return deferred.promise;
		},
		update: function(patrulla) {
			var deferred = $q.defer();
			$http
			  .put('/patrullas', patrulla)
			  .then(function (response) {
			    deferred.resolve(response.data);
			  })
			  .catch(function (error) {
			    deferred.reject(error);
			  });
			return deferred.promise;
		},
		get: function(id, nombre) {
			var deferred = $q.defer();
			$http
			  .get('/patrullas/'+id+'/'+nombre)
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
			  .delete('/patrullas/'+id)
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
