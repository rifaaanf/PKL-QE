const db = require("../models");
const User = db.user;
const namaSTO = db.namaSTO;
const Segmen = db.segmen;
const jenisQE = db.jenisQE;
const namaAlpro = db.namaAlpro;
const Proposal = db.proposal;
const Mitra = db.mitra;
const Role = require("../models/role.model");
const Admin = require("../models/admin.model");
const Proposer = require("../models/proposer.model");
const Designer = require("../models/designer.model");
const Executor = require("../models/executor.model");
const Approver = require("../models/approver.model");
const bcrypt = require("bcryptjs");

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

exports.getMitra = (req, res) => {
  Mitra.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.changestodata = (req, res) => {
  // change nama sto data name to new name
  namaSTO.findOneAndUpdate(
    { name: req.body.name },
    { name: req.body.namebaru },
    { new: true },
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/changedata");
    }
  );
};

exports.changemitra = (req, res) => {
  Mitra.findOneAndUpdate(
    { name: req.body.name },
    { name: req.body.namebaru },
    { new: true },
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/changedata");
    }
  );
};

exports.changesegmendata = (req, res) => {
  // change segmen data name to new name
  Segmen.findOneAndUpdate(
    { name: req.body.name },
    { name: req.body.namebaru },
    { new: true },
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/changedata");
    }
  );
};

exports.changejenisqedata = (req, res) => {
  // change jenisQE data name to new name
  jenisQE.findOneAndUpdate(
    { name: req.body.name },
    { name: req.body.namebaru },
    { new: true },
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/changedata");
    }
  );
};

exports.changenamaalprodata = (req, res) => {
  // change namaAlpro data name to new name
  namaAlpro.findOneAndUpdate(
    { name: req.body.name },
    { name: req.body.namebaru },
    { new: true },
    (err, proposal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/changedata");
    }
  );
};

exports.addnamasto = (req, res) => {
  // add new namaSTO
  const namasto = new namaSTO({
    name: req.body.namebaru,
  });
  namasto.save((err, proposal) => {
    res.redirect("/adddata");
  });
};

exports.addmitra = (req, res) => {
  const mitra = new Mitra({
    name: req.body.namebaru,
  });
  mitra.save((err, proposal) => {
    res.redirect("/adddata");
  });
};

exports.addjenisqe = (req, res) => {
  // add new jenisQE
  const jenisqe = new jenisQE({
    name: req.body.namebaru,
  });
  jenisqe.save((err, proposal) => {
    res.redirect("/adddata");
  });
};

exports.addnamaalpro = (req, res) => {
  // add new namaAlpro
  const namaalpro = new namaAlpro({
    name: req.body.namebaru,
  });
  namaalpro.save((err, proposal) => {
    res.redirect("/adddata");
  });
};

exports.addsegmen = (req, res) => {
  // add new namaAlpro
  const segmen = new Segmen({
    name: req.body.namebaru,
  });
  segmen.save((err, proposal) => {
    res.redirect("/adddata");
  });
};

exports.deletenamasto = (req, res) => {
  // delete namaSTO
  namaSTO.findOneAndDelete({ name: req.body.namebaru }, (err, proposal) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.redirect("/deletedata");
    // res.status(200).send(data);
  });
};

exports.deletesegmen = (req, res) => {
  // delete segmen
  Segmen.findOneAndDelete({ name: req.body.namebaru }, (err, proposal) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.redirect("/deletedata");
  });
};

exports.deletejenisqe = (req, res) => {
  // delete jenisQE
  jenisQE.findOneAndDelete({ name: req.body.namebaru }, (err, proposal) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.redirect("/deletedata");
  });
};

exports.deletenamaalpro = (req, res) => {
  // delete namaAlpro
  namaAlpro.findOneAndDelete({ name: req.body.namebaru }, (err, proposal) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.redirect("/deletedata");
  });
};

exports.deletemitra = (req, res) => {
  Mitra.findOneAndDelete({ name: req.body.namebaru }, (err, proposal) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.redirect("/deletedata");
  });
};

//get namasto
exports.getnamasto = (req, res) => {
  namaSTO.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//get segmen
exports.getsegmen = (req, res) => {
  Segmen.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

//get jenisqe
exports.getjenisqe = (req, res) => {
  jenisQE.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(data);
  });
};

exports.deletedata = (req, res) => {
  // get role

  // });
  // get all namaSTO and segmen
  Proposal.find({}, (err, proposal) => {
    namaSTO.find({}, (err, namasto) => {
      Segmen.find({}, (err, segmen) => {
        jenisQE.find({}, (err, jenisqe) => {
          namaAlpro.find({}, (err, namaalpro) => {
            res.render("layouts/main-layout-proposer", {
              data: "deletedata",
              namaSTO: namasto,
              segmen: segmen,
              jenisQE: jenisqe,
              namaAlpro: namaalpro,
              pindah: req.roleName,
              proposal: proposal,
            });
          });
        });
      });
    });
  });
};

