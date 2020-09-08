"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var mongoose = require('mongoose');

require('dotenv').config();

var port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
var uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
}); //create a connection and open it

var connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDb database connection established successfully ");
}); //const signupRouter = require('./routes/rsignup')
//const loginRouter  = require('./routes/rlogin')

var userRouter = require('./routes/users'); //app.use('/signup', signupRouter)
//app.use('/login', loginRouter)


app.use('/users', userRouter);
app.listen(port, function () {
  console.log("Express server listening on port ".concat(port));
});