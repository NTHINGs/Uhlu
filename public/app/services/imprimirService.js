app.service('Imprimir', function($http, $location) {
    return {
        generarReporte: function(tipo, print){
            $location.path('/generarReporte/' + tipo + '/' + print.opcion + '/' + print.patrulla)
        }
    }
  });
  