exports.adddata = (req, res) => {
  // get role

  // });
  // get all namaSTO and segmen
  Proposal.find({}, (err, proposal) => {
    namaSTO.find({}, (err, namasto) => {
      Segmen.find({}, (err, segmen) => {
        jenisQE.find({}, (err, jenisqe) => {
          namaAlpro.find({}, (err, namaalpro) => {
            res.render("layouts/main-layout-proposer", {
              data: "adddata",
              namaSTO: namasto,
              segmen: segmen,
              jenisQE: jenisqe,
              namaAlpro: namaalpro,
              pindah: req.roleName,
              proposal: proposal,
            });
          });
        });
      });
    });
  });
};

exports.changedata = (req, res) => {
  // get role

  // });
  // get all namaSTO and segmen
  Proposal.find({}, (err, proposal) => {
    namaSTO.find({}, (err, namasto) => {
      Segmen.find({}, (err, segmen) => {
        jenisQE.find({}, (err, jenisqe) => {
          namaAlpro.find({}, (err, namaalpro) => {
            res.render("layouts/main-layout-proposer", {
              data: "changedata",
              namaSTO: namasto,
              segmen: segmen,
              proposal: proposal,
              jenisQE: jenisqe,
              namaAlpro: namaalpro,
              pindah: req.roleName,
            });
          });
        });
      });
    });
  });
};

exports.editPasswordPage = (req, res) => {
  Proposal.find({}, (err, proposal) => {
    User.find({}, (err, user) => {
      res.render("layouts/main-layout-proposer", {
        data: "admineditpasswordpage",
        proposal: proposal,
        user: user,
        pindah: req.roleName,
      });
    });
  });
};

// exports.editPassword = (req, res) => {

//   const user = req.body.user
//   const newPassword = req.body.passwordbaru

//   const hashedPassword = bcrypt.hashSync(newPassword, 8);
//   User.findByIdAndUpdate(
//     { username: user },
//     { password: hashedPassword },
//     { new: true },
//     (err, user) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
//       res.redirect("/admineditpasswordpage");
//     }
//   );
// };

exports.editPassword = (req, res) => {
  const { user, passwordbaru } = req.body;

  const hashedPassword = bcrypt.hashSync(passwordbaru, 8);

  User.findOneAndUpdate(
    { username: user }, // pencarian user berdasarkan username
    { password: hashedPassword },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.redirect("/admineditpasswordpage");
    }
  );
};

exports.userPanel = (req, res) => {
  let names = [];
  Proposal.find({}, (err, proposal) => {
    User.find({})
      .populate("roles", "name") // populate roles dengan nilai asli dari Role
      .exec((err, users) => {
        if (err) {
          console.error(err);
        } else {
          // foreach users, find nama from roles.name model and push to array
          users.forEach((user) => {
            if (user.roles.name === "admin") {
              Admin.findOne({ user: user._id }, (err, admin) => {
                names.push(admin.name);
              });
            }
            if (user.roles.name === "proposer") {
              Proposer.findOne({ user: user._id }, (err, proposer) => {
                names.push(proposer.name);
              });
            }
            if (user.roles.name === "designer") {
              Designer.findOne({ user: user._id }, (err, designer) => {
                user.nama = designer.name;
              });
            }
            if (user.roles.name === "approver") {
              Approver.findOne({ user: user._id }, (err, approver) => {
                user.nama = approver.name;
              });
            }
            if (user.roles.name === "executor") {
              Executor.findOne({ user: user._id }, (err, executor) => {
                user.nama = executor.name;
              });
            }
            if (user.roles.name === "viewer") {
              Viewer.findOne({ user: user._id }, (err, viewer) => {
                user.nama = viewer.name;
              });
            }
          });

          console.log(names);

          res.render("layouts/main-layout-proposer", {
            data: "userpanel",
            user: users,
            names: names,
            pindah: req.roleName,
            proposal: proposal,
          });
        }
      });
  });
};

exports.editUser = (req, res) => {
  Proposal.find({}, async (err, proposal) => {
    try {
      const id = req.params.id;

      const user = await User.findById(id).populate("roles").exec();

      const role = user.roles.name;
      let name;
      if (role === "admin") {
        const admin = await Admin.findOne({ user: id }).exec();
        name = admin.name;
      } else if (role === "proposer") {
        const proposer = await Proposer.findOne({ user: id }).exec();
        name = proposer.name;
      } else if (role === "designer") {
        const designer = await Designer.findOne({ user: id }).exec();
        name = designer.name;
      } else if (role === "executor") {
        const executor = await Executor.findOne({ user: id }).exec();
        name = executor.name;
      } else if (role === "approver") {
        const approver = await Approver.findOne({ user: id }).exec();
        name = approver.name;
      }

      // if (roleBaru != roleLama) {
      //   if (roleLama == "admin") {
      //     const admin = await Admin.findOneAndDelete({ user: id });
      //   } else if (roleLama) {}

      //   if (roleBaru == "admin") {
      //     const admin = new Admin({
      //       name: name,
      //       user: id,
      //     });
      //     await admin.save();
      //   }
      //   }
      // } else {}

      // update users schema
      // const user = await User.findByIdAndUpdate(id, {
      //   username: req.body.username,

      res.render("layouts/main-layout-proposer", {
        data: "edituser",
        user: user,
        name: name,
        pindah: req.roleName,
        proposal: proposal,
      });
    } catch (err) {
      console.error(err);
    }
  });
};

