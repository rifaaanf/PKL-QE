const db = require("../models");

exports.addProposal = (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Content can not be empty"});
        return;
    }

    const proposal = new db({
        namaSTO: req.body.namaSTO,
        segmen: req.body.segmen,
        namaAlpro: req.body.namaAlpro,
        jenisQE: req.body.jenisQE,
        koordinatODPBaru: req.body.koordinatODPBaru,
        keterangan: req.body.keterangan,
    })

    proposal
        .save(proposal)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while creating a create operation"
            })
        })
}