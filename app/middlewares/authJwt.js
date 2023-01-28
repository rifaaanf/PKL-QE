const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Proposer = db.proposer;
const Proposal = db.proposal;
const Approver = db.approver;

getProposerId = (req, res, next) => {
  Proposer.findOne({
    user: req.userId,
  }).exec((err, proposer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    req.proposerId = proposer._id;
    next();
  });
};

verifyToken = (req, res, next) => {
  //get token from cookies
  let token = req.cookies["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    req.roleName = decoded.role;
    next();
  });
};

isAdminDesignerApprover = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (
            roles[i].name === "admin" ||
            roles[i].name === "designer" ||
            roles[i].name === "approver"
          ) {
            next();
            return;
          }
        }

        res
          .status(403)
          .send({ message: "Require Admin , Designer, or Approver Role!" });
        return;
      }
    );
  });
};

isProposer = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "proposer") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Proposer Role!" });
        return;
      }
    );
  });
};

isApprover = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "approver") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Approver Role!" });
        return;
      }
    );
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isDesigner = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "designer") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Designer Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isProposer,
  isApprover,
  isAdmin,
  isDesigner,
  getProposerId,
  isAdminDesignerApprover,
};
module.exports = authJwt;
