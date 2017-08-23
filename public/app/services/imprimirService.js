app.service('Imprimir', function($http, $location) {
    return {
        generarReporte: function(tipo, print){
            var searchParams = {tipo:tipo, opcion:print.opcion};
            if(typeof(print.patrulla) != 'undefined'){
                searchParams.patrulla = print.patrulla;
            }
            $location.path('/generarReporte').search(searchParams);
        }
    }
  });
  
