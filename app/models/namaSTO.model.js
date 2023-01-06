const mongoose = require("mongoose");

const namaSTO = mongoose.model(
  "namaSTO",
  new mongoose.Schema({
    name: {
      type: String,
    },
  })
);

module.exports = namaSTO;
