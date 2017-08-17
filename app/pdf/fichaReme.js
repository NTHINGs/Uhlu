module.exports = { 
    pdf: function(Ficha) {
        // PDF Content
        var dd= {
            info: {
                title: Ficha.titulo,
                author: Ficha.User.facebookname,
                subject: Ficha.titulo,
                keywords: 'scouts',
                creator: 'http://uhluscout.com'
            },
            content: [
                { text: Ficha.titulo, style: 'header'},
                {
                    layout: 'headerLineOnly',
                    table: {
                        headerRows: 1,
                        widths: [ 'auto', 'auto', 'auto', '*' ],
                        
                        body: [
                            [ 'NOMBRE DE LA ACTIVIDAD', 'SECCIÓN', 'ÁREA DE DESARROLLO', 'PARTICIPANTES' ],
                            [ Ficha.nombreactividad, Ficha.seccion, Ficha.areadedesarrollo, Ficha.participantes ]
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
                            [ Ficha.descripcion]
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
                            [ Ficha.recomendaciones]
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
                                ul: [
                                    'Item 1',
                                    'Item 2',
                                    'Item 3',
                                ]
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
                            [ Ficha.tiempos, Ficha.User.facebookname, Ficha.created_at]
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
            normal: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Regular.ttf'),
            bold: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Medium.ttf'),
            italics: path.join(__dirname, '..', 'examples', '/fonts/Roboto-Italic.ttf'),
            bolditalics: path.join(__dirname, '..', 'examples', '/fonts/Roboto-MediumItalic.ttf')
            }
        };
        var printer = new pdfMakePrinter(fontDescriptors);
        return printer.createPdfKitDocument(dd);
    }
};