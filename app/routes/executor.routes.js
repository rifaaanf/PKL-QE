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
        "/detail/:id/executor/pilihmitra",
        [authJwt.verifyToken],
        controller.pilihMitraPage
    );

    app.post(
        "/detail/:id/executor",
        [authJwt.verifyToken],
        controller.pilihMitra
    );
};
