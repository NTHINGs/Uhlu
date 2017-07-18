app.service('Scouts', function($http, $q) {
	return {
		all: function(){
			var deferred = $q.defer();
			$http
			  .get('/scouts')
			  .then(function (response) {
			    deferred.resolve(response.data);
			  })
			  .catch(function (error) {
			    deferred.reject(error);
			  });
			  return deferred.promise;
		},
		new: function (scout) {
		  var deferred = $q.defer();
		  $http
		    .post('/scouts', scout)
		    .then(function (response) {
		      deferred.resolve(response.data);
		    })
		    .catch(function (error) {
		      deferred.reject(error);
		    });
		  return deferred.promise;
		},
		update: function(scout) {
			var deferred = $q.defer();
			$http
			  .put('/scouts', scout)
			  .then(function (response) {
			    deferred.resolve(response.data);
			  })
			  .catch(function (error) {
			    deferred.reject(error);
			  });
			return deferred.promise;
		},
		get: function(cum) {
			var deferred = $q.defer();
			$http
			  .get('/scouts/'+cum)
			  .then(function (response) {
			    deferred.resolve(response.data);
			  })
			  .catch(function (error) {
			    deferred.reject(error);
			  });
			  return deferred.promise;
		},
		delete: function(cum) {
			var deferred = $q.defer();
			$http
			  .delete('/scouts/'+cum)
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
