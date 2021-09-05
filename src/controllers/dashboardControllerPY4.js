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
    res.render(proyecto+"/home", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true

    })
};

exports.login = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
    res.render(proyecto+"/login", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      login:true,
    })
};

exports.register = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
    res.render(proyecto+"/register", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      login:true,
    })
};

exports.sesionstart = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = "PYT-4"  
    res.render(proyecto+"/home", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
    })
};


exports.usuariosTable = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = "PYT-4"  
    res.render(proyecto+"/usersTable", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
    })
};