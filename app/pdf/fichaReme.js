var PdfPrinter = require('pdfmake/src/printer');
var path = require('path');
module.exports = { 
    pdf: function(Ficha) {
        // Parsear materiales string a array
        var materiales =[];
        Ficha.materiales.split("<br>").slice(0,Ficha.materiales.split('<br>').length - 1).forEach(function(material){
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
                { text: ''+Ficha.nombreactividad+'', style: 'header'},
                {
                    layout: 'headerLineOnly',
                    table: {
                        headerRows: 1,
                        widths: [ 'auto', 'auto', 'auto', '*' ],
                        
                        body: [
                            [ 'NOMBRE DE LA ACTIVIDAD', 'SECCIÓN', 'ÁREA DE DESARROLLO', 'PARTICIPANTES' ],
                            [ ''+Ficha.nombreactividad+'', ''+Ficha.seccion+'', ''+Ficha.areadedesarrollo+'', ''+Ficha.participantes+'' ]
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
                            [ 'DESCRIPCIÓN DE LA ACTIVIDAD'],
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
                            [ 'RECOMENDACIONES'],
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
                            [ 'MATERIALES'],
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
                            [ 'TIEMPOS', 'AUTOR', 'FECHA'],
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
                    margin: [ 0, 0, 0, 25 ]
                },
                marginBot:{
                    margin: [ 0, 0, 0, 25 ]
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
