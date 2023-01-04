const mongoose = require("mongoose");

const Proposer = mongoose.model(
  "Proposer",
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

module.exports = Proposer;
