const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
//const {getStreamUrls} = require('mixcloud-audio')

exports.dashboard = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/home", {
      pageName: "Dashboard",
      dashboardPage: true,
      dashboard: true,
    })
};