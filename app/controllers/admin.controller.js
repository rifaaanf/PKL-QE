const db = require("../models");
const User = db.user;
const namaSTO = db.namaSTO;
const Segmen = db.segmen;
const jenisQE = db.jenisQE;
const namaAlpro = db.namaAlpro;
const Proposal = db.proposal;
const bcrypt = require("bcryptjs");

exports.formAdmin = (req, res) => {
  // namaSTO.find({}, (err, namasto) => {
  //   res.render("layouts/main-layout-admin", {
  //     data: "formAdmin",
  //     namaSTO: namasto,
  //   });
  // });
  // get all namaSTO and segmen
  Proposal.find({}, (err, proposal) => {
    namaSTO.find({}, (err, namasto) => {
      Segmen.find({}, (err, segmen) => {
        jenisQE.find({}, (err, jenisqe) => {
          res.render("layouts/main-layout-proposer", {
            data: "proposer",
            namaSTO: namasto,
            segmen: segmen,
            jenisQE: jenisqe,
            proposal: proposal,
            pindah: req.roleName,
          });
        });
      });
    });
  });
};

exports.detailProposal = (req, res) => {
  // get role

  namaSTO.find({}, (err, namasto) => {
    Segmen.find({}, (err, segmen) => {
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
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/changedata");
    }
  );
};

exports.changesegmendata = (req, res) => {
  // change segmen data name to new name
  Segmen.findOneAndUpdate(
    { name: req.body.name },
    { name: req.body.namebaru },
    { new: true },
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/changedata");
    }
  );
};

exports.changejenisqedata = (req, res) => {
  // change jenisQE data name to new name
  jenisQE.findOneAndUpdate(
    { name: req.body.name },
    { name: req.body.namebaru },
    { new: true },
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/changedata");
    }
  );
};

exports.changenamaalprodata = (req, res) => {
  // change namaAlpro data name to new name
  namaAlpro.findOneAndUpdate(
    { name: req.body.name },
    { name: req.body.namebaru },
    { new: true },
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/changedata");
    }
  );
};

exports.addnamasto = (req, res) => {
  // add new namaSTO
  const namasto = new namaSTO({
    name: req.body.namebaru,
  });
  namasto.save((err, proposal) => {
    res.redirect("/adddata");
  });
};

exports.addjenisqe = (req, res) => {
  // add new jenisQE
  const jenisqe = new jenisQE({
    name: req.body.namebaru,
  });
  jenisqe.save((err, proposal) => {
    res.redirect("/adddata");
  });
};

exports.addnamaalpro = (req, res) => {
  // add new namaAlpro
  const namaalpro = new namaAlpro({
    name: req.body.namebaru,
  });
  namaalpro.save((err, proposal) => {
    res.redirect("/adddata");
  });
};

exports.addsegmen = (req, res) => {
  // add new namaAlpro
  const segmen = new Segmen({
    name: req.body.namebaru,
  });
  segmen.save((err, proposal) => {
    res.redirect("/adddata");
  });
};

exports.deletenamasto = (req, res) => {
  // delete namaSTO
  namaSTO.findOneAndDelete({ name: req.body.namebaru }, (err, proposal) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.redirect("/deletedata");
    // res.status(200).send(data);
  });
};

exports.deletesegmen = (req, res) => {
  // delete segmen
  Segmen.findOneAndDelete({ name: req.body.namebaru }, (err, proposal) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.redirect("/deletedata");
  });
};

exports.deletejenisqe = (req, res) => {
  // delete jenisQE
  jenisQE.findOneAndDelete({ name: req.body.namebaru }, (err, proposal) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.redirect("/deletedata");
  });
};

exports.deletenamaalpro = (req, res) => {
  // delete namaAlpro
  namaAlpro.findOneAndDelete({ name: req.body.namebaru }, (err, proposal) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.redirect("/deletedata");
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
  Segmen.find({}, (err, data) => {
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
  Proposal.find({}, (err, proposal) => {
    namaSTO.find({}, (err, namasto) => {
      Segmen.find({}, (err, segmen) => {
        jenisQE.find({}, (err, jenisqe) => {
          namaAlpro.find({}, (err, namaalpro) => {
            res.render("layouts/main-layout-proposer", {
              data: "deletedata",
              namaSTO: namasto,
              segmen: segmen,
              jenisQE: jenisqe,
              namaAlpro: namaalpro,
              pindah: req.roleName,
              proposal: proposal,
            });
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
  Proposal.find({}, (err, proposal) => {
    namaSTO.find({}, (err, namasto) => {
      Segmen.find({}, (err, segmen) => {
        jenisQE.find({}, (err, jenisqe) => {
          namaAlpro.find({}, (err, namaalpro) => {
            res.render("layouts/main-layout-proposer", {
              data: "adddata",
              namaSTO: namasto,
              segmen: segmen,
              jenisQE: jenisqe,
              namaAlpro: namaalpro,
              pindah: req.roleName,
              proposal: proposal,
            });
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
  Proposal.find({}, (err, proposal) => {
    namaSTO.find({}, (err, namasto) => {
      Segmen.find({}, (err, segmen) => {
        jenisQE.find({}, (err, jenisqe) => {
          namaAlpro.find({}, (err, namaalpro) => {
            res.render("layouts/main-layout-proposer", {
              data: "changedata",
              namaSTO: namasto,
              segmen: segmen,
              proposal: proposal,
              jenisQE: jenisqe,
              namaAlpro: namaalpro,
              pindah: req.roleName,
            });
          });
        });
      });
    });
  });
};

exports.editPasswordPage = (req, res) => {
  Proposal.find({}, (err, proposal) => {
    User.find({}, (err, user) => {
        res.render("layouts/main-layout-proposer", {
        data: "admineditpasswordpage",
        proposal: proposal,
        user: user,
        pindah: req.roleName,
      });
    });
  });
};

// exports.editPassword = (req, res) => {

//   const user = req.body.user
//   const newPassword = req.body.passwordbaru

//   const hashedPassword = bcrypt.hashSync(newPassword, 8); 
//   User.findByIdAndUpdate(
//     { username: user },
//     { password: hashedPassword },
//     { new: true },
//     (err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
//       res.redirect("/admineditpasswordpage");
//     }
//   );
// };

exports.editPassword = (req, res) => {
  const { user, passwordbaru } = req.body;

  const hashedPassword = bcrypt.hashSync(passwordbaru, 8); 

  User.findOneAndUpdate(
    { username: user }, // pencarian user berdasarkan username
    { password: hashedPassword },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/admineditpasswordpage");
    }
  );
};

