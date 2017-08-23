app.service('Imprimir', function($http, $location) {
    return {
        generarReporte: function(tipo, print){
            var patrulla = '';
            if(typeof(print.patrulla) != 'undefined'){
                patrulla = '&patrulla' + print.patrulla;
            }
            $location.path('/generarReporte?tipo=' + tipo + '&opcion=' + print.opcion + patrulla)
        }
    }
  });
  
