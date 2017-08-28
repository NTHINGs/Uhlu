Scout = require('../models/').Scout;
Patrulla = require('../models/').Patrulla;

// Reportes
var pdf = require('../pdf/generarReporte');

// CRUD Operations for Scout Model
module.exports= {
  index(req, res) {
    Scout.findAll({
      include: [{
        model: Patrulla,
        where: {user_id: req.params.id}
      }]
    })
    .then(function (Scouts) {
        res.status(200).json(Scouts);
    })
    .catch(function (error) {
    console.log(error)
        res.status(500).json(error);
    });
  },

  show(req, res) {
    Scout.findAll({
      where: {
        cum: req.params.cum
      }
    })
    .then(function (Scout) {
      res.status(200).json(Scout);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    // res.status(200).json(req.body);
    Scout.create(req.body)
      .then(function (newScout) {
        res.status(200).json(newScout);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Scout.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    console.log(req.params)
    Scout.destroy({
      where: {
        cum: req.params.cum
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }, 

  reporte(req, res){
    //req.body.tipo = 'directorio' || 'fichamedica' || 'cuadroadelanto'
    //req.body.print = { opcion: 'general' || 'patrulla' , patrulla: idpatrulla }

    // Cambiar los parametros dependiendo del alcance del reporte.
    console.log(req.query);
    var params = {}
    // TODO HARDCODED USER ID
    if(req.query.opcion == 'patrulla'){
        params = {
            include: [{
                model: Patrulla,
                where: {user_id: '1'}
            }],
            where: {patrulla_id: req.query.patrulla}
        }
    }else if(req.query.opcion == 'general'){
        params = {
            include: [{
                model: Patrulla,
                where: {user_id: '1'}
            }]
        }
    }

    // Query
    Scout.findAll(params)
    .then(function(Scouts){
        var doc = null;
        //Generar el documento dependiendo del tipo seleccionado
        switch(req.query.tipo){
            case 'directorio':
                doc = pdf.generarDirectorio(Scouts);
                // Enviar el pdf al navegador
                doc.pipe(res);
                doc.end();
                break;
            case 'fichamedica':
                doc = pdf.generarFichaMedica(Scouts);
                // Enviar el pdf al navegador
                doc.pipe(res);
                doc.end();
                break;
            case 'cuadroadelanto':
                doc = pdf.generarCuadroAdelanto(Scouts);
                // Enviar el pdf al navegador
                doc.pipe(res);
                doc.end();
                break;
        }
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json(error);
    })
  }
};
