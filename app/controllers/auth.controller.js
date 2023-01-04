const SECRET = process.env.SECRET;
const db = require("../models");
const User = db.user;
const Proposer = db.proposer;
const Approver = db.approver;

var bcrypt = require("bcryptjs");
var jose = require("jose");

//sign in user and create a session for them and make jwt token based on their role
exports.signin = (req, res) => {
  var username = req.body.username;
  var data;

  if (username) {
    data = { username: username };
  } else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  User.findOne(data)
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      // check if session is already set if yes then respond with 200
      if (req.session.user) {
        return res.status(200).send({
          message: "User already logged in",
        });
      } else {
        // set session
        req.session.user = user.username;
        req.session.save(function (err) {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      }

      if (user.roles.name === "proposer") {
        Proposer.findOne({ user: user._id }, (err, proposer) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!proposer) {
            return res.status(404).send({ message: "Proposer Not found." });
          }
          var token = new jose.SignJWT({
            id: user._id,
            role: user.roles.name,
            name: proposer.name,
          })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("12h")
            .sign(new TextEncoder().encode(SECRET));
          res.status(200).send({
            id: user._id,
            username: user.username,
            roles: user.roles.name,
            name: proposer.name,
            accessToken: token,
          });
        });
      } else if (user.roles.name === "approver") {
        Approver.findOne({ user: user._id }, (err, approver) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!approver) {
            return res.status(404).send({ message: "Approver Not found." });
          }
          var token = new jose.SignJWT({
            id: user.id,
            role: user.roles.name,
            name: approver.name,
          })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("12h")
            .sign(new TextEncoder().encode(SECRET));
          res.status(200).send({
            id: user._id,
            username: user.username,
            roles: user.roles,
            name: approver.name,
            accessToken: token,
          });
        });
      } else {
        var token = jose.JWT.sign(
          {
            id: user.id,
            username: user.username,
            roles: user.roles,
          },
          SECRET,
          {
            expiresIn: 86400, // 24 hours
            algorithm: "HS256",
          }
        );
        res.status(200).send({
          id: user._id,
          username: user.username,
          roles: user.roles,
          accessToken: token,
        });
      }
    });
};

exports.signout = (req, res) => {
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect("/");
    });
  });
};