// TODO
// Step 1 => id dari req.params.id
// Step 2 => cari user berdasarkan id
// Step 3 => Cari role lama
// Step 4 => Get role baru
// Step 5 => Cek role lama != role baru
// Step 6 => Jika iya, hapus data lama di schema role lama, tambahkan data baru di schema role baru
// Step 7 => Jika tidak, update data di schema role lama (name)
// Step 8 => update data user di schema users

exports.editUserData = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id).populate("roles").exec();

    const roleLama = user.roles.name;

    let name;
    if (roleLama === "admin") {
      const admin = await Admin.findOne({ user: id }).exec();
      name = admin.name;
    } else if (roleLama === "proposer") {
      const proposer = await Proposer.findOne({ user: id }).exec();
      name = proposer.name;
    } else if (roleLama === "designer") {
      const designer = await Designer.findOne({ user: id }).exec();
      name = designer.name;
    } else if (roleLama === "executor") {
      const executor = await Executor.findOne({ user: id }).exec();
      name = executor.name;
    } else if (roleLama === "approver") {
      const approver = await Approver.findOne({ user: id }).exec();
      name = approver.name;
    }

    const roleBaru = req.body.roleBaru;

    if (roleBaru != roleLama) {
      if (roleLama == "admin") {
        await Admin.findOneAndDelete({ user: id });
      } else if (roleLama == "proposer") {
        await Proposer.findOneAndDelete({ user: id });
      } else if (roleLama == "designer") {
        await Designer.findOneAndDelete({ user: id });
      } else if (roleLama == "executor") {
        await Executor.findOneAndDelete({ user: id });
      } else if (roleLama == "approver") {
        await Approver.findOneAndDelete({ user: id });
      }

      if (roleBaru == "admin") {
        const admin = new Admin({
          name: name,
          user: id,
        });
        await admin.save();
      } else if (roleBaru == "proposer") {
        const proposer = new Proposer({
          name: name,
          user: id,
        });
        await proposer.save();
      } else if (roleBaru == "designer") {
        const designer = new Designer({
          name: name,
          user: id,
        });
        await designer.save();
      } else if (roleBaru == "executor") {
        const executor = new Executor({
          name: name,
          user: id,
        });
        await executor.save();
      } else if (roleBaru == "approver") {
        const approver = new Approver({
          name: name,
          user: id,
        });
        await approver.save();
      }
    } else {
      if (roleLama == "admin") {
        await Admin.findOneAndUpdate(
          { user: id },
          { $set: { name: req.body.name } }
        );
      } else if (roleLama == "proposer") {
        await Proposer.findOneAndUpdate(
          { user: id },
          { $set: { name: req.body.name } }
        );
      } else if (roleLama == "designer") {
        await Designer.findOneAndUpdate(
          { user: id },
          { $set: { name: req.body.name } }
        );
      } else if (roleLama == "executor") {
        await Executor.findOneAndUpdate(
          { user: id },
          { $set: { name: req.body.name } }
        );
      } else if (roleLama == "approver") {
        await Approver.findOneAndUpdate(
          { user: id },
          { $set: { name: req.body.name } }
        );
      }
    }

    const roleBaruId = await Role.findOne({ name: roleBaru }).exec();

    console.log(roleBaruId._id);

    await User.findByIdAndUpdate(id, {
      username: req.body.username,
      roles: roleBaruId._id,
    });

    res.redirect("/userpanel");
  } catch (err) {
    console.error(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.body.id;
    const user = await User.findById(id);
    const role = await Role.findById(user.roles);

    if (role.name === "admin") {
      await Admin.findOneAndDelete({ user: id });
    } else if (role.name === "proposer") {
      await Proposer.findOneAndDelete({ user: id });
    } else if (role.name === "designer") {
      await Designer.findOneAndDelete({ user: id });
    } else if (role.name === "executor") {
      await Executor.findOneAndDelete({ user: id });
    } else if (role.name === "approver") {
      await Approver.findOneAndDelete({ user: id });
    }
    await User.findByIdAndDelete(id);

    res.redirect("/userpanel");
  } catch (error) {
    next(error);
  }
};
