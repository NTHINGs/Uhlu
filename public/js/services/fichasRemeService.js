app.service('fichasReme', function($http) {
	this.getFichasReme = function () {
		return $http.get('json/fichasReme.json').then(function(data) {
			return data.data
		});
		// return [];
	};

	this.getFichaReme = function(idfichareme) {
		return $http.get('json/fichasReme.json').then(function(data) {
			var f = {};
			data.data.forEach(function(fichareme) {
				if(fichareme.idfichareme == idfichareme) f=fichareme;
			});
			return f;
		});
	}

	// //TODO
	// this.setPatrulla;
});