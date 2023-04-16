const db = require("../models");
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

exports.closedDetail = (req, res) => {
  var id = req.params.id;
  Proposal.findById(id, (err, proposal) => {
    res.render("layouts/main-layout-executor", {
      data: "closeddetail",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};

exports.pilihMitraPage = (req, res) => {
  var id = req.params.id;
  Proposal.findById(id, (err, proposal) => {
    Mitra.find({}, (err, mitra) => {
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
    { status: "INSTALLATION", mitra: newMitra, executor: req.executorId },
    { new: true },
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/executor");
    }
  );
};

exports.gantiMitra = (req, res) => {
  const newMitra = req.body.mitra;

  Proposal.findByIdAndUpdate(
    req.params.id,
    { status: "INSTALLATION", mitra: newMitra, executor: req.executorId },
    { new: true },
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/installationproposal");
    }
  );
};

exports.executorInstallationProposal = (req, res) => {
  Proposal.find({
    executor: req.executorId,
  })
    .sort({ updatedAt: -1 })
    .exec((err, proposal) => {
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
    Mitra.find({}, (err, mitra) => {
      res.render("layouts/main-layout-executor", {
        data: "gantimitra",
        proposal: proposal,
        mitraBaru: mitra,
        pindah: req.roleName,
      });
    });
  });
};

exports.uploadInstallationEvidence = (req, res) => {
  var id = req.params.id;
  Proposal.findById(id, (err, proposal) => {
    res.render("layouts/main-layout-executor", {
      data: "uploadclose",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};

exports.executorClosedProposal = (req, res) => {
  Proposal.find({
    executor: req.executorId,
  })
    .sort({ updatedAt: -1 })
    .exec((err, proposal) => {
      if (err) throw err;

      res.render("layouts/main-layout-executor", {
        data: "closedproposal",
        proposal: proposal,
        pindah: req.roleName,
      });
    });
};

exports.allExecutorInstallationProposal = (req, res) => {
  Proposal.find({}, (err, proposal) => {
    if (err) throw err;

    res.render("layouts/main-layout-executor", {
      data: "allinstallationproposal",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};

exports.allExecutorClosedProposal = (req, res) => {
  Proposal.find({}, (err, proposal) => {
    if (err) throw err;

    res.render("layouts/main-layout-executor", {
      data: "allclosedproposal",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};
