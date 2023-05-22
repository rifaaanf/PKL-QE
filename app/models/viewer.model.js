const mongoose = require("mongoose");

const Viewer = mongoose.model(
  "Viewer",
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

module.exports = Viewer;
