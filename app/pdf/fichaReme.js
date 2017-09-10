var PdfPrinter = require('pdfmake/src/printer');
var path = require('path');
var config = require('../config/config');

module.exports = { 
    pdf: function(Ficha) {
        // Parsear area de desarrollo
        var areaYObjetivoPorSeccion = config.areaYObjetivoPorSeccion(Ficha.seccion, Ficha.areadedesarrollo);
        var areadedesarrollo = areaYObjetivoPorSeccion.area;
        var nombrearea = areaYObjetivoPorSeccion.nombrearea;
        // Validar Ficha para reemplazar nulos por strings vacios, para que no aparezca "null" en el pdf
        var fichaTemp = JSON.stringify(Ficha, function(key, value){
            if(value === null){
                return "";
            }
            // Primera letra mayuscula en la seccion
            if(key == "seccion"){
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
            return value;
        });
        Ficha = JSON.parse(fichaTemp);
        // Parsear materiales string a array
        var materiales =[];
        Ficha.materiales.split("</br>").slice(0,Ficha.materiales.split('</br>').length - 1).forEach(function(material){
            materiales.push(material);
        });
        // PDF Content
        var dd= {
            info: {
                title: ''+Ficha.nombreactividad+'',
                author: ''+Ficha.User.facebookname+'',
                subject: ''+Ficha.nombreactividad+'',
                keywords: 'scouts',
                creator: 'http://uhluscout.com'
            },
            content: [
                {
                    layout: 'noBorders',
                    table: {
                        headerRows: 0,
                        widths: [ '*', '*'],
                        
                        body: [
                            [ { image: path.join(__dirname, '/../../public/img/logo.png'), width: 100,height: 100}, { text: ''+Ficha.nombreactividad+'', style: 'header'}]
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'headerLineOnly',
                    table: {
                        headerRows: 1,
                        widths: [ 'auto', 'auto', 'auto', '*' ],
                        
                        body: [
                            [ { text: 'NOMBRE DE LA ACTIVIDAD', style: 'morrarro' }, { text: 'SECCIÓN', style: 'morrarro' }, { text: ''+nombrearea.toUpperCase()+'', style: 'morrarro' }, { text: 'PARTICIPANTES', style: 'morrarro' } ],
                            [ ''+Ficha.nombreactividad+'', ''+Ficha.seccion+'', ''+areadedesarrollo+'', ''+Ficha.participantes+'' ]
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'headerLineOnly',
                    table: {
                        headerRows: 1,
                        widths: [ '*'],
                        
                        body: [
                            [ { text: 'OBJETIVOS EDUCATIVOS', style: 'morrarro' }],
                            [ ''+Ficha.objetivo+'']
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'headerLineOnly',
                    table: {
                        headerRows: 1,
                        widths: [ '*'],
                        
                        body: [
                            [ { text: 'DESCRIPCIÓN DE LA ACTIVIDAD', style: 'morrarro' }],
                            [ ''+Ficha.descripcion+'']
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'headerLineOnly',
                    table: {
                        headerRows: 1,
                        widths: [ '*'],
                        
                        body: [
                            [ { text: 'RECOMENDACIONES', style: 'morrarro' }],
                            [ ''+Ficha.recomendaciones+'']
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'headerLineOnly',
                    table: {
                        headerRows: 1,
                        widths: [ '*'],
                        
                        body: [
                            [ { text: 'MATERIALES', style: 'morrarro' }],
                            [ 
                                {
                                // to treat a paragraph as a bulleted list, set an array of items under the ul key
                                ul: materiales
                                },
                            ]
                        ]
                    },
                    style: 'marginBot'
                },
                {
                    layout: 'headerLineOnly',
                    table: {
                        headerRows: 1,
                        widths: [ '*', '*', '*'],
                        
                        body: [
                            [ { text: 'TIEMPOS', style: 'morrarro' }, { text: 'AUTOR', style: 'morrarro' }, { text: 'FECHA', style: 'morrarro' }],
                            [ ''+Ficha.tiempos+'', ''+Ficha.User.facebookname+'', ''+Ficha.created_at+'']
                        ]
                    },
                    style: 'marginBot'
                },
                { text: 'Ficha Elaborada y descargada desde http://uhluscout.com', link: 'http://uhluscout.com', style: 'footer'}  
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
        }//end dd

        var fontDescriptors = {
            Roboto: {
                normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
                bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
                italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
                bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
            }
        };
        var printer = new PdfPrinter(fontDescriptors);
        return printer.createPdfKitDocument(dd);
    }
};
