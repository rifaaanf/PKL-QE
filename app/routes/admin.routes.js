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

  app.get("/api/admin/getAllNamaAlpro", controller.getAllNamaAlpro);

  app.get("/detail/:id", [authJwt.verifyToken], controller.detailProposal);

  app.post(
    "/changedata/namasto",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.changestodata
  );

  app.post(
    "/changedata/namaalpro",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.changenamaalprodata
  );

  app.post(
    "/changedata/segmen",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.changesegmendata
  );

  app.post(
    "/changedata/jenisqe",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.changejenisqedata
  );

  app.post(
    "/adddata/namasto",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addnamasto
  );

  app.post(
    "/adddata/alpro",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addnamaalpro
  );

  app.post(
    "/adddata/segmen",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addsegmen
  );

  app.post(
    "/adddata/jenisqe",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addjenisqe
  );

  app.post(
    "/deletedata/namasto",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deletenamasto
  );

  app.post(
    "/deletedata/namaalpro",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deletenamaalpro
  );

  app.post(
    "/deletedata/segmen",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deletesegmen
  );

  app.post(
    "/deletedata/jenisqe",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deletejenisqe
  );
};
