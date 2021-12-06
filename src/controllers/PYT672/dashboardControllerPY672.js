const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../../models/PYT672/data");
const passport = require("passport");
const { rejects } = require("assert");
let moment = require('moment-timezone');

exports.grupos = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let fechaActual = moment().format('YYYY-MM-DD');

  DataBase.ObtenerGruposEnApertura().then((response) => {
    let gruposApertura = JSON.parse(response);
    console.log(gruposApertura)
    
    res.render(proyecto+"/admin/grupos", {
      pageName: "Academia Americana - Grupos",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      grupos: true,
      gruposApertura
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error672/PYT-672");
  });
};

exports.matriculas = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/admin/matricula", {
      pageName: "Academia Americana - Matriculas",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      matricula: true
    })
};

exports.error = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/404", {
      pageName: "Error",
      dashboardPage: true,
      dashboard: true,
      py672: true,
      login: true
    })
};

// * CREAR GRUPOS ADMIN
exports.creargrupos = (req, res) => {
  console.log(req.body);
  const { nombre, lecciones, horario, fecha } = req.body;
  let msg = false;
  if (nombre.trim() === '' || lecciones.trim() === '' || horario.trim() === '' || fecha.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/grupos/PYT-672');
  } else {
    DataBase.CrearGrupo(nombre, lecciones, horario, fecha).then((respuesta) =>{
      res.redirect("/grupos/PYT-672")
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error672/PYT-672");
    });
  }
};

exports.sesionstart = (req, res) => {
  console.log(req.body);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      console.log("no existe usuario")
      return res.redirect("/login27/PYT-27");
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }
      console.log(user.dataValues.id);
      return res.redirect('/controlrolespy27/PYT-27')
    });
  })(req, res);
};

// Registro de usuarios
exports.reguserpy27 = (req, res) => {
  console.log(req.body);
  const { fname, lname, bdate, gender, dtype, numdoc, nationality, country, city, phone, address, username, email, password } = req.body;
  let msg = false;
  if (fname.trim() === '' || lname.trim() === '' || bdate.trim() === '' || gender.trim() === '' || dtype.trim() === '' || numdoc.trim() === '' || nationality.trim() === '' || country.trim() === '' || city.trim() === '' || phone.trim() === '' || address.trim() === '' || username.trim() === '' || email.trim() === '' || password.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/register27/PYT-27');
  } else {
    DataBase.RegUser(fname, lname, bdate, gender, dtype, numdoc, nationality, country, city, phone, address, username, email, password).then((respuesta) =>{
      res.redirect("/login27/PYT-27")
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-27");
    });
  }
};