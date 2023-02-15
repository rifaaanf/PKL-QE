const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/proposer.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/myproposal/:id",
    [authJwt.verifyToken, authJwt.isProposer],
    controller.proposerDetail
  );

  app.post(
    "/getDataTable", (req,res) => {
      let payload = req.body.payload;
      console.log(payload);
    }
  )
};
