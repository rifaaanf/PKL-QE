const db = require("../models");
const Proposal = db.proposal;

exports.proposerDetail = (req, res) => {
  var id = req.params.id;
  Proposal.findById(id, (err, proposal) => {
    res.render("layouts/main-layout-proposer", {
      data: "proposerdetail",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};
