Patrulla = require('../models/').Patrulla;
// CRUD Operations for Patrulla Model
module.exports= {
  index(req, res) {
    Patrulla.findAll({
        where: {
        	user_id: req.params.id
        }
    })
      .then(function (Patrullas) {
        res.status(200).json(Patrullas);
      })
      .catch(function (error) {
        console.log(error)
        res.status(500).json(error);
      });
  },

  show(req, res) {
    Patrulla.findAll({
        where: {
          id: req.params.id,
          nombre: req.params.nombre
        }
    })
    .then(function (Patrulla) {
      res.status(200).json(Patrulla);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    // res.status(200).json(req.body);
    Patrulla.create(req.body)
      .then(function (newPatrulla) {
        res.status(200).json(newPatrulla);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    Patrulla.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      console.log(error)
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    console.log(req.params)
    Patrulla.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  }
};