const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchemer = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
    },
    age: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    password: {
      type: String,
      required: true,
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

