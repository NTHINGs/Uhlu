var PdfPrinter = require('pdfmake/src/printer');
var path = require('path');

var fontDescriptors = {
    Roboto: {
        normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
    }
};
module.exports = {
    generarDirectorio(Scouts) {
        // PDF Content
        var dd= {
            info: {
                title: 'Directorio',
                author: 'Uhlu',
                subject: 'Directorio',
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
                            [ { image: path.join(__dirname, '/../../public/img/logo.png'), width: 100,height: 100}, { text: 'Directorio', style: 'header'}]
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

        return new PdfPrinter(fontDescriptors).createPdfKitDocument(dd);
    },
    generarFichaMedica(Scouts) {
        
    },
    generarCuadroAdelanto(Scouts) {
        
    }
};
