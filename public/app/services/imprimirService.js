app.service('Imprimir', function($http, $window) {
    return {
        generarReporte: function(tipo, print){
            var patrulla = '';
            if(typeof(print.patrulla) != 'undefined'){
                patrulla = '&patrulla=' + print.patrulla;
            }
            $window.location.href = '/generarReporte?tipo=' + tipo + '&opcion=' + print.opcion + patrulla;
        }
    }
  });
  
