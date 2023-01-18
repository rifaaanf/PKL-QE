const db = require("../models");
const Proposal = db.proposal;

//update proposal by id from params
exports.updateProposal = (req, res) => {
  Proposal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(data);
    }
  );
};

exports.getAllProposal = (req, res) => {
  Proposal.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//get proposal by id
exports.getProposalById = (req, res) => {
  Proposal.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//create proposal
exports.createProposal = (req, res) => {
  // Validate request

  // Create a Proposal
  const proposal = new Proposal({
    namaSTO: req.body.namaSTO,
    segmen: req.body.segmen,
    namaAlpro: req.body.namaAlpro,
    jenisQE: req.body.jenisQE,
    koordinatODPBaru: req.body.koordinatODPBaru,
    keterangan: req.body.keterangan,
    proposer: req.proposerId,
    
  });

  // Save Proposal in the database
  proposal
    .save(proposal)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Proposal.",
      });
    });
};
