const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.approver = require("./approver.model");
db.proposer = require("./proposer.model");
db.proposal = require("./proposal.model");

db.ROLES = ["admin", "proposer", "designer", "approver"];
module.exports = db;
