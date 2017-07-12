app.directive('resize', ['$window', function ($window) {

     return {
        link: link,
        restrict: 'E'            
     };

     function link(scope, element, attrs){

       angular.element($window).bind('resize', function(){
           scope.windowWidth = $window.innerWidth;
           console.log(scope.windowWidth);
       });    
     }    
 }]);