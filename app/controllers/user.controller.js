const db = require("../models");
const User = db.user;
const Role = db.role;
const Proposer = db.proposer;
const fs = require("fs");
const Admin = db.admin;
const Approver = db.approver;
const bcrypt = require("bcryptjs");
const Designer = db.designer;
const namaSTO = db.namaSTO;
const segmen = db.segmen;
const jenisQE = db.jenisQE;
const namaAlpro = db.namaAlpro;
const Proposal = db.proposal;
const csv = require("csvtojson");
const Executor = db.executor;
exports.designerBoard = (req, res) => {
  Proposal.find({})
    .sort({ updatedAt: -1 })
    .exec((err, proposal) => {
      Proposer.find({}, (err, proposer) => {
        res.render("layouts/main-layout-designer", {
          data: "designer",
          proposal: proposal,
          proposer: proposer,
          pindah: req.roleName,
        });
      });
    });
};

exports.submitted = (req, res) => {
  Proposal.find({})
    .sort({ createdAt: -1 })
    .exec((err, proposal) => {
      Proposer.find({}, (err, proposer) => {
        res.render("layouts/main-layout-designer", {
          data: "submitted",
          proposal: proposal,
          proposer: proposer,
          pindah: req.roleName,
        });
      });
    });
};

exports.batchnamasto = (req, res) => {
  // create namasto from csv file
  csv()
    .fromFile(req.files.batch[0].path)
    .then((jsonObj) => {
      jsonObj.forEach((row) => {
        new namaSTO({
          name: row.name,
        }).save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      });
      //send res status then delete file
      res.status(200).send({ message: "Nama STO added successfully" });
      fs.unlinkSync(req.files.batch[0].path);
    });
};

exports.batchsegmen = (req, res) => {
  // create namasto from csv file
  csv()
    .fromFile(req.files.batch[0].path)
    .then((jsonObj) => {
      jsonObj.forEach((row) => {
        new segmen({
          name: row.name,
        }).save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      });
      //send res status then delete file
      res.status(200).send({ message: "Segmen added successfully" });
      fs.unlinkSync(req.files.batch[0].path);
    });
};

exports.batchnamaalpro = (req, res) => {
  // create namasto from csv file
  csv()
    .fromFile(req.files.batch[0].path)
    .then((jsonObj) => {
      jsonObj.forEach((row) => {
        new namaAlpro({
          name: row.name,
        }).save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      });
      //send res status then delete file
      res.status(200).send({ message: "Nama Alpro added successfully" });
      fs.unlinkSync(req.files.batch[0].path);
    });
};

exports.batchjenisqe = (req, res) => {
  // create namasto from csv file
  csv()
    .fromFile(req.files.batch[0].path)
    .then((jsonObj) => {
      jsonObj.forEach((row) => {
        new jenisQE({
          name: row.name,
        }).save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      });
      //send res status then delete file
      res.status(200).send({ message: "Jenis QE added successfully" });
      fs.unlinkSync(req.files.batch[0].path);
    });
};

exports.dashboard = (req, res) => {
  Proposal.find({})
    .sort({ createdAt: -1 })
    .exec((err, proposal) => {
      Proposer.find({}, (err, proposer) => {
        res.render("layouts/main-layout-approver", {
          data: "dashboard",
          proposal: proposal,
          proposer: proposer,
          pindah: req.roleName,
        });
      });
    });
};

exports.proposerBoard = (req, res) => {
  // get logged in user's role name from x-access-token on the cookie
  Proposal.find({}, (err, proposal) => {
    namaSTO.find({}, (err, namasto) => {
      segmen.find({}, (err, segmen) => {
        namaAlpro.find({}, (err, namaAlpro) => {
          jenisQE.find({}, (err, jenisqe) => {
            res.render("layouts/main-layout-proposer", {
              data: "proposer",
              proposal: proposal,
              namaSTO: namasto,
              segmen: segmen,
              namaAlpro: namaAlpro,
              jenisQE: jenisqe,
              pindah: req.roleName,
            });
          });
        });
      });
    });
  });
};

