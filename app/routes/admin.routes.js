const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/admin.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/formAdmin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.formAdmin
  );

  app.get(
    "/api/admin/getAllNamaAlpro",

    controller.getAllNamaAlpro
  );
};
