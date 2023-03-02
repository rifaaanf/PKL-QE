const { namaSTO, segmen } = require("../models");
const db = require("../models");
const Proposal = db.proposal;
const fs = require("fs");

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

exports.downloaddesign = (req, res) => {
  Proposal.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!data.design) {
      res.status(404).send({ message: "Design not found" });
      return;
    }
    const file = fs.createReadStream(data.design);
    const filename = "DESIGN_" + data.idProposal + ".kml";
    res.setHeader("Content-disposition", "attachment; filename=" + filename);
    file.pipe(res);
  });
};

exports.downloadrab = (req, res) => {
  Proposal.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!data.rab) {
      res.status(404).send({ message: "RAB not found" });
      return;
    }
    const file = fs.createReadStream(data.rab);
    const filename = "RAB_" + data.idProposal + ".xlsx";
    res.setHeader("Content-disposition", "attachment; filename=" + filename);
    file.pipe(res);
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
  const timeline = [[req.proposerName, Date(), "SUBMITTED"]];
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
      timeline: timeline,
    },
    (err, proposal) => {
      if (err) {
        console.log(err);
        res.redirect("/proposer");
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
          proposal: proposal,
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

  //update proposal design and rab and when design and rab is exist in database then delete old file
  Proposal.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (data.design) {
      fs.unlink(data.design, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (data.rab) {
      fs.unlink(data.rab, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    Proposal.findByIdAndUpdate(
      req.params.id,
      {
        status: "SUBMITTED",
        design: design,
        rab: rab,
        designer: req.designerId,
        nilairab: req.body.nilairab,
        timeline: data.timeline.concat([
          [req.designerName, Date(), "NEED APPROVAL"],
        ]),
      },
      { new: true },
      (err, proposal) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.redirect("/designer");
      }
    );
  });
};

exports.proposalclose = (req, res) => {
  // get path value from req.files
  const designevidence = req.files.designevidence[0].path;
  const rabevidence = req.files.rabevidence[0].path;

  //update proposal design and rab and when design and rab is exist in database then delete old file
  Proposal.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (data.designevidence) {
      fs.unlink(data.designevidence, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (data.rabevidence) {
      fs.unlink(data.rabevidence, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    Proposal.findByIdAndUpdate(
      req.params.id,
      {
        status: "CLOSED",
        designevidence: designevidence,
        rabevidence: rabevidence,
        nilairabevidence: req.body.nilairabevidence,
        executor: req.executorId,
        timeline: data.timeline.concat([[req.executorName, Date(), "CLOSED"]]),
      },
      { new: true },
      (err, proposal) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.redirect("/closedproposal");
      }
    );
  });
};

//reject proposal
exports.designerRejectProposal = (req, res) => {
  Proposal.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Proposal.findByIdAndUpdate(
      req.params.id,
      {
        status: "REJECTED",
        catatan: req.body.catatan,
        //update timeline
        timeline: data.timeline.concat([
          [req.designerName, Date(), "REJECTED"],
        ]),
      },
      { new: true },
      (err, proposal) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.redirect("/designer");
      }
    );
  });
};

exports.approverRejectProposal = (req, res) => {
  Proposal.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Proposal.findByIdAndUpdate(
      req.params.id,
      {
        status: "REJECTED",
        catatan: req.body.catatan,
        //update timeline
        timeline: data.timeline.concat([
          [req.approverName, Date(), "REJECTED"],
        ]),
      },
      { new: true },
      (err, data) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.redirect("/approver");
      }
    );
  });
};

exports.redesignProposal = (req, res) => {
  Proposal.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Proposal.findByIdAndUpdate(
      req.params.id,
      {
        status: "REDESIGN",
        catatan: req.body.catatan,
        //update timeline
        timeline: data.timeline.concat([
          [req.approverName, Date(), "REDESIGN"],
        ]),
      },
      { new: true },
      (err, data) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.redirect("/approver");
      }
    );
  });
};

exports.approveProposal = (req, res) => {
  Proposal.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Proposal.findByIdAndUpdate(
      req.params.id,
      {
        status: "APPROVED",
        //update timeline
        timeline: data.timeline.concat([
          [req.approverName, Date(), "APPROVED"],
        ]),
      },
      { new: true },
      (err, proposal) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.redirect("/approver");
      }
    );
  });
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
    case "Tiang":
      segmenNumber = "06";
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
      numberIndex =
        "0".repeat(4 - numberIndex.toString().length) + numberIndex.toString();
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
  Proposal.find({
    proposer: req.proposerId,
  })
    .sort({ updatedAt: -1 })
    .exec((err, proposal) => {
      if (err) throw err;

      res.render("layouts/main-layout-proposer", {
        data: "showproposal",
        proposal: proposal,
        pindah: req.roleName,
      });
    });
};
