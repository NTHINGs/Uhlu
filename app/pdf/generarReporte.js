var PdfPrinter = require('pdfmake/src/printer');
var path = require('path');
var config = require('../config/config');

var fontDescriptors = {
    Roboto: {
        normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
    }
};

function fichaTranslate(value){
    return value == 1 ? "SI" : value == 0 ? "NO" : null;
}

function parseFecha(fecha){
    if(fecha != null){
        return fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
    }else{
        return "SIN FECHA"
    }
}

module.exports = {
    generarDirectorio(Scouts) {
        var rows = [[
            { text: 'FOTO', style: 'morrarro' }, 
            { text: 'CUM', style: 'morrarro' }, 
            { text: 'NOMBRE', style: 'morrarro' }, 
            { text: 'PATRULLA', style: 'morrarro' }, 
            { text: 'GÉNERO', style: 'morrarro' }, 
            { text: 'FECHA DE NACIMIENTO', style: 'morrarro' }, 
            { text: 'ESCUELA', style: 'morrarro' }, 
            { text: 'E-MAIL', style: 'morrarro' },
            { text: 'TELÉFONO', style: 'morrarro' }, 
            { text: 'DOMICILIO', style: 'morrarro' },
        ]];
        for(var i = 0; i < Scouts.length; i++){
            // 'FOTO' 'CUM' 'NOMBRE' 'GÉNERO' 'FECHA DE NACIMIENTO' 'ESCUELA' 'E-MAIL' 'TELÉFONO' 'DOMICILIO'
            if(Scouts[i].dataValues.foto == 'img/fpo_avatar.png'){
                Scouts[i].dataValues.foto = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4NDVBNjNDM0I2MzMxMUUyOENFQkU3QThERDgyMjRFMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4NDVBNjNDNEI2MzMxMUUyOENFQkU3QThERDgyMjRFMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU4OTQxQUVBQjYzMjExRTI4Q0VCRTdBOEREODIyNEUxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg0NUE2M0MyQjYzMzExRTI4Q0VCRTdBOEREODIyNEUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ctBxFQAAAWVQTFRFgYGBgoKC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';
            }
            rows.push([ 
                {
                    image: Scouts[i].dataValues.foto,
                    width: 50,
                    height: 50
                }, 
                { text: Scouts[i].dataValues.cum},
                { text: Scouts[i].dataValues.nombre},
                { text: Scouts[i].dataValues.Patrulla.dataValues.nombre},
                { text: Scouts[i].dataValues.genero},
                { text: '' + Scouts[i].dataValues.fechanacimiento.getDate() + '/' + (Scouts[i].dataValues.fechanacimiento.getMonth() + 1) + '/' + Scouts[i].dataValues.fechanacimiento.getFullYear() + ''},
                { text: Scouts[i].dataValues.escuela},
                { text: Scouts[i].dataValues.email},
                { text: Scouts[i].dataValues.telefono},
                { text: Scouts[i].dataValues.domicilio},
            ]);
        }
        // PDF Content
        var dd= {
            info: {
                title: 'Directorio',
                author: 'Uhlu',
                subject: 'Directorio',
                keywords: 'scouts',
                creator: 'http://uhluscout.com'
            },
            pageOrientation: 'landscape',
            content: [
                {
                    layout: 'noBorders',
                    table: {
                        headerRows: 0,
                        widths: [ '*', '*'],
                        
                        body: [
                            [ { image: path.join(__dirname, '/../../public/img/logo.png'), width: 80,height: 80}, { text: 'Directorio', style: 'header'}]
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'headerLineOnly',
                    table: {
                        headerRows: 1,
                        widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', '*' ],
                        body: []
                    },
                    style: 'marginBot'
                },
                { text: 'Directorio elaborado desde http://uhluscout.com', link: 'http://uhluscout.com', style: 'footer'}  
            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    alignment: 'right',
                    margin: [ 0, 0, 0, 25 ],
                    color: 'purple'
                },
                marginBot:{
                    margin: [ 0, 0, 0, 25 ]
                },
                morrarro:{
                    color: 'purple'
                },
                footer: {
                    bold: true,
                    alignment: 'right'
                },
            }
        };//end dd
        
        // Agregar Filas
        dd.content[1].table.body = rows;
        
        return new PdfPrinter(fontDescriptors).createPdfKitDocument(dd);
    },
    generarFichaMedica(Scouts, seccion) {
        
        var dd= {
            info: {
                title: 'FichasMedicas',
                author: 'Uhlu',
                subject: 'FichaMedicas',
                keywords: 'scouts',
                creator: 'http://uhluscout.com'
            },
            pageOrientation: 'Portrait',
            content: [],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    alignment: 'right',
                    margin: [ 0, 0, 0, 25 ],
                    color: 'purple'
                },
                marginBot:{
                    margin: [ 0, 0, 0, 25 ]
                },
                morrarro:{
                    color: 'purple'
                },
                footer: {
                    bold: true,
                    alignment: 'right'
                },
            }
        };//end dd

        // Generar una pagina por scout
        for(var i = 0; i < Scouts.length; i++){

            var page = [
                {
                    layout: 'noBorders',
                    table: {
                        headerRows: 0,
                        widths: [ '*', '*', '*'],
                        
                        body: [
                            [ { image: path.join(__dirname, '/../../public/img/logo.png'), width: 80,height: 80}, { text: 'Ficha Médica', style: 'header'}, { text: ''+Scouts[i].dataValues.nombre+'', style: 'header'}]
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'noBorders',
                    table: {
                        headerRows: 0,
                        widths: [ '*', '*'],
                        body: [
                            [ { text: 'CUM: '+ Scouts[i].dataValues.cum + '' , style: 'morrarro'}, { text: 'Sección: '+ seccion.charAt(0).toUpperCase() + seccion.slice(1) + '', style: 'morrarro'} ],
                            [ { text: 'Nombre: '+ Scouts[i].dataValues.nombre + '',  colSpan: 2 , style: 'morrarro'}, { text: ''} ],
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 0,
                        widths: [ '*', '*', '*'],
                        body: [
                            [ { text: 'En caso de emergencia comunicarse con', colSpan: 3 , style: 'morrarro'}, { text: ''}, { text: ''}],
                            [ { text: 'Nombre: '+ Scouts[i].dataValues.contacto1 + ''}, { text: 'Parentesco: '+ Scouts[i].dataValues.parentezco1 + '' }, { text:'Teléfono: '+ Scouts[i].dataValues.telefono1 + '' } ],
                            [ { text: 'Nombre: '+ Scouts[i].dataValues.contacto2 + ''}, { text: 'Parentesco: '+ Scouts[i].dataValues.parentezco2 + '' }, { text:'Teléfono: '+ Scouts[i].dataValues.telefono2 + '' } ],
                            [ { text: 'E-mail: '+ Scouts[i].dataValues.emailcontacto + '', colSpan: 3}, { text: '' }, { text:'' } ],
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 0,
                        widths: [ '*', '*'],
                        body: [
                            [ { text: 'Datos Médicos Generales', colSpan: 2 , style: 'morrarro'}, { text: ''}],
                            [ { text: 'Tipo de Sangre: '+ Scouts[i].dataValues.tiposangre + ''}, { text: 'Peso: '+ Scouts[i].dataValues.peso + '' }],
                            [ { text: 'Estatura: '+ Scouts[i].dataValues.estatura + ''}, { text: 'No. Afiliación: '+ Scouts[i].dataValues.noafiliacion + ''}],
                            [ { text: 'Seguro: '+ Scouts[i].dataValues.seguro + ''}, { text:'Especificación: '+ Scouts[i].dataValues.especifique + '' } ]
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 0,
                        widths: [ '*', '*'],
                        body: [
                            [ { text: 'Otros', colSpan: 2 , style: 'morrarro'}, { text: ''}],
                            [ { text: 'Padece de pie plano: '+ fichaTranslate(Scouts[i].dataValues.pieplano) + ''}, { text: 'Usa zapato ortopédico: '+ fichaTranslate(Scouts[i].dataValues.pieplano) + '' }],
                            [ { text: 'Operación reciente: '+ fichaTranslate(Scouts[i].dataValues.operacion) + ''}, { text: 'Especifique: '+ Scouts[i].dataValues.espoperacion + '' }],
                            [ { text: 'Tiene alguna limitación física: '+ fichaTranslate(Scouts[i].dataValues.limitacion) + ''}, { text: 'Especifique: '+ Scouts[i].dataValues.esplimitacion + '' }],
                            [ { text: 'Se ha realizado alguna transfusión sanguínea: '+ fichaTranslate(Scouts[i].dataValues.transfusion) + ''}, { text: 'Especifique: '+ Scouts[i].dataValues.esptransfusion + '' }],
                            [ { text: 'Tiene alguna alergia o reacción a medicamentos o alimentos: '+ fichaTranslate(Scouts[i].dataValues.alergia) + ''}, { text: 'Especifique: '+ Scouts[i].dataValues.espalergia + '' }],
                            [ { text: 'Padece alguna enfermedad como diabetes o hipertensión: '+ fichaTranslate(Scouts[i].dataValues.enfermedad) + ''}, { text: 'Especifique: '+ Scouts[i].dataValues.espenfermedad + '' }],
                            [ { text: 'Actualmente esta bajo tratamiento médico: '+ fichaTranslate(Scouts[i].dataValues.tratamiento) + ''}, { text: 'Especifique: '+ Scouts[i].dataValues.esptratamiento + '' }],
                            [ { text: 'Tiene problemas para oir o ver: '+ fichaTranslate(Scouts[i].dataValues.veroir) + ''}, { text: 'Especifique: '+ Scouts[i].dataValues.espveroir + '' }],
                            [ { text: 'Utiliza algún aparato auditivo, dental o prótesis: '+ fichaTranslate(Scouts[i].dataValues.aparato) + ''}, { text: 'Especifique: '+ Scouts[i].dataValues.espaparato + '' }],
                            [ { text: 'Cuenta con alguna dieta especial: '+ fichaTranslate(Scouts[i].dataValues.dieta) + ''}, { text: 'Especifique: '+ Scouts[i].dataValues.espdieta + '' }],
                            [ { text: 'Fuma, toma ó consume drogas: '+ fichaTranslate(Scouts[i].dataValues.drogas) + ''}, { text: 'Especifique: '+ Scouts[i].dataValues.espdrogas + '' }],
                            [ { text: 'Cuenta con el esquema nacional de vacunación completo: '+ fichaTranslate(Scouts[i].dataValues.vacunas) + '', colSpan: 2}, { text: ''}],
                            [ { text: 'En caso de ser mujer, ¿se encuentra embarazada?: '+ fichaTranslate(Scouts[i].dataValues.embarazo) + '', colSpan: 2}, { text: ''}]
                        ]
                    },
                    style: 'marginBot'
                }
            ];

            // Agregar salto de linea si existen mas scouts para formar otra pagina
            if(i != Scouts.length - 1){
                page.push({ text: 'Directorio elaborado desde http://uhluscout.com', link: 'http://uhluscout.com', style: 'footer', pageBreak: 'after'});
            }else{
                page.push({ text: 'Directorio elaborado desde http://uhluscout.com', link: 'http://uhluscout.com', style: 'footer'});
            }

            // Agregar la pagina
            dd.content.push(page);
        }
        
        return new PdfPrinter(fontDescriptors).createPdfKitDocument(dd);
    },
    generarCuadroAdelanto(Scouts, seccion) {
        var data = config.insigniasPorSeccion(seccion);
        var dd= {
            info: {
                title: 'CuadroDeAdelanto',
                author: 'Uhlu',
                subject: 'CuadroDeAdelanto',
                keywords: 'scouts',
                creator: 'http://uhluscout.com'
            },
            pageSize: 'A3',
            pageOrientation: 'landscape',
            pageMargins: 10,
            content: [
                {
                    layout: 'noBorders',
                    table: {
                        headerRows: 0,
                        widths: [ '*', '*'],
                        
                        body: [
                            [ { image: path.join(__dirname, '/../../public/img/logo.png'), width: 80,height: 80}, { text: 'Cuadro de Adelanto', style: 'header'}]
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 1,
                        widths: [ '8.33%', '8.33%', '8.33%', '8.33%', '8.33%', '8.33%', '8.33%', '8.33%', '8.33%', '8.33%', '8.33%', '8.33%'],                        
                        body: [
                            [ 
                                { text: ''},
                                { text: 'PROMESA', style: 'morrarro'},
                                { text: 'ETAPA', style: 'morrarro'},
                                { text: 'DEPORTES', style: 'morrarro'},
                                { text: 'ECOLOGIA', style: 'morrarro'},
                                { text: 'EXPRESION Y COMUNICACION', style: 'morrarro'},
                                { text: 'HUMANIDADES', style: 'morrarro'},
                                { text: 'SEGURIDAD Y RESCATE', style: 'morrarro'},
                                { text: 'CIENCIA Y TECNOLOGIA', style: 'morrarro'},
                                { text: 'VIDA AL AIRE LIBRE', style: 'morrarro'},
                                { text: 'DESARROLLO SUSTENTABLE', style: 'morrarro'},
                                { text: 'SENDA DE ENLACE', style: 'morrarro'},
                            ]
                        ]
                    },
                    style: 'marginBot'
                }
            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true,
                    alignment: 'right',
                    margin: [ 0, 0, 0, 25 ],
                    color: 'purple'
                },
                fecha: {
                    fontSize: 8,
                    margin: [ 0, 0, 0, 5]
                },
                marginBot:{
                    margin: [ 0, 0, 0, 25 ]
                },
                morrarro:{
                    fontSize: 10,
                    color: 'purple'
                },
                footer: {
                    bold: true,
                    alignment: 'right'
                },
            }
        };//end dd

        for(var i = 0; i < Scouts.length; i++){
            var row = [
                // TODO JUNTAR NOMBRE CON PATRULLA PARA PARSEO MAS SENCILLO
                {
                    columns:[
                        [
                            { text: ''+Scouts[i].dataValues.nombre+'', style: 'morrarro'},
                            { text: 'Patrulla: '+Scouts[i].dataValues.Patrulla.dataValues.nombre+'', style: 'morrarro'}
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/promesa_'+Scouts[i].dataValues.promesa+'.png'), width: 60,height: 60, alignment: 'center' }
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/'+seccion+'/etapa_'+Scouts[i].dataValues.etapa+'.png'), width: 60,height: 60, alignment: 'center' },
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/deporte_'+Scouts[i].dataValues.deporte+'.png'), width: 60,height: 60, alignment: 'center' },
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/ecologia_'+Scouts[i].dataValues.ecologia+'.png'), width: 60,height: 60, alignment: 'center' },
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/expresion_'+Scouts[i].dataValues.expresion+'.png'), width: 60,height: 60, alignment: 'center' },
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/humanidades_'+Scouts[i].dataValues.humanidades+'.png'), width: 60,height: 60, alignment: 'center' },
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/rescate_'+Scouts[i].dataValues.rescate+'.png'), width: 60,height: 60, alignment: 'center' },
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/ciencia_'+Scouts[i].dataValues.ciencia+'.png'), width: 60,height: 60, alignment: 'center' },
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/vida_'+Scouts[i].dataValues.vida+'.png'), width: 60,height: 60, alignment: 'center' },
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/'+seccion+'/desarrollo_'+Scouts[i].dataValues.desarrollo+'.png'), width: 60,height: 60, alignment: 'center' },
                        ]
                    ]
                },
                {
                    columns: [
                        [
                            { image: path.join(__dirname, '/../../public/img/insignias/'+seccion+'/enlace_'+Scouts[i].dataValues.enlace+'.png'), width: 60,height: 60, alignment: 'center' },
                        ]
                    ]
                }
            ];

            //columna, insignia (String), insignia (Valor)
            var insignias = Object.keys(data.insignias).map(function(key) {
                return data.insignias[key];
            });
            // insigniaValor = Scouts[i].dataValues.promesa
            // insignia = promesa
            var colores =['Amarilla', 'Verde', 'Azul', 'Roja'];
            for(var y = 0; y < 11; y++){
                console.log("INSIGNIA: "+insignias[y].nombre);
                console.log("VALOR: "+Scouts[i].dataValues[insignias[y].nombre]);
                for(var x = 0; x < (Scouts[i].dataValues[insignias[y].nombre] + 1); x++){
                    if(insignias[y].nombre != 'promesa' && insignias[y].nombre != 'etapa' && insignias[y].nombre != 'desarrollo' && insignias[y].nombre != 'senda'){
                        row[y+1].columns[0].push({ text: 'Fecha '+insignias[y].nombre.charAt(0).toUpperCase() + insignias[y].nombre.slice(1)+': ' + parseFecha(Scouts[i].dataValues['fecha'+insignias[y].nombre]) + ''});                
                    }else{
                        row[y+1].columns[0].push({ text: 'Fecha '+insignias[y].nombre.charAt(0).toUpperCase() + insignias[y].nombre.slice(1)+' '+colores[x]+': ' + parseFecha(Scouts[i].dataValues['fecha'+insignias[y].nombre]) + ''});                                    
                    }
                }
            }
            console.log(JSON.stringify(row));
            dd.content[1].table.body.push(row);
        }

        return new PdfPrinter(fontDescriptors).createPdfKitDocument(dd);
    }
};