exports.qeReport = (req, res) => {
  // get logged in user's role name from x-access-token on the cookie
  Proposal.find({}, (err, proposal) => {
    namaSTO.find({}, (err, namasto) => {
      segmen.find({}, (err, segmen) => {
        namaAlpro.find({}, (err, namaAlpro) => {
          jenisQE.find({}, (err, jenisqe) => {
            res.render("layouts/main-layout-proposer", {
              data: "qereport",
              proposal: proposal,
              namaSTO: namasto,
              segmen: segmen,
              namaAlpro: namaAlpro,
              jenisQE: jenisqe,
              pindah: req.roleName,
            });
          });
        });
      });
    });
  });
};

exports.qeReportList = (req, res) => {
  let namaSTO = req.body.namaSTO;
  let segmen = req.body.segmen;
  let namaAlpro = req.body.namaAlpro;
  let jenisQE = req.body.jenisQE;
  let bulan = req.body.bulan;
  let regek = new RegExp(bulan, "i");

  let query = {
    namaSTO,
    segmen,
    namaAlpro: namaAlpro ? namaAlpro : { $exists: true },
    jenisQE: jenisQE ? jenisQE : { $exists: true },
    timeline: {
      $elemMatch: {
        1: regek,
        2: /CLOSED/,
      },
    },
  };

  Proposal.find(query, (err, proposal) => {
    if (err) throw err;
    res.render("layouts/main-layout-proposer", {
      data: "qereportlist",
      proposal: proposal,
      pindah: req.roleName,
      namaSTO: namaSTO,
      segmen: segmen,
      namaAlpro: namaAlpro,
      jenisQE: jenisQE,
      bulan: bulan,
    });
  });
};

exports.approverBoard = (req, res) => {
  Proposal.find({})
    .sort({ createdAt: -1 })
    .exec((err, proposal) => {
      if (err) throw err;

      res.render("layouts/main-layout-approver", {
        data: "approver",
        proposal: proposal,
        pindah: req.roleName,
      });
    });
};

exports.needapproval = (req, res) => {
  Proposal.find({})
    .sort({ createdAt: -1 })
    .exec((err, proposal) => {
      if (err) throw err;

      res.render("layouts/main-layout-approver", {
        data: "needapproval",
        proposal: proposal,
        pindah: req.roleName,
      });
    });
};

exports.rejected = (req, res) => {
  Proposal.find({})
    .sort({ createdAt: -1 })
    .exec((err, proposal) => {
      if (err) throw err;

      res.render("layouts/main-layout-approver", {
        data: "rejected",
        proposal: proposal,
        pindah: req.roleName,
      });
    });
};

