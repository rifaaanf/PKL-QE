const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/admin.controller");
const verifyData = require("../middlewares/verifyData");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/admin/getAllNamaAlpro", controller.getAllNamaAlpro);
  app.get("/api/admin/getAllNamaSTO", controller.getnamasto);
  app.get("/api/admin/getAllSegmen", controller.getsegmen);
  app.get("/api/admin/getAllJenisQE", controller.getjenisqe);
  app.get("/api/admin/getAllMitra", controller.getMitra);

  app.get(
    "/changedata",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.changedata
  );

  app.get(
    "/admineditpasswordpage",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editPasswordPage
  );

  app.post(
    "/admineditpasswordpage",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editPassword
  );

  app.post(
    "/changedata",
    [authJwt.verifyToken, authJwt.isAdmin, verifyData.checkDuplicateData],
    (req, res) => {
      if (req.body.jenis === "Jenis QE") {
        controller.changejenisqedata(req, res);
      } else if (req.body.jenis === "Nama STO") {
        controller.changestodata(req, res);
      } else if (req.body.jenis === "Segmen") {
        controller.changesegmendata(req, res);
      } else if (req.body.jenis === "Nama Alpro") {
        controller.changenamaalprodata(req, res);
      } else if (req.body.jenis === "Mitra") {
        controller.changemitra(req, res);
      }
    }
  );

  app.get(
    "/adddata",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adddata
  );

  app.post(
    "/adddata",
    [authJwt.verifyToken, authJwt.isAdmin, verifyData.checkDuplicateData],
    (req, res) => {
      if (req.body.jenis === "Jenis QE") {
        controller.addjenisqe(req, res);
      } else if (req.body.jenis === "Nama STO") {
        controller.addnamasto(req, res);
      } else if (req.body.jenis === "Segmen") {
        controller.addsegmen(req, res);
      } else if (req.body.jenis === "Nama Alpro") {
        controller.addnamaalpro(req, res);
      } else if (req.body.jenis === "Mitra") {
        controller.addmitra(req, res);
      }
    }
  );

  app.get(
    "/deletedata",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deletedata
  );

  app.post(
    "/deletedata",
    [authJwt.verifyToken, authJwt.isAdmin],
    (req, res) => {
      if (req.body.jenis === "Jenis QE") {
        controller.deletejenisqe(req, res);
      } else if (req.body.jenis === "Nama STO") {
        controller.deletenamasto(req, res);
      } else if (req.body.jenis === "Segmen") {
        controller.deletesegmen(req, res);
      } else if (req.body.jenis === "Nama Alpro") {
        controller.deletenamaalpro(req, res);
      } else if (req.body.jenis === "Mitra") {
        controller.deletemitra(req, res);
      }
    }
  );

  //   app.post(
  //     "/deletedata/namasto",
  //     [authJwt.verifyToken, authJwt.isAdmin],
  //     controller.deletenamasto
  //   );

  //   app.post(
  //     "/deletedata/namaalpro",
  //     [authJwt.verifyToken, authJwt.isAdmin],
  //     controller.deletenamaalpro
  //   );

  //   app.post(
  //     "/deletedata/segmen",
  //     [authJwt.verifyToken, authJwt.isAdmin],
  //     controller.deletesegmen
  //   );

  //   app.post(
  //     "/deletedata/jenisqe",
  //     [authJwt.verifyToken, authJwt.isAdmin],
  //     controller.deletejenisqe
  //   );
};
