const db = require("../models");
const Admin = db.admin
exports.formAdmin = (req, res) => {
    res.render(
      'formAdmin',{
        layout: 'views/layouts/main-layout-admin'
      }
    )
  };