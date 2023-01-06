const db = require("../models");
const Admin = db.admin;
exports.formAdmin = (req, res) => {
  res.render("layouts/main-layout-admin", { data: "formAdmin" });
};
