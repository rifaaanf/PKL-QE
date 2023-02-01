const mongoose = require("mongoose");

const Proposal = mongoose.model(
  "Proposal",
  new mongoose.Schema(
    {
      idProposal: {
        type: String,
      },
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
        ref: "Proposer",
      },
      status: {
        type: String,
        enum: ["SUBMITTED", "APPROVED", "REJECTED", "REDESIGN", "INSTALLATION", "CLOSED"],
        default: "SUBMITTED",
      },
      design: {
        type: String,
      },
      rab: {
        type: String,
      },
      catatan: {
        type: String,
      },
      mitra: {
        type: String,
      },
    },
    { timestamps: true }
  )
);

module.exports = Proposal;
