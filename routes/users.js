const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

const User = require('../models/User');
users.use(cors());

process.env.SECRET_KEY = 'secret';

/*
user.route('/users/').get((req, res) => {
    User.find()
       .then(users => res.json(users.user))
       .catch(err => res.status(400).json('Error : '+err))
})

*/

users.route("/register").post(async (req, res) => {
  const today = new Date();
  const userData = {
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password,
  };
  const person = await User.findOne({
    email: req.body.email,
  });
  if (person) {
    return res.status(422).send({ message: "User Already exists" });
  }
  const pword = await bcrypt.hash(req.body.password, 10);
  userData.password = pword;
  const newUser = await new User(userData);
  await newUser.save();
  res.status(201).send({ message: `User successfully registered` });
});




/**
 * login
 * @method - POST
 * @param - /login
 * @description - user login
 */

users.route("/login").post( async (req, res) => {
      
  const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email,
        });
        if (!user)
          return res.status(400).json({
            message: "User Does Not Exist",
          });

        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !",
          });

        const payload = {
          user: {
            id: user.id
          },
        };

      jwt.sign(
          payload,
          process.env.SECRET_KEY,
          { expiresIn: 3000 },
      /*
      let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
        expiresIn: 3600,
      });

      */

          (err, token) => {
            if (err) throw err;
            res.status(200).json(token);
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error",
        });
      }
    });



module.exports = users;