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
    "/detail/:id/rejectedDetail",
    [authJwt.verifyToken],
    controller.rejectedDetail
  );

  app.get(
    "/approver",
    [authJwt.verifyToken, authJwt.isApprover],
    controller.approverBoard
  );

  app.get("/rejected", [authJwt.verifyToken], controller.rejected);

  app.get("/needapproval", [authJwt.verifyToken], controller.approverBoard);

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

  app.get("/dashboard", [authJwt.verifyToken], controller.dashboard);

  // app.get(
  //   "/formAdmin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.formAdmin
  // );

  app.get("/submitted", [authJwt.verifyToken], controller.designerBoard);

  app.get(
    "/designer",
    [authJwt.verifyToken, authJwt.isDesigner],
    controller.designerBoard
  );
  app.get(
    "/executor",
    [authJwt.verifyToken, authJwt.isExecutor],
    controller.executorBoard
  );

  app.get("/approved", [authJwt.verifyToken], controller.executorBoard);

  app.post(
    "/signup",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    controller.signup
  );
};
