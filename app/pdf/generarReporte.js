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
        var rows = [];
        for(var i = 0; i < Scouts.length; i++){
            // 'FOTO' 'CUM' 'NOMBRE' 'GÉNERO' 'FECHA DE NACIMIENTO' 'ESCUELA' 'E-MAIL' 'TELÉFONO' 'DOMICILIO'
            rows.push([ 
                {
                    image: Scouts[i].dataValues.foto,
                    width: 150,
                    height: 150
                }, 
                { text: Scouts[i].dataValues.cum},
                { text: Scouts[i].dataValues.nombre},
                { text: Scouts[i].dataValues.genero},
                { text: Scouts[i].dataValues.fechanacimiento},
                { text: Scouts[i].dataValues.escuela},
                { text: Scouts[i].dataValues.email},
                { text: Scouts[i].dataValues.telefono},
                { text: Scouts[i].dataValues.domicilio},
            ]);
        });
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
                        widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', '*' ],
                        // cum: DataTypes.STRING, 
                        // foto: DataTypes.TEXT,
                        // nombre: DataTypes.STRING,
                        // genero: DataTypes.STRING,
                        // fechanacimiento: DataTypes.DATE,
                        // escuela: DataTypes.STRING,
                        // email: DataTypes.STRING,
                        // telefono: DataTypes.STRING,
                        // domicilio: DataTypes.STRING,
                        body: [
                            [ 
                                { text: 'FOTO', style: 'morrarro' }, 
                                { text: 'CUM', style: 'morrarro' }, 
                                { text: 'NOMBRE', style: 'morrarro' }, 
                                { text: 'GÉNERO', style: 'morrarro' }, 
                                { text: 'FECHA DE NACIMIENTO', style: 'morrarro' }, 
                                { text: 'ESCUELA', style: 'morrarro' }, 
                                { text: 'E-MAIL', style: 'morrarro' },
                                { text: 'TELÉFONO', style: 'morrarro' }, 
                                { text: 'DOMICILIO', style: 'morrarro' },
                            ],
                            rows
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
