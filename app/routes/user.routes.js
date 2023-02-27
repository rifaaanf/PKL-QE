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

  app.get("/needapproval", [authJwt.verifyToken], controller.needapproval);

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

  app.get(
    "/qereport",
    [authJwt.verifyToken],
    controller.qeReport
  );

  app.post(
    "/qereport",
    [authJwt.verifyToken],
    controller.qeReport
  );

  app.get(
    "/qereportlist",
    [authJwt.verifyToken],
    controller.qeReportList
  );

  app.post(
    "/qereportlist",
    [authJwt.verifyToken],
    controller.qeReportList
  );

  app.get("/dashboard", [authJwt.verifyToken], controller.dashboard);

  app.get("/submitted", [authJwt.verifyToken], controller.submitted);

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

  app.get("/approved", [authJwt.verifyToken], controller.approved);

  app.post(
    "/adduser",
    [verifySignUp.checkDuplicateUsername, verifySignUp.checkRolesExisted],
    controller.signup
  );

  app.get(
    "/adduser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adduser
  );
};
