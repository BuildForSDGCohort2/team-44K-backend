"use strict";

var express = require('express');

var users = express.Router();

var cors = require('cors');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var _require = require("express-validator"),
    validationResult = _require.validationResult;

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
});
/**
 * login
 * @method - POST
 * @param - /login
 * @description - user login
 */

users.route("/login").post(function _callee2(req, res) {
  var errors, _req$body, email, password, user, isMatch, payload;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(422).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context2.sent;

          if (user) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "User Does Not Exist"
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compareSync(password, user.password));

        case 12:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Incorrect Password !"
          }));

        case 15:
          payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 3000
          },
          /*
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 3600,
          });
           */
          function (err, token) {
            if (err) throw err;
            res.status(200).json(token);
          });
          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0);
          res.status(500).json({
            message: "Server Error"
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 19]]);
});
module.exports = users;