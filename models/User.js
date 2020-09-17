const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchemer = new Schema(
  {
    username: {
      type: String,
      minlength: 2,
      maxlength: 25,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      trim: true,
    },
  },

  { timestamps: true }
);

const User = mongoose.model('User', userSchemer)
module.exports = User