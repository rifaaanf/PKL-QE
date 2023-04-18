const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/designer.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/detail/:id/design",
    [authJwt.verifyToken],
    controller.designerDetail
  );

  app.get(
    "/detail/:id/design/upload",
    [authJwt.verifyToken],
    controller.uploadDesign
  );

  app.get(
    "/submittedproposal",
    [authJwt.verifyToken, authJwt.getDesignerId],
    controller.designerCompleteProposal
  );

  app.get(
    "/redesign",
    [authJwt.verifyToken],
    controller.designerRedesignProposal
  );
};
