const db = require("../models");
const User = db.user;
const Role = db.role;
const Proposer = db.proposer;
const Approver = db.approver;
const bcrypt = require("bcryptjs");

exports.designerBoard = (req, res) => {
  res.status(200).send("Designer Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.proposerBoard = (req, res) => {
  res.status(200).send("Proposer Content.");
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

  // save user to database and make sure to save the user id to the approver/proposer
  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
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
  });
};
