const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.approver = require("./approver.model");
db.proposer = require("./proposer.model");
db.proposal = require("./proposal.model");
db.designer = require("./designer.model");
db.admin = require("./admin.model");
db.namaSTO = require("./namaSTO.model");
db.segmen = require("./segmen.model");
db.namaAlpro = require("./namaAlpro.model");
db.jenisQE = require("./jenisQE.model");

db.ROLES = ["admin", "proposer", "designer", "approver"];
db.NAMASTOS = ["SMT", "JHR", "MJB"];
db.SEGMENS = ["Kabel Feeder", "ODC", "Kabel/Distribusi", "ODP"];
db.JENISQES = ["Normalisasi ODP", "Box ODP", "Perapihan ODC"];
db.NAMAALPROS = [
  "FE-01",
  "FE-02",
  "JHR-FB-D01",
  "SMT-FB-D01",
  "MJB-FB-D01",
  "ODC-MJB-FA",
  "ODC-SMT-FA",
  "ODP-SMT-FB/001",
  "ODC-JHR-FA",
  "ODP-JHR-FB/001",
];
module.exports = db;
