const db = require("../models");
const namaSTO = db.namaSTO;
const segmen = db.segmen;
const jenisQE = db.jenisQE;
const namaAlpro = db.namaAlpro;
exports.formAdmin = (req, res) => {
  // namaSTO.find({}, (err, namasto) => {
  //   res.render("layouts/main-layout-admin", {
  //     data: "formAdmin",
  //     namaSTO: namasto,
  //   });
  // });
  // get all namaSTO and segmen
  namaSTO.find({}, (err, namasto) => {
    segmen.find({}, (err, segmen) => {
      jenisQE.find({}, (err, jenisqe) => {
        namaAlpro.find({}, (err, namaalpro) => {
          res.render("layouts/main-layout-admin", {
            data: "formAdmin",
            namaSTO: namasto,
            segmen: segmen,
            jenisQE: jenisqe,
            namaAlpro: namaalpro,
          });
        });
      });
    });
  });
};

//get all namaSTO
exports.getAllNamaSTO = (req, res) => {
  namaSTO.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//get all segmen
exports.getAllSegmen = (req, res) => {
  segmen.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//get all jenisQE
exports.getAllJenisQE = (req, res) => {
  jenisQE.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//get all namaAlpro
exports.getAllNamaAlpro = (req, res) => {
  namaAlpro.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};
