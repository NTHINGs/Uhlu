app.directive('loading', ['$http' ,function ($http)  
{  
    return {  
        restrict: 'A',  
        template: '<div class="loading-spiner"><img class="center-block" src="img/loading.gif" /> </div>',  
        link: function (scope, elm, attrs){  
            scope.isLoading = function () {  
                return $http.pendingRequests.length > 0;  
            };  
 
            scope.$watch(scope.isLoading, function (v){  
                if(v){  
                    jQuery(elm).show();  
                }else{  
                    jQuery(elm).hide();  
                }  
            });  
        }  
    };  
}]);
