const mongoose = require("mongoose");

const segmen = mongoose.model(
  "segmen",
  new mongoose.Schema({
    name: {
      type: String,
    },
  })
);

module.exports = segmen;
