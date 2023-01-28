const db = require("../models");
const namaSTO = db.namaSTO;
const segmen = db.segmen;
const jenisQE = db.jenisQE;
const namaAlpro = db.namaAlpro;
const Proposal = db.proposal;

exports.approverDetail = (req, res) => {
  namaSTO.find({}, (err, namasto) => {
    segmen.find({}, (err, segmen) => {
      jenisQE.find({}, (err, jenisqe) => {
        var id = req.params.id;
        Proposal.findById(id, (err, proposal) => {
          res.render("layouts/main-layout-approver", {
            data: "approverdetail",
            proposal: proposal,
            namaSTO: namasto,
            segmen: segmen,
            jenisQE: jenisqe,
            pindah: req.roleName,
          });
        });
      });
    });
  });
};
