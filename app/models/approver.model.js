const mongoose = require("mongoose");

const Approver = mongoose.model(
  "Approver",
  new mongoose.Schema({
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    password: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = Approver;
