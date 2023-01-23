const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/proposal.controller");
const { isAdminOrDesigner } = require("../middlewares/authJwt");

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
    [authJwt.verifyToken, authJwt.isProposer, authJwt.getProposerId],
    controller.createProposal
  );

  //get proposal by id
  app.get(
    "/api/admin/proposal/:id",
    [authJwt.verifyToken, isAdminOrDesigner],
    controller.getProposalById
  );

  //get all proposal
  app.get("/proposal", [authJwt.verifyToken], controller.getAllProposal);

  app.post("/detail/:id/design", controller.proposaldesign);

  //reject proposal
  app.post("/proposal/reject/:id", controller.rejectProposal);

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
    "/dashboard",
    [authJwt.verifyToken, authJwt.isProposer, authJwt.getProposerId],
    controller.showProposal
  );
};
