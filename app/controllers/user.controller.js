const db = require("../models");
const User = db.user;
const Role = db.role;
const Proposer = db.proposer;
const Admin = db.admin;
const Approver = db.approver;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const namaSTO = db.namaSTO;
const segmen = db.segmen;
const jenisQE = db.jenisQE;
const namaAlpro = db.namaAlpro;
const Proposal = db.proposal;
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
exports.designerBoard = (req, res) => {
  res.status(200).send("Designer Content.");
};

exports.adminBoard = (req, res) => {
  Proposal.find({})
    .sort({ createdAt: -1 })
    .exec((err, proposal) => {
      Proposer.find({}, (err, proposer) => {
        res.render("layouts/main-layout-admin", {
          data: "admin",
          proposal: proposal,
          proposer: proposer,
          pindah: req.roleName,
        });
      });
    });

  // Proposal.find({}, (err, proposal) => {
  //   Proposer.find({}, (err, proposer) => {
  //     res.render("layouts/main-layout-admin", {
  //       data: "admin",
  //       proposal: proposal,
  //       proposer: proposer,
  //     });
  //   });
  // });
};
exports.proposerBoard = (req, res) => {
  // get logged in user's role name from x-access-token on the cookie

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

exports.approverBoard = (req, res) => {
  res.status(200).send("Approver Content.");
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
