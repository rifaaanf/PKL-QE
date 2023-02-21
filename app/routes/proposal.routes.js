const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/proposal.controller");
const { isAdminOrDesigner, getDesignerId } = require("../middlewares/authJwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/proposal",
    [
      authJwt.verifyToken,
      authJwt.isProposer,
      authJwt.getProposerId,
      authJwt.getProposerName,
    ],
    controller.createProposal
  );

  //get proposal by id
  app.get(
    "/api/admin/proposal/:id",
    [authJwt.verifyToken, isAdminDesignerApprover],
    controller.getProposalById
  );

  app.get("/detail/:id/design/download", controller.downloaddesign);

  app.get("/detail/:id/rab/download", controller.downloadrab);

  //get all proposal
  app.get("/proposal", [authJwt.verifyToken], controller.getAllProposal);

  app.post(
    "/detail/:id/design",
    [authJwt.verifyToken, authJwt.getDesignerName, authJwt.getDesignerId],
    controller.proposaldesign
  );

  // app.post(
  //   "/designer",
  //   [authJwt.verifyToken, authJwt.isDesigner],
  //   controller.proposaldesign
  // );

  app.post(
    "/detail/:id/design/upload",
    [authJwt.verifyToken],
    controller.proposaldesign
  );

  app.post(
    "/detail/:id/executor/upload",
    [authJwt.verifyToken, authJwt.getExecutorName],
    controller.proposalclose
  );

  app.post(
    "/proposal/approve/:id",
    [authJwt.verifyToken, authJwt.isApprover, authJwt.getApproverName],
    controller.approveProposal
  );
  //reject proposal
  app.post(
    "/proposal/designer/reject/:id",
    [authJwt.verifyToken, authJwt.isDesigner, authJwt.getDesignerName],
    controller.designerRejectProposal
  );

  app.post(
    "/proposal/approver/reject/:id",
    [authJwt.verifyToken, authJwt.isApprover, authJwt.getApproverName],
    controller.approverRejectProposal
  );

  app.post(
    "/proposal/approver/redesign/:id",
    [authJwt.verifyToken, authJwt.isApprover, authJwt.getApproverName],
    controller.redesignProposal
  );

  app.post(
    "/proposal/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateProposal
  );

  app.get(
    "/proposalconfirmpage",
    [authJwt.verifyToken, authJwt.isProposer],
    controller.createProposal
  );

  app.get(
    "/showproposal",
    [authJwt.verifyToken, authJwt.isProposer, authJwt.getProposerId],
    controller.showProposal
  );
};
