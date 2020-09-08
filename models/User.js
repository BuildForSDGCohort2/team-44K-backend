const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchemer = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      minlength: 2,
    },
    last_name: {
      type: String,
      trim: true,
      minlength: 2,
    },
    username: {
      type: String,
      trim: true,
      minlength: 5,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      minlength: 2,
    },
    age: {
      type: String,
      required: false,
      trim: true,
      minlength: 2,
    },
    password: {
      type: String,
      trim: true,
      minlength: 2,
    },
    created : {
      type : Date,
      defaultValue : Date.now
    }
  },

  { timestamps: true }
);

const User = mongoose.model('User', userSchemer)

module.exports = User