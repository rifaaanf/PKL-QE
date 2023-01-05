const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/user.controller");
const verifySignUp = require("../middlewares/verifySignUp");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/approver",
     [authJwt.verifyToken, authJwt.isApprover],
    controller.approverBoard
  );
  app.get(
    "/proposer",
    [authJwt.verifyToken, authJwt.isProposer],
    controller.proposerBoard
  );
  app.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  // app.get(
  //   "/formAdmin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.formAdmin
  // );
  app.get(
    "/designer",
    [authJwt.verifyToken, authJwt.isDesigner],
    controller.designerBoard
  );
  app.post(
    "/signup",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    controller.signup
  );
};
