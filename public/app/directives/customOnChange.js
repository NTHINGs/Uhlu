app.directive('customOnChange', function() {
	return {
		require:"ngModel",
		restrict: 'A',
		link: function($scope, el, attrs, ngModel){
			el.bind('change', function(event){
				ngModel.$setViewValue(URL.createObjectURL(event.target.files[0]));
				$scope.$apply();
			});
		}
	};
});