const mongoose = require("mongoose");

const proposal = mongoose.model(
  "Proposal",
  new mongoose.Schema({
    namaSTO: {
      type: String,
      required: [true, "Nama STO wajib diisi"],
    },
    segmen: {
      type: String,
      required: [true, "Segmen wajib diisi"],
    },
    namaAlpro: {
      type: String,
      required: [true, "Nama Alpro wajib diisi"],
    },
    jenisQE: {
      type: String,
      required: [true, "Jenis QE wajib diisi"],
    },
    koordinatODPBaru: {
      type: String,
    },
    keterangan: {
      type: String,
    },
    proposer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposer"
    },
  })
);

module.exports = proposal;