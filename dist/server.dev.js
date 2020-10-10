"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var mongoose = require('mongoose');

var path = require("path");

require('dotenv').config();

var port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express["static"](path.join(__dirname, "client", "build")));
var uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, function () {
  console.log("Express server listening on port ".concat(port));
});