const db = require("../models");
const namaSTO = db.namaSTO;
const segmen = db.segmen;
const jenisQE = db.jenisQE;
const namaAlpro = db.namaAlpro;
const Proposal = db.proposal;

exports.formAdmin = (req, res) => {
  // namaSTO.find({}, (err, namasto) => {
  //   res.render("layouts/main-layout-admin", {
  //     data: "formAdmin",
  //     namaSTO: namasto,
  //   });
  // });
  // get all namaSTO and segmen
  namaSTO.find({}, (err, namasto) => {
    segmen.find({}, (err, segmen) => {
      jenisQE.find({}, (err, jenisqe) => {
        res.render("layouts/main-layout-proposer", {
          data: "proposer",
          namaSTO: namasto,
          segmen: segmen,
          jenisQE: jenisqe,
        });
      });
    });
  });
};

exports.detailProposal = (req, res) => {
  namaSTO.find({}, (err, namasto) => {
    segmen.find({}, (err, segmen) => {
      jenisQE.find({}, (err, jenisqe) => {
        var id = req.params.id;
        Proposal.findById(id, (err, proposal) => {
          res.render("layouts/main-layout-admin", {
            data: "detail",
            proposal: proposal,
            namaSTO: namasto,
            segmen: segmen,
            jenisQE: jenisqe,
          });
        });
      });
    });
  });
};

//get all namaAlpro
exports.getAllNamaAlpro = (req, res) => {
  namaAlpro.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//get all proposal
