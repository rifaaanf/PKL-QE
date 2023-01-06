const mongoose = require("mongoose");

const namaAlpro = mongoose.model(
  "namaAlpro",
  new mongoose.Schema({
    name: {
      type: String,
    },
  })
);

module.exports = namaAlpro;
