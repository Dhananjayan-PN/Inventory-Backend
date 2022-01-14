const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  name: String,
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  units: Number,
  cost: Number
});

module.exports = mongoose.model("Item", itemSchema);
