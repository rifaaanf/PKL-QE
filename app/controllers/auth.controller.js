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

      if (user.roles.name == "proposer") {
        // Get mahasiswa name from user.id
        const proposer = await Proposer.findOne(
          { user: user._id },
          (err, proposer) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            return proposer;
          }
        );

        var token = await new jose.SignJWT({
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
          accessToken: token,
        });
      } else {
        var token = await new jose.SignJWT({
          id: user.id,
          role: user.roles.name,
        })
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setIssuedAt()
          .setExpirationTime("12h")
          .sign(new TextEncoder().encode(SECRET));

        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: user.roles.name,
          accessToken: token,
        });
      }
    });
};

exports.signout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "User logged out" });
  });
};
