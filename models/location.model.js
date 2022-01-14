const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  name: String,
  capacity: Number,
  address: String,
  city: String,
  state: String,
  zip: Number
});

module.exports = mongoose.model("Location", locationSchema);
