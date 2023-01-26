const { namaSTO, segmen } = require("../models");
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
exports.createProposal = async (req, res) => {
  // Validate request
  // Ambil data dari form
  const namaSTO = req.body.namaSTO;
  const segmen = req.body.segmen;
  const namaAlpro = req.body.namaAlpro;
  const jenisQE = req.body.jenisQE;
  const koordinatODPBaru = req.body.koordinatODPBaru;
  const keterangan = req.body.keterangan;
  const proposer = req.proposerId;
  const idProposal = await createIDProposal(namaSTO, segmen);

  Proposal.create(
    {
      idProposal: idProposal,
      namaSTO: namaSTO,
      segmen: segmen,
      namaAlpro: namaAlpro,
      jenisQE: jenisQE,
      koordinatODPBaru: koordinatODPBaru,
      keterangan: keterangan,
      proposer: proposer,
    },
    (err, proposal) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else {
        res.render("layouts/main-layout-proposer", {
          data: "proposalconfirmpage",
          idProposal: proposal.idProposal,
          namaSTO: proposal.namaSTO,
          segmen: proposal.segmen,
          namaAlpro: proposal.namaAlpro,
          jenisQE: proposal.jenisQE,
          koordinatODPBaru: proposal.koordinatODPBaru,
          keterangan: proposal.keterangan,
          pindah: req.roleName,
        });
      }
    }
  );
};

exports.proposaldesign = (req, res) => {
  // get path value from req.files
  const design = req.files.design[0].path;
  const rab = req.files.rab[0].path;

  Proposal.findByIdAndUpdate(
    req.params.id,
    { design: design, rab: rab },
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

//reject proposal
exports.rejectProposal = (req, res) => {
  Proposal.findByIdAndUpdate(
    req.params.id,
    { status: "REJECTED" },
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

async function createIDProposal(namaSTO, segmen) {
  const tahun = new Date().getFullYear();
  const year = tahun.toString();

  let segmenNumber;
  switch (segmen) {
    case "Kabel Feeder":
      segmenNumber = "01";
      break;
    case "ODC":
      segmenNumber = "02";
      break;
    case "Kabel/Distribusi":
      segmenNumber = "03";
      break;
    case "ODP":
      segmenNumber = "04";
      break;
    case "DC":
      segmenNumber = "05";
      break;
  }

  const result = await Proposal.find({ namaSTO: namaSTO, segmen: segmen }).sort(
    { idProposal: -1 }
  );

  let indeks;
  if (result.length > 0) {
    indeks = result[0].idProposal;
    const idArray = indeks.split("-");
    let indexArray = idArray[3];
    let numberIndex = parseInt(indexArray);

    if (numberIndex >= 1) {
      numberIndex++;
    }

    if (numberIndex.toString().length < 4) {
      numberIndex = "0".repeat(4 - numberIndex.toString().length) + numberIndex.toString();
    }

    let formattedIndex = `${namaSTO}-${segmenNumber}-${year}-${numberIndex}`;
    let x = formattedIndex.toString();

    return formattedIndex;
  } else {
    indeks = "0001";
    let formattedIndex = `${namaSTO}-${segmenNumber}-${year}-${indeks}`;
    formattedIndex.toString();
    return formattedIndex;
  }
}

exports.showProposal = (req, res) => {
  Proposal.find(
    {
      proposer: req.proposerId,
    },
    (err, proposals) => {
      if (err) throw err;

      res.render("layouts/main-layout-proposer", {
        data: "dashboard",
        proposals: proposals,
        pindah: req.roleName,
      });
    }
  );
};
