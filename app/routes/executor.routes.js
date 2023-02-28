const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/executor.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/detail/:id/executor",
    [authJwt.verifyToken],
    controller.executorDetail
  );

  app.get(
    "/detail/:id/closeddetail",
    [authJwt.verifyToken],
    controller.closedDetail
  );

  app.get(
    "/detail/:id/executor/gantimitra",
    [authJwt.verifyToken],
    controller.changeMitra
  );

  app.post(
    "/detail/:id/executor/gantimitra",
    [authJwt.verifyToken, authJwt.isExecutor, authJwt.getExecutorName, authJwt.getExecutorId],
    controller.gantiMitra
  );

  app.get(
    "/detail/:id/executor/pilihmitra",
    [authJwt.verifyToken],
    controller.pilihMitraPage
  );

  app.post(
    "/detail/:id/executor/pilihmitra",
    [authJwt.verifyToken, authJwt.isExecutor, authJwt.getExecutorName, authJwt.getExecutorId],
    controller.pilihMitra
  );

  app.get(
    "/installationproposal",
    [authJwt.verifyToken, authJwt.isExecutor, authJwt.getExecutorId],
    controller.executorInstallationProposal
  );

  app.get(
    "/allinstallationproposal",
    [authJwt.verifyToken],
    controller.allExecutorInstallationProposal
  );

  app.get(
    "/allclosedproposal",
    [authJwt.verifyToken],
    controller.allExecutorClosedProposal
  );

  app.get(
    "/closedproposal",
    [authJwt.verifyToken, authJwt.isExecutor, authJwt.getExecutorId],
    controller.executorClosedProposal
  );

  app.get(
    "/detail/:id/executor/upload",
    [authJwt.verifyToken],
    controller.uploadInstallationEvidence
  );

  app.post(
    "/detail/:id/executor",
    [authJwt.verifyToken],
    controller.pilihMitra
  );
};
