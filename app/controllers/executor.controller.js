const db = require("../models");
const namaSTO = db.namaSTO;
const segmen = db.segmen;
const jenisQE = db.jenisQE;
const namaAlpro = db.namaAlpro;
const Proposal = db.proposal;
const Mitra = db.mitra;

exports.executorDetail = (req, res) => {
    var id = req.params.id;
    Proposal.findById(id, (err, proposal) => {
        res.render("layouts/main-layout-executor", {
            data: "executordetail",
            proposal: proposal,
            pindah: req.roleName,
        });
    });
};

exports.pilihMitraPage = (req, res) => {
    var id = req.params.id;
    Proposal.findById(id, (err, proposal) => {
        Mitra.find({},(err, mitra) => {
            res.render("layouts/main-layout-executor", {
            data: "pilihmitra",
            proposal: proposal,
            mitra: mitra,
            pindah: req.roleName,
            });
        }); 
    });
};

exports.pilihMitra = (req, res) => {
    const newMitra = req.body.mitra;

    Proposal.findByIdAndUpdate(
      req.params.id,
      { status: "INSTALLATION" , mitra: newMitra},
      { new: true },
      (err, data) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send(data);
    });
}

exports.executorInstallationProposal = (req, res) => {
    Proposal.find({}, (err, proposal) => {
      if (err) throw err;
  
      res.render("layouts/main-layout-executor", {
        data: "installationproposal",
        proposal: proposal,
        pindah: req.roleName,
      });
    });
};

exports.changeMitra = (req, res) => {
    var id = req.params.id;
    Proposal.findById(id, (err, proposal) => {
        Mitra.find({},(err, mitra) => {
            res.render("layouts/main-layout-executor", {
            data: "gantimitra",
            proposal: proposal,
            mitraBaru: mitra,
            pindah: req.roleName,
            });
        }); 
    });
};
