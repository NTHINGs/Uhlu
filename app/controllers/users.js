User = require('../models/').User;
var bcrypt   = require('bcrypt-nodejs');

// CRUD Operations for User Model
module.exports= {
  index(req, res) {
    User.findAll()
      .then(function (Users) {
        res.status(200).json(Users);
      })
      .catch(function (error) {
        res.status(500).json(error);
      });
  },

  show(req, res) {
    User.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(function (User) {
      res.status(200).json(User);
    })
    .catch(function (error){
      res.status(500).json(error);
    });
  },

  findById(id) {
    return User.findById(id);
  },

  findByEmail(email){
    return User.findAll({
      where: {
        email: email
      }
    })
  },

  findByToken(token){
    return User.findAll({
      where: {
        passwordToken: token,
        passwordExpires: {$gt: Date.now()}
      }
    })
  },

  saveUser(user){
    return User.update(user, {
      where: {
        id: user.id
      }
    })
  },

  create(req, res) {
    // res.status(200).json(req.body);
    User.create(req.body)
      .then(function (newUser) {
        res.status(200).json(newUser);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
  },

  update(req, res) {
    if(req.body.password.length == 0){
      delete req.body.password;
    }else{
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    }
    User.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error){
      console.log(error);
      res.status(500).json(error);
    });
  },

  delete(req, res) {
    console.log(req.params)
    User.destroy({
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
