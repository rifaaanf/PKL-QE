require("dotenv").config();
const path = require("path");
const ejs = require("ejs");
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
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
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
    }
  });
}
