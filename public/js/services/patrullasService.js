app.service('patrullas', function($http) {
	this.getPatrullas = function (idscout) {
		return $http.get('json/patrullas.json').then(function(data) {
			return data.data
		});
		// return [];
	};

	this.getNombrePatrulla = function(idpatrulla) {
		return $http.get('json/patrullas.json').then(function(data) {
			var nombre = "";
			data.data.forEach(function(patrulla) {
				if(patrulla.idpatrulla == idpatrulla) nombre=patrulla.nombre;
			});
			return nombre;
		});
	};

	this.getPatrulla = function(idpatrulla) {
		return $http.get('json/patrullas.json').then(function(data) {
			var p = {};
			data.data.forEach(function(patrulla) {
				if(patrulla.idpatrulla == idpatrulla) p=patrulla;
			});
			return p;
		});
	}

	//TODO
	this.setPatrulla;
});