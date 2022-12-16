const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  beverage: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  size: {
    type: String,
  },
  date: {
    type: String,
  },
  custom: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
