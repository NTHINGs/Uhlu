app.service('scouts', function($http) {
	this.getScouts = function (idscout) {
		return $http.get('json/scouts.json').then(function(data) {
			return data.data
		});
		// return [];
	};

	this.getScout = function(cum) {
		return $http.get('json/scouts.json').then(function(data) {
			var s = {};
			data.data.forEach(function(scout) {
				if(scout.cum == cum) s=scout;
			});
			return s;
		});
	}

	//TODO
	this.setScout;
});