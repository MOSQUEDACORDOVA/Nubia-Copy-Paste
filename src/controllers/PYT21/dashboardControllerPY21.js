const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../../models/PYT21/data");
const passport = require("passport");

//const {getStreamUrls} = require('mixcloud-audio')

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
      return res.redirect("/login/PYT-21");
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }
      console.log(user.dataValues.id);
      return res.redirect('/py21/PYT-21')
    });
  })(req, res);
};

// Registro de usuarios
exports.reguserpy21 = (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  let msg = false;
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/register/PYT-21');
  } else {
    DataBase.RegUser(username, email, password).then((respuesta) =>{
      res.redirect('/py21/PYT-21'+respuesta)
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21" + msg);
    });
  }
};

exports.dashboard = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  
    let roleAdmin;
    let roleClient;
    let roleSeller;
    if (req.user.type_user === 'Inversionista') {
      roleClient = true;
    } else if(req.user.type_user === 'Vendedor') {
      roleClient = true;
      roleSeller = true;
    }
    else {
      roleAdmin = true;
    }

    res.render(proyecto+"/board", {
      pageName: "Tablero",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      dash: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

exports.login = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/auth/login", {
      pageName: "Login",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: true,
    })
};

exports.register = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/auth/register", {
      pageName: "Registro",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: true
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
      pageName: "Error 404",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: true
    })
};

exports.notauthorized = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/not-authorized", {
      pageName: "No Autorizado",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: true
    })
};

exports.config = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id 
  console.log(proyecto)

  let roleAdmin;
  let roleClient;
  let roleSeller;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  }
  else {
    roleAdmin = true;
  }

    res.render(proyecto+"/configuration", {
      pageName: "Configuración de la cuenta",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      config: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleClient,
      roleAdmin,
      roleSeller
    })
};

exports.profile = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin;
  let roleClient;
  let roleSeller;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  }
  else {
    roleAdmin = true;
  }

    res.render(proyecto+"/profile", {
      pageName: "Mi Perfil",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      prof: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleClient,
      roleAdmin,
      roleSeller
    })
};

exports.contracts = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin;
  let roleClient;
  let roleSeller;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  }
  else {
    roleAdmin = true;
  }
  
    res.render(proyecto+"/contracts", {
      pageName: "Contratos",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      contr: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

exports.earnings = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/earnings", {
      pageName: "Ingresos",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      username: req.user.username,
      typeUser: req.user.type_user
    })
};

exports.retreats = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin;
  let roleClient;
  let roleSeller;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  }
  else {
    roleAdmin = true;
  }

    res.render(proyecto+"/retreats", {
      pageName: "Retiros",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      retr: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

exports.users = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin;
  let roleClient;
  let roleSeller;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  } 
  else {
    roleAdmin = true;
  }
    res.render(proyecto+"/users", {
      pageName: "Usuarios",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      users: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

exports.seller = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  
  let roleAdmin;
  let roleClient;
  let roleSeller;
  if (req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  } else if(req.user.type_user === 'Administrador') {
    roleAdmin = true;
  } else {
    roleAdmin = true;
  }
    res.render(proyecto+"/seller", {
      pageName: "Vendedores",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      sellers: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

exports.paymethods = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin;
  let roleClient;
  let roleSeller;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  } 
  else {
    roleAdmin = true;
  }

    res.render(proyecto+"/paymethods", {
      pageName: "Formas de Pago",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      payform: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

exports.pay = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin;
  let roleClient;
  let roleSeller;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  }
  else {
    roleAdmin = true;
  }

    res.render(proyecto+"/pay-managment", {
      pageName: "Gestión de Pagos",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      managpay: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

exports.deposits = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin;
  let roleClient;
  let roleSeller;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  } 
  else {
    roleAdmin = true;
  }
    res.render(proyecto+"/deposits", {
      pageName: "Depositos",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      dep: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

exports.duration = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin;
  let roleClient;
  let roleSeller;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  }
  else {
    roleAdmin = true;
  }
    res.render(proyecto+"/duration", {
      pageName: "Duración y Riesgo",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      durat: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};