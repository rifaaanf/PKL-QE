const db = require("../models");
const Proposal = db.proposal;

exports.createProposal = (req, res) => {
    let dataProposal = {
      namaSTO: req.body.namaSTO,
      segmen: req.body.segmen,
      namaAlpro: req.body.namaAlpro,
      jenisQE: req.body.jenisQE,
      koordinatODPBaru: req.body.koordinatODPBaru,
      keterangan: req.body.keterangan,
      proposer: req.proposerId
    };
    
    const proposal = new Proposal(dataProposal);
    
    proposal.save((err, proposal) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Proposal was uploaded successfully!" });
    });
};
    