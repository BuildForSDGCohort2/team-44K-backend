const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchemer = new Schema(
  {
    
    username: {
      type: String,
      trim: true,
      minlength: 5,
      required:false,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      
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
    
  },

  { timestamps: true }
);

const User = mongoose.model('User', userSchemer)
module.exports = User