const mongoose = require("mongoose");

const Mitra = mongoose.model(
  "Mitra",
  new mongoose.Schema({
    name: {
      type: String,
    },
  })
);

module.exports = Mitra;
