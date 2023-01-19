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
          pindah: req.roleName,
        });
      });
    });
  });
};

exports.detailProposal = (req, res) => {
  // get role

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
            pindah: req.roleName,
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

exports.changestodata = (req, res) => {
  // change nama sto data name to new name
  namaSTO.findOneAndUpdate(
    { name: req.body.namaSTO },
    { name: req.body.namaSTObaru },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(data);
    }
  );
};

exports.changesegmendata = (req, res) => {
  // change segmen data name to new name
  segmen.findOneAndUpdate(
    { name: req.body.segmen },
    { name: req.body.segmenbaru },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(data);
    }
  );
};

exports.changejenisqedata = (req, res) => {
  // change jenisQE data name to new name
  jenisQE.findOneAndUpdate(
    { name: req.body.jenisQE },
    { name: req.body.jenisQEbaru },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(data);
    }
  );
};

exports.changenamaalprodata = (req, res) => {
  // change namaAlpro data name to new name
  namaAlpro.findOneAndUpdate(
    { name: req.body.namaAlpro },
    { name: req.body.namaAlprobaru },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(data);
    }
  );
};

exports.addnamasto = (req, res) => {
  // add new namaSTO
  const namasto = new namaSTO({
    name: req.body.namaSTO,
  });
  namasto.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.addsegmen = (req, res) => {
  // add new segmen
  const segmen = new segmen({
    name: req.body.segmen,
  });
  segmen.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.addjenisqe = (req, res) => {
  // add new jenisQE
  const jenisqe = new jenisQE({
    name: req.body.jenisQE,
  });
  jenisqe.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.addnamaalpro = (req, res) => {
  // add new namaAlpro
  const namaalpro = new namaAlpro({
    name: req.body.namaAlpro,
  });
  namaalpro.save((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.deletenamasto = (req, res) => {
  // delete namaSTO
  namaSTO.findOneAndDelete({ name: req.body.namaSTO }, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.deletesegmen = (req, res) => {
  // delete segmen
  segmen.findOneAndDelete({ name: req.body.segmen }, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.deletejenisqe = (req, res) => {
  // delete jenisQE
  jenisQE.findOneAndDelete({ name: req.body.jenisQE }, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.deletenamaalpro = (req, res) => {
  // delete namaAlpro
  namaAlpro.findOneAndDelete({ name: req.body.namaAlpro }, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};
