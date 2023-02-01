const mongoose = require("mongoose");

const Executor = mongoose.model(
  "Executor",
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

module.exports = Executor;
