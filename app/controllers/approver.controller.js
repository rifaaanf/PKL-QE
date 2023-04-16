const db = require("../models");

const Proposal = db.proposal;

exports.approverDetail = (req, res) => {
  var id = req.params.id;
  Proposal.findById(id, (err, proposal) => {
    res.render("layouts/main-layout-approver", {
      data: "approverdetail",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};
