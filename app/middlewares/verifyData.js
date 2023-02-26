const db = require("../models");
const namaSTO = db.namaSTO;
const segmen = db.segmen;
const jenisQE = db.jenisQE;
const namaAlpro = db.namaAlpro;

checkDuplicateNamaSTO = (req, res, next) => {
  // Nama STO
  namaSTO
    .findOne({
      name: req.body.namebaru,
    })
    .exec((err, namaSTO) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (namaSTO) {
        res
          .status(400)
          .send({ message: "Failed! Nama STO is already in use!" });
        return;
      }
      next();
    });
};

// check duplicate data in namasto segmen jenisqe namaalpro
checkDuplicateData = (req, res, next) => {
  // Nama STO
  namaSTO.findOne({ name: req.body.namebaru }).exec((err, namaSTO) => {
    segmen.findOne({ name: req.body.namebaru }).exec((err, segmen) => {
      jenisQE.findOne({ name: req.body.namebaru }).exec((err, jenisQE) => {
        namaAlpro
          .findOne({ name: req.body.namebaru })
          .exec((err, namaAlpro) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            if (namaSTO) {
              res
                .status(400)
                .send({ message: "Failed! Nama STO is already in use!" });
              return;
            }
            if (segmen) {
              res
                .status(400)
                .send({ message: "Failed! Segmen is already in use!" });
              return;
            }
            if (jenisQE) {
              res
                .status(400)
                .send({ message: "Failed! Jenis QE is already in use!" });
              return;
            }
            if (namaAlpro) {
              res
                .status(400)
                .send({ message: "Failed! Nama Alpro is already in use!" });
              return;
            }
            next();
          });
      });
    });
  });
};

const verifyData = {
  checkDuplicateData,
};

module.exports = verifyData;
