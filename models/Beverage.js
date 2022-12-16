const mongoose = require("mongoose");

const BeverageSchema = new mongoose.Schema({
  size: {
    type: String,
  },
  beverage: {
    type: String,
    required: true,
  },
  custom: {
    type: String,
    required: true,
  },
});

const Beverage = mongoose.model("Beverage", BeverageSchema);

module.exports = Beverage;
