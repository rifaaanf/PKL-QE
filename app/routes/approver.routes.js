const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/approver.controller");

module.exports = function (app) {
  app.get(
    "/detail/:id/approver",
    [authJwt.verifyToken],
    controller.approverDetail
  );
};
