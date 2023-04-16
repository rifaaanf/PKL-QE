const db = require("../models");
const namaSTO = db.namaSTO;
const segmen = db.segmen;
const jenisQE = db.jenisQE;
const Proposal = db.proposal;

exports.designerProposal = (req, res) => {
  // get role

  namaSTO.find({}, (err, namasto) => {
    segmen.find({}, (err, segmen) => {
      jenisQE.find({}, (err, jenisqe) => {
        var id = req.params.id;
        Proposal.findById(id, (err, proposal) => {
          res.render("layouts/main-layout-designer", {
            data: "designer",
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

exports.designerCompleteProposal = (req, res) => {
  Proposal.find({
    designer: req.designerId,
  })
    .sort({ updatedAt: -1 })
    .exec((err, proposal) => {
      if (err) throw err;

      res.render("layouts/main-layout-designer", {
        data: "completeproposal",
        proposal: proposal,
        pindah: req.roleName,
      });
    });
};

exports.designerRedesignProposal = (req, res) => {
  Proposal.find({})
    .sort({ updatedAt: -1 })
    .exec((err, proposal) => {
      if (err) throw err;

      res.render("layouts/main-layout-designer", {
        data: "redesignproposal",
        proposal: proposal,
        pindah: req.roleName,
      });
    });
};

exports.designerDetail = (req, res) => {
  var id = req.params.id;
  Proposal.findById(id, (err, proposal) => {
    res.render("layouts/main-layout-designer", {
      data: "designerdetail",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};

exports.uploadDesign = (req, res) => {
  var id = req.params.id;
  Proposal.findById(id, (err, proposal) => {
    res.render("layouts/main-layout-designer", {
      data: "uploaddesign",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};
