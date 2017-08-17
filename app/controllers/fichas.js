// Third Party
var PdfPrinter = require('pdfmake/src/printer');
//PdfModule
var fichaReme = require('../pdf/fichaReme');
// Models
Ficha = require('../models/').Ficha;
Users = require('../models/').User;
// CRUD Operations for Ficha Model
module.exports = {
    index(req, res) {
        Ficha.findAll()
            .then(function (Fichas) {
                res.status(200).json(Fichas);
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json(error);
            });
    },

    show(req, res) {
        Ficha.findAll({
            where: {
                id: req.params.id
            },
            include: [{ model: Users }]
        })
            .then(function (Ficha) {
                res.status(200).json(Ficha);
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json(error);
            });
    },

    create(req, res) {
        // res.status(200).json(req.body);
        Ficha.create(req.body)
            .then(function (newFicha) {
                res.status(200).json(newFicha);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    update(req, res) {
        Ficha.update(req.body, {
            where: {
                id: req.body.id
            }
        })
            .then(function (updatedRecords) {
                res.status(200).json(updatedRecords);
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json(error);
            });
    },

    delete(req, res) {
        console.log(req.params)
        Ficha.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (deletedRecords) {
                res.status(200).json(deletedRecords);
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json(error);
            });
    },

    print(req, res) {
        Ficha.findAll({
            where: {
                id: req.params.id
            },
            include: [{ model: Users }]
        })
            .then(function (Ficha) {
                console.log(Ficha[0]);
                var doc = fichaReme.pdf(Ficha[0]);
                doc.pipe(res);
                doc.end();
                // req.body
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json(error);
            });
    }
};
