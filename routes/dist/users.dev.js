"use strict";

var express = require('express');

var users = express.Router();

var cors = require('cors');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var User = require('../models/User');

users.use(cors());
process.env.SECRET_KEY = 'secret';
/*
user.route('/users/').get((req, res) => {
    User.find()
       .then(users => res.json(users.user))
       .catch(err => res.status(400).json('Error : '+err))
})

*/

users.route("/register").post(function _callee(req, res) {
  var today, userData, person, pword, newUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          today = new Date();
          userData = {
            username: req.body.username,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 4:
          person = _context.sent;

          if (!person) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(422).send({
            message: "User Already exists"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 9:
          pword = _context.sent;
          userData.password = pword;
          _context.next = 13;
          return regeneratorRuntime.awrap(new User(userData));

        case 13:
          newUser = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(newUser.save());

        case 16:
          res.status(201).send({
            message: "User successfully registered"
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}); //login

users.route("/login").post(function (req, res) {
  User.findOne({
    email: req.body.email
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