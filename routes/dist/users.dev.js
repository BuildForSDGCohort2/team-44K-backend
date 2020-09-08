"use strict";

var express = require('express');

var users = express.Router();

var cors = require('cors');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var User = require('../models/User');

users.use(cors());
process.env.SECRET_KEY = 'secret';
user.route('/').get(function (req, res) {
  User.find().then(function (users) {
    return res.json(users);
  })["catch"](function (err) {
    return res.status(400).json('Error : ' + err);
  });
});
users.route('/register').post(function (req, res) {
  var today = new Date();
  var userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password
  };
  User.find({
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    if (user) {
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        userData.password = hash;
        User.create(userData).then(function (user) {
          res.json({
            status: user.email + 'registered'
          });
        })["catch"](function (err) {
          res.send('error : ' + err);
        });
      });
    } else {
      res.json({
        error: "User already exists"
      });
    }
  })["catch"](function (err) {
    res.send('error : ' + err);
  });
}); //login

users.route("/login").post(function (req, res) {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        var token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1500
        });
        res.send(token);
      }
    } else {
      res.status(400).json({
        error: "User does not exist"
      });
    }
  })["catch"](function (err) {
    res.status(400).json({
      error: err
    });
  });
});
module.exports = users;