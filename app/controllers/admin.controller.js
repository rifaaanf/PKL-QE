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
    { name: req.body.name },
    { name: req.body.namebaru },
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
    { name: req.body.name },
    { name: req.body.namebaru },
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
    { name: req.body.name },
    { name: req.body.namebaru },
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
    { name: req.body.name },
    { name: req.body.namebaru },
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
    name: req.body.namebaru,
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
    name: req.body.namebaru,
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
    name: req.body.namebaru,
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
    name: req.body.namebaru,
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
  namaSTO.findOneAndDelete({ name: req.body.namebaru }, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.deletesegmen = (req, res) => {
  // delete segmen
  segmen.findOneAndDelete({ name: req.body.namebaru }, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.deletejenisqe = (req, res) => {
  // delete jenisQE
  jenisQE.findOneAndDelete({ name: req.body.namebaru }, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.deletenamaalpro = (req, res) => {
  // delete namaAlpro
  namaAlpro.findOneAndDelete({ name: req.body.namebaru }, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//get namasto
exports.getnamasto = (req, res) => {
  namaSTO.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//get segmen
exports.getsegmen = (req, res) => {
  segmen.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//get jenisqe
exports.getjenisqe = (req, res) => {
  jenisQE.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.deletedata = (req, res) => {
  // get role

  // });
  // get all namaSTO and segmen
  namaSTO.find({}, (err, namasto) => {
    segmen.find({}, (err, segmen) => {
      jenisQE.find({}, (err, jenisqe) => {
        namaAlpro.find({}, (err, namaalpro) => {
          res.render("layouts/main-layout-proposer", {
            data: "deletedata",
            namaSTO: namasto,
            segmen: segmen,
            jenisQE: jenisqe,
            namaAlpro: namaalpro,
            pindah: req.roleName,
          });
        });
      });
    });
  });
};

exports.adddata = (req, res) => {
  // get role

  // });
  // get all namaSTO and segmen
  namaSTO.find({}, (err, namasto) => {
    segmen.find({}, (err, segmen) => {
      jenisQE.find({}, (err, jenisqe) => {
        namaAlpro.find({}, (err, namaalpro) => {
          res.render("layouts/main-layout-proposer", {
            data: "adddata",
            namaSTO: namasto,
            segmen: segmen,
            jenisQE: jenisqe,
            namaAlpro: namaalpro,
            pindah: req.roleName,
          });
        });
      });
    });
  });
};

exports.changedata = (req, res) => {
  // get role

  // });
  // get all namaSTO and segmen
  namaSTO.find({}, (err, namasto) => {
    segmen.find({}, (err, segmen) => {
      jenisQE.find({}, (err, jenisqe) => {
        namaAlpro.find({}, (err, namaalpro) => {
          res.render("layouts/main-layout-proposer", {
            data: "changedata",
            namaSTO: namasto,
            segmen: segmen,
            jenisQE: jenisqe,
            namaAlpro: namaalpro,
            pindah: req.roleName,
          });
        });
      });
    });
  });
};