exports.rejectedDetail = (req, res) => {
  var id = req.params.id;
  Proposal.findById(id, (err, proposal) => {
    res.render("layouts/main-layout-executor", {
      data: "rejecteddetail",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};

exports.uploadBatch = (req, res) => {
  Proposal.find({}, (err, proposal) => {
    res.render("layouts/main-layout-executor", {
      data: "batch",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};

exports.executorBoard = (req, res) => {
  Proposal.find({})
    .sort({ createdAt: -1 })
    .exec((err, proposal) => {
      Proposer.find({}, (err, proposer) => {
        res.render("layouts/main-layout-executor", {
          data: "executor",
          proposal: proposal,
          proposer: proposer,
          pindah: req.roleName,
        });
      });
    });
};

exports.approved = (req, res) => {
  Proposal.find({})
    .sort({ createdAt: -1 })
    .exec((err, proposal) => {
      Proposer.find({}, (err, proposer) => {
        res.render("layouts/main-layout-executor", {
          data: "approved",
          proposal: proposal,
          proposer: proposer,
          pindah: req.roleName,
        });
      });
    });
};

exports.adduser = (req, res) => {
  Proposal.find({}, (err, proposal) => {
    res.render("layouts/main-layout-admin", {
      data: "adduser",
      pindah: req.roleName,
      proposal: proposal,
    });
  });
};

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  const proposer = new Proposer({
    user: user._id,
    name: req.body.name,
  });

  const approver = new Approver({
    user: user._id,
    name: req.body.name,
  });

  const admin = new Admin({
    user: user._id,
    name: req.body.name,
  });

  const designer = new Designer({
    user: user._id,
    name: req.body.name,
  });

  const executor = new Executor({
    user: user._id,
    name: req.body.name,
  });
  // save user to database and make sure to save the user id to the approver/proposer
  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    if (req.body.roles == "proposer") {
      Role.findOne(
        {
          name: "proposer",
        },
        (err, role) => {
          //if error then delete user
          if (err) {
            User.findByIdAndRemove(user._id, (err) => {
              if (err) {
                res.status(500).send({
                  message: err,
                });
                return;
              }
            });
            res.status(500).send({
              message: err,
            });
            return;
          }
          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
              return;
            }
            proposer.save((err, proposer) => {
              if (err) {
                res.status(500).send({
                  message: err,
                });
                return;
              }
              res.send({
                message: "User was registered successfully!",
              });
            });
          });
        }
      );
    } else if (req.body.roles == "approver") {
      Role.findOne(
        {
          name: "approver",
        },
        (err, role) => {
          //if error then delete user
          if (err) {
            User.findByIdAndRemove(user._id, (err) => {
              if (err) {
                res.status(500).send({
                  message: err,
                });
                return;
              }
            });
            res.status(500).send({
              message: err,
            });
            return;
          }
          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
              return;
            }
            approver.save((err, approver) => {
              if (err) {
                res.status(500).send({
                  message: err,
                });
                return;
              }
              res.send({
                message: "User was registered successfully!",
              });
            });
          });
        }
      );
    } else if (req.body.roles == "designer") {
      Role.findOne(
        {
          name: "designer",
        },
        (err, role) => {
          //if error then delete user
          if (err) {
            User.findByIdAndRemove(user._id, (err) => {
              if (err) {
                res.status(500).send({
                  message: err,
                });
                return;
              }
            });
            res.status(500).send({
              message: err,
            });
            return;
          }
          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
              return;
            }
            designer.save((err, designer) => {
              if (err) {
                res.status(500).send({
                  message: err,
                });
                return;
              }
              res.send({
                message: "User was registered successfully!",
              });
            });
          });
        }
      );
    } else if (req.body.roles == "admin") {
      Role.findOne(
        {
          name: "admin",
        },
        (err, role) => {
          //if error then delete user
          if (err) {
            User.findByIdAndRemove(user._id, (err) => {
              if (err) {
                res.status(500).send({
                  message: err,
                });
                return;
              }
            });
            res.status(500).send({
              message: err,
            });
            return;
          }
          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
              return;
            }
            admin.save((err, admin) => {
              if (err) {
                res.status(500).send({
                  message: err,
                });
                return;
              }
              res.send({
                message: "User was registered successfully!",
              });
            });
          });
        }
      );
    } else if (req.body.roles == "executor") {
      Role.findOne(
        {
          name: "executor",
        },
        (err, role) => {
          //if error then delete user
          if (err) {
            User.findByIdAndRemove(user._id, (err) => {
              if (err) {
                res.status(500).send({
                  message: err,
                });
                return;
              }
            });
            res.status(500).send({
              message: err,
            });
            return;
          }
          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
              return;
            }
            executor.save((err, executor) => {
              if (err) {
                res.status(500).send({
                  message: err,
                });
                return;
              }
              res.send({
                message: "User was registered successfully!",
              });
            });
          });
        }
      );
    } else {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
              return;
            }

            res.send({
              message: "User was registered successfully!",
            });
          });
        }
      );
    }
  });
};

exports.changePasswordUserPage = (req, res) => {
  Proposal.find({}, (err, proposal) => {
    if (err) throw err;

    res.render("layouts/main-layout-executor", {
      data: "changepassworduserpage",
      proposal: proposal,
      pindah: req.roleName,
    });
  });
};

exports.changePasswordUser = (req, res) => {
  const oldPassword = req.body.passwordlama;
  const newPassword = req.body.passwordbaru;
  const confirmPassword = req.body.konfirmasipasswordbaru;

  const hashedPassword = bcrypt.hashSync(newPassword, 8);

  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const isOldPasswordValid = bcrypt.compareSync(oldPassword, user.password);
    if (!isOldPasswordValid) {
      const errorMessage = "Password Lama Tidak Sesuai";
      res.redirect(
        400,
        "/changepassworduserpage?error=" + encodeURIComponent(errorMessage)
      );
      return;
    }

    // if (newPassword !== confirmPassword) {
    //   res.status(400).send({ message: "konfirmasi password baru tidak sama dengan password baru" });
    //   return;
    // }

    User.findByIdAndUpdate(
      req.userId,
      { password: hashedPassword },
      { new: true },
      (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.redirect("/changepassworduserpage");
      }
    );
  });
};
