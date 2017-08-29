app.directive('loading', ['$http' ,function ($http)  
{  
    return {  
        restrict: 'A',  
        template: '<div class="loading-spiner"><img src="img/loading.gif" /> </div>',  
        link: function (scope, elm, attrs){  
            scope.isLoading = function () {  
                return $http.pendingRequests.length > 0;  
            };  
 
            scope.$watch(scope.isLoading, function (v){  
                console.log(elm);
                if(v){  
                    elm[0].show();  
                }else{  
                    elm[0].hide();  
                }  
            });  
        }  
    };  
}]);
