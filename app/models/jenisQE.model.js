const mongoose = require("mongoose");

const jenisQE = mongoose.model(
  "jenisQE",
  new mongoose.Schema({
    name: {
      type: String,
    },
  })
);

module.exports = jenisQE;
