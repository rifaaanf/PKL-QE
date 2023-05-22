const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const { get } = require("mongoose");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Proposer = db.proposer;
const Designer = db.designer;
const Proposal = db.proposal;
const Approver = db.approver;
const Executor = db.executor;
const Admin = db.admin;

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

getExecutorId = (req, res, next) => {
  Executor.findOne({
    user: req.userId,
  }).exec((err, executor) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    req.executorId = executor._id;
    next();
  });
};

getDesignerId = (req, res, next) => {
  Designer.findOne({
    user: req.userId,
  }).exec((err, designer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    req.designerId = designer._id;
    next();
  });
};

getProposerName = (req, res, next) => {
  Proposer.findOne({
    user: req.userId,
  }).exec((err, proposer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    req.proposerName = proposer.name;
    next();
  });
};

getExecutorName = (req, res, next) => {
  Executor.findOne({
    user: req.userId,
  }).exec((err, executor) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    req.executorName = executor.name;
    next();
  });
};

getDesignerName = (req, res, next) => {
  Designer.findOne({
    user: req.userId,
  }).exec((err, designer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    req.designerName = designer.name;
    next();
  });
};

getApproverName = (req, res, next) => {
  Approver.findOne({
    user: req.userId,
  }).exec((err, approver) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    req.approverName = approver.name;
    next();
  });
};

getAdminName = (req, res, next) => {
  Admin.findOne({
    user: req.userId,
  }).exec((err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    req.adminName = admin.name;
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

isExecutor = (req, res, next) => {
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
          if (roles[i].name === "executor") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Executor Role!" });
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
  getDesignerId,
  getExecutorId,
  isAdminDesignerApprover,
  isExecutor,
  getProposerName,
  getDesignerName,
  getApproverName,
  getExecutorName,
};
module.exports = authJwt;
