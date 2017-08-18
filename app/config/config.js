module.exports = { 
    areaYObjetivoPorSeccion: function(seccion, areadedesarrollo) {
        var data = {
            objetivo: "",
            area: ""
        };
        switch (seccion) {
            case 'manada':
                data.objetivo = "Presa";
                switch(areadedesarrollo){
                    case "corporalidad":
                        data.area = "Bagheera (Corporalidad)";
                        break;
                    case "creatividad":
                        data.area = "Kaa (Creatividad)";
                        break;
                    case "caracter":
                        data.area = "Baloo (Carácter)";
                        break;
                    case "afectividad":
                        data.area = "Rikki-Tikki-Tavi (Afectividad)";
                        break;
                    case "sociabilidad":
                        data.area = "Kotick (Sociabilidad)";
                        break;
                    case "espiritualidad":
                        data.area = "Francisco de Asís (Espiritualidad)";
                        break;
                };
                break;
            case 'tropa':
                data.objetivo = "Territorio";
                switch(areadedesarrollo){
                    case "corporalidad":
                        data.area = "Pez (Corporalidad)";
                        break;
                    case "creatividad":
                        data.area = "Ave (Creatividad)";
                        break;
                    case "caracter":
                        data.area = "Tortuga (Carácter)";
                        break;
                    case "afectividad":
                        data.area = "Flor (Afectividad)";
                        break;
                    case "sociabilidad":
                        data.area = "Abeja (Sociabilidad)";
                        break;
                    case "espiritualidad":
                        data.area = "Árbol (Espiritualidad)";
                        break;
                };
                break;
            case 'comunidad':
                data.objetivo = "Desafío";
                switch(areadedesarrollo){
                    case "corporalidad":
                        data.area = "Delfín (Corporalidad)";
                        break;
                    case "creatividad":
                        data.area = "Ave (Creatividad)";
                        break;
                    case "caracter":
                        data.area = "Caballo (Carácter)";
                        break;
                    case "afectividad":
                        data.area = "Flor (Afectividad)";
                        break;
                    case "sociabilidad":
                        data.area = "Abeja (Sociabilidad)";
                        break;
                    case "espiritualidad":
                        data.area = "Árbol (Espiritualidad)";
                        break;
                };
                break;
            case 'clan':
                data.objetivo = "Área de Desarrollo";
                switch(areadedesarrollo){
                    case "corporalidad":
                        data.area = "Corporalidad";
                        break;
                    case "creatividad":
                        data.area = "Creatividad";
                        break;
                    case "caracter":
                        data.area = "Carácter";
                        break;
                    case "afectividad":
                        data.area = "Afectividad";
                        break;
                    case "sociabilidad":
                        data.area = "Sociabilidad";
                        break;
                    case "espiritualidad":
                        data.area = "Espiritualidad";
                        break;
                };
                break;
        };

        return data;
    },
    insigniasPorSeccion: function(seccion){
        var data = {};
        data.insignias ={
            "promesa":{
                "nombre": "promesa",
                "opciones":{
                    "uno": "NO",
                    "dos": "SI"
                },
                "especial":true,
                "seccion":null
            },
            "etapa":{
                "nombre": "etapa",
                "opciones":{
        
                },
                "especial":false
            },
            "deporte":{
                "nombre": "deporte",
                "opciones":{
                    "amarilla ": "Amarilla",
                    "verde ": "Verde",
                    "azul ": "Azul",
                    "roja ": "Roja"
                },
                "especial":false,
                "seccion":null
            },
            "ecologia":{
                "nombre": "ecologia",
                "opciones":{
                    "amarilla ": "Amarilla",
                    "verde ": "Verde",
                    "azul ": "Azul",
                    "roja ": "Roja"
                },
                "especial":false,
                "seccion":null
            },
            "expresion":{
                "nombre": "expresion",
                "opciones":{
                    "amarilla ": "Amarilla",
                    "verde ": "Verde",
                    "azul ": "Azul",
                    "roja ": "Roja"
                },
                "especial":false,
                "seccion":null
            },
            "humanidades":{
                "nombre": "humanidades",
                "opciones":{
                    "amarilla ": "Amarilla",
                    "verde ": "Verde",
                    "azul ": "Azul",
                    "roja ": "Roja"
                },
                "especial":false,
                "seccion":null
            },
            "rescate":{
                "nombre": "rescate",
                "opciones":{
                    "amarilla ": "Amarilla",
                    "verde ": "Verde",
                    "azul ": "Azul",
                    "roja ": "Roja"
                },
                "especial":false,
                "seccion":null
            },
            "ciencia":{
                "nombre": "ciencia",
                "opciones":{
                    "amarilla ": "Amarilla",
                    "verde ": "Verde",
                    "azul ": "Azul",
                    "roja ": "Roja"
                },
                "especial":false,
                "seccion":null
            },
            "vida":{
                "nombre": "vida",
                "opciones":{
                    "amarilla ": "Amarilla",
                    "verde ": "Verde",
                    "azul ": "Azul",
                    "roja ": "Roja"
                },
                "especial":false,
                "seccion":null
            },
            "desarrollo":{
                "nombre": "desarrollo",
                "opciones":{
        
                },
                "especial":false
            },
            "enlace":{
                "nombre": "enlace",
                "opciones":{
                    "uno": "NO",
                    "dos": "SI"
                },
                "especial":true
            }
        };
        switch (seccion) {
			case 'manada':
				data.insignias.etapa.opciones.amarilla= "Lobo Pata Tierna";
				data.insignias.etapa.opciones.verde= "Lobo Saltador";
				data.insignias.etapa.opciones.azul= "Lobo Rastreador";
				data.insignias.etapa.opciones.roja= "Lobo Cazador";
				data.insignias.desarrollo.opciones.verde= "Kaniwuara";
				data.insignias.desarrollo.opciones.azul= "Waigunga";
				data.insignias.desarrollo.opciones.roja = "Seeonee";
				data.insignias.etapa.seccion='manada';
				data.insignias.desarrollo.seccion='manada';
				data.insignias.enlace.seccion='manada';
				data.objetivo="Presa";
				//Corporalidad
				data.area1="Bagheera (Corporalidad)";
				// Creatividad
				data.area2="Kaa (Creatividad)";
				// Caracter
				data.area3="Baloo (Carácter)";
				// Afectividad
				data.area4="Rikki-Tikki-Tavi (Afectividad)";
				// Sociabilidad
				data.area5="Kotick (Sociabilidad)";
				// Espiritualidad
				data.area6="Francisco de Asís (Espiritualidad)";
				data.totalseccion = 38;
				
				data.user.pequenogrupo= 'Seisena';
				data.user.clan= false;
				break;
			case 'tropa':
				data.insignias.etapa.opciones.amarilla= "Pista";
				data.insignias.etapa.opciones.verde= "Senda";
				data.insignias.etapa.opciones.azul= "Rumbo";
				data.insignias.etapa.opciones.roja= "Travesía";
				data.insignias.desarrollo.opciones.verde= "Mafeking";
				data.insignias.desarrollo.opciones.azul= "Paxtu";
				data.insignias.desarrollo.opciones.roja = "Brownsea";
				data.insignias.etapa.seccion='tropa';
				data.insignias.desarrollo.seccion='tropa';
				data.insignias.enlace.seccion='tropa';
				data.objetivo="Territorio";
				//Corporalidad
				data.area1="Pez (Corporalidad)";
				// Creatividad
				data.area2="Ave (Creatividad)";
				// Caracter
				data.area3="Tortuga (Carácter)";
				// Afectividad
				data.area4="Flor (Afectividad)";
				// Sociabilidad
				data.area5="Abeja (Sociabilidad)";
				// Espiritualidad
				data.area6="Arbol (Espiritualidad)";
				data.totalseccion = 38;

				data.user.pequenogrupo= 'Patrulla';
				data.user.clan= false;
				break;
			case 'comunidad':
				data.insignias.etapa.opciones.amarilla= "Búsqueda";
				data.insignias.etapa.opciones.verde= "Encuentro";
				data.insignias.etapa.opciones.azul= "Desafío";
				delete data.insignias.etapa.opciones.roja;
				data.insignias.desarrollo.opciones.verde= "Desarrollo Comunitario";
				data.insignias.desarrollo.opciones.azul= "Paz";
				data.insignias.desarrollo.opciones.roja = "Medio Ambiente";
				data.insignias.etapa.seccion='comunidad';
				data.insignias.desarrollo.seccion='comunidad';
				data.insignias.enlace.seccion='comunidad';
				data.objetivo="Desafío";
				//Corporalidad
				data.area1="Delfín (Corporalidad)";
				// Creatividad
				data.area2="Ave (Creatividad)";
				// Caracter
				data.area3="Caballo (Carácter)";
				// Afectividad
				data.area4="Flor (Afectividad)";
				// Sociabilidad
				data.area5="Abeja (Sociabilidad)";
				// Espiritualidad
				data.area6="Arbol (Espiritualidad)";
				data.totalseccion = 37;
				  
				data.user.pequenogrupo= 'Equipo';
				data.user.clan= false;
				break;
			case 'clan':
				data.insignias.etapa.opciones.amarilla= "Horquilla Amarilla";
				data.insignias.etapa.opciones.verde= "Horquilla Verde";
				data.insignias.etapa.opciones.azul= "Horquilla Azul";
				data.insignias.etapa.opciones.roja= "Horquilla Roja";
				delete data.insignias.desarrollo.opciones.verde;
				delete data.insignias.desarrollo.opciones.azul;
				data.insignias.desarrollo.opciones.roja = 'Scouts del Mundo';
				data.insignias.etapa.seccion='clan';
				data.insignias.desarrollo.seccion='clan';
				data.insignias.enlace.seccion='clan';
				data.objetivo="Área de Desarrollo";
				//Corporalidad
				data.area1="Corporalidad";
				// Creatividad
				data.area2="Creatividad";
				// Caracter
				data.area3="Carácter";
				// Afectividad
				data.area4="Afectividad";
				// Sociabilidad
				data.area5="Sociabilidad";
				// Espiritualidad
				data.area6="Espiritualidad";
				data.totalseccion = 31;
				data.user.clan= true;
				break;
        }
        
        return data;
    },
    radiosFichaMedica: function(){
        return [
            {
                "col":6,
                "label":"Padece de pie plano",
                "name":"pieplano",
                "especificacion":null
            },
            {
                "col":6,
                "label":"Usa zapato ortopédico",
                "name":"zapato",
                "especificacion":null
            },
            {
                "col":6,
                "label":"Operación reciente",
                "name":"operacion",
                "especificacion":"espoperacion"
            },
            {
                "col":6,
                "label":"Tiene alguna limitación física",
                "name":"limitacion",
                "especificacion":"esplimitacion"
            },
            {
                "col":6,
                "label":"Se ha realizado alguna transfución sanguínea",
                "name":"transfusion",
                "especificacion":"esptransfusion"
            },
            {
                "col":6,
                "label":"Tiene alguna alergia o reacción a medicamentos o alimentos",
                "name":"alergia",
                "especificacion":"espalergia"
            },
            {
                "col":6,
                "label":"Padece alguna enfermedad como diabetes o hipertensión",
                "name":"enfermedad",
                "especificacion":"espenfermedad"
            },
            {
                "col":6,
                "label":"Actualmente esta bajo tratamiento médico",
                "name":"tratamiento",
                "especificacion":"esptratamiento"
            },
            {
                "col":6,
                "label":"Tiene problemas para oír o ver",
                "name":"veroir",
                "especificacion":"espveroir"
            },
            {
                "col":6,
                "label":"Utiliza algún aparato auditivo, dental o prótesis",
                "name":"aparato",
                "especificacion":"espaparato"
            },
            {
                "col":6,
                "label":"Cuenta con alguna dieta especial",
                "name":"dieta",
                "especificacion":"espdieta"
            },
            {
                "col":6,
                "label":"Fuma, toma o consume droga(s)",
                "name":"drogas",
                "especificacion":"espdrogas"
            },
            {
                "col":12,
                "label":"Cuenta con el Esquema nacional de vacunación completo",
                "name":"vacunas",
                "especificacion":null
            },
            {
                "col":12,
                "label":"En caso de ser mujer, ¿Se encuentra embarazada?",
                "name":"embarazo",
                "especificacion":null
            }
        ];
    }
};