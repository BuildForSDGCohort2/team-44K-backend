const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

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



//login

users.route("/login").post((req, res) => {
  User.findOne({email: req.body.email,})
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1500,
          });
          res.send(token);
        }
      } 
      else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});


module.exports = users

