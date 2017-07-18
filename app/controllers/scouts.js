Scout = require('../models/').Scout;
// CRUD Operations for Scout Model
module.exports= {
  index(req, res) {
    Scout.findAll()
      .then(function (Scouts) {
        res.status(200).json(Scouts);
      })
      .catch(function (error) {
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
  }
};