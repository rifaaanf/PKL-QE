require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
// akan masuk otomatis ke index.js
const db = require("./app/models");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
//get mongourl from .env
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;
const Role = db.role;
const namaSTO = db.namaSTO;
const segmen = db.segmen;
const namaAlpro = db.namaAlpro;
const jenisQE = db.jenisQE;
const mitra = db.mitra;
const multer = require("multer");

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// const expressLayout = require('express-ejs-layouts')
// app.use(expressLayout)
app.use(cors(corsOptions));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./app/views"));
app.use(express.static(path.join(__dirname, "./app/views")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "design") {
      cb(null, "./app/views/uploads/design");
    } else if (file.fieldname === "rab") {
      cb(null, "./app/views/uploads/rab");
    } else if (file.fieldname === "designevidence") {
      cb(null, "./app/views/uploads/designevidence");
    } else if (file.fieldname === "rabevidence") {
      cb(null, "./app/views/uploads/rabevidence");
    } else if (file.fieldname === "batch") {
      cb(null, "./app/views/uploads/batch");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

app.use(
  multer({ storage: storage }).fields([
    { name: "design" },
    { name: "rab" },
    { name: "designevidence" },
    { name: "rabevidence" },
    { name: "batch" },
  ])
);

db.mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.render("index");
});
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/proposal.routes")(app);
require("./app/routes/designer.routes")(app);
require("./app/routes/approver.routes")(app);
require("./app/routes/executor.routes")(app);
require("./app/routes/proposer.routes")(app);


function initial() {
  jenisQE.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new jenisQE({
        name: "Normalisasi ODP",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Normalisasi ODP' to jenisQE collection");
      });

      new jenisQE({
        name: "Box ODP",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Box ODP' to jenisQE collection");
      });

      new jenisQE({
        name: "Perapihan ODC",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Perapihan ODC' to jenisQE collection");
      });
    }
  });
  namaAlpro.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new namaAlpro({
        name: "FE-01",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'FE-01' to namaAlpro collection");
      });

      new namaAlpro({
        name: "FE-02",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'FE-02' to namaAlpro collection");
      });

      new namaAlpro({
        name: "JHR-FB-D01",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'JHR-FB-D01' to namaAlpro collection");
      });

      new namaAlpro({
        name: "SMT-FB-D01",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'SMT-FB-D01' to namaAlpro collection");
      });

      new namaAlpro({
        name: "MJB-FB-D01",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'MJB-FB-D01' to namaAlpro collection");
      });

      new namaAlpro({
        name: "ODC-MJB-FA",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'ODC-MJB-FA' to namaAlpro collection");
      });

      new namaAlpro({
        name: "ODC-SMT-FA",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'ODC-SMT-FA' to namaAlpro collection");
      });

      new namaAlpro({
        name: "ODP-SMT-FB/001",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'ODP-SMT-FB/001' to namaAlpro collection");
      });

      new namaAlpro({
        name: "ODC-JHR-FA",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'ODC-JHR-FA' to namaAlpro collection");
      });

      new namaAlpro({
        name: "ODP-JHR-FB/001",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'ODP-JHR-FB/001' to namaAlpro collection");
      });
    }
  });
  segmen.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new segmen({
        name: "Kabel Feeder",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Kabel Feeder' to segmen collection");
      });

      new segmen({
        name: "ODC",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'ODC' to segmen collection");
      });

      new segmen({
        name: "Kabel/Distribusi",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Kabel/Distribusi' to segmen collection");
      });

      new segmen({
        name: "ODP",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'ODP' to segmen collection");
      });
    }
  });
  namaSTO.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new namaSTO({
        name: "SMT",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'SMT' to namaSTO collection");
      });

      new namaSTO({
        name: "JHR",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'JHR' to namaSTO collection");
      });

      new namaSTO({
        name: "MJB",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'MJB' to namaSTO collection");
      });
    }
  });
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "proposer",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'proposer' to roles collection");
      });

      new Role({
        name: "designer",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'designer' to roles collection");
      });

      new Role({
        name: "approver",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'approver' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "executor",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'executor' to roles collection");
      });
    }
  });
  mitra.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new mitra({
        name: "Mitra 1",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Mitra 1' to mitra collection");
      });

      new mitra({
        name: "Mitra 2",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Mitra 2' to mitra collection");
      });

      new mitra({
        name: "Mitra 3",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Mitra 3' to mitra collection");
      });
    }
  });
}

module.exports = app;