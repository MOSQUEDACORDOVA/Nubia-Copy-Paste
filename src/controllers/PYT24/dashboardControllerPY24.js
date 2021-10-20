const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../../models/PYT24/data");
const passport = require("passport");
const { rejects } = require("assert");

exports.web = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    res.render(proyecto+"/landing/web", {
      pageName: "Minner",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      login: true
    })
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
      return res.redirect("/login/PYT-24");
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }
      console.log(user.dataValues.id);
      return res.redirect('/controlroles/PYT-24')
    });
  })(req, res);
};

// Registro de usuarios
exports.reguserpy24 = (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  let msg = false;
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/register/PYT-24');
  } else {
    DataBase.RegUser(username, email, password).then((respuesta) =>{
      res.redirect('/py24/PYT-24'+respuesta)
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24" + msg);
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
      pageName: "Dashboard",
      dashboardPage: true,
      dashboard: true,
      py24:true,
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
      py24: true,
      login: true
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
      py24: true,
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
      py24:true,
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
      py24:true,
      login: true
    })
};

exports.config = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  

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

  console.log(proyecto)
    res.render(proyecto+"/configuration", {
      pageName: "Configuración de la cuenta",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleClient,
      roleAdmin,
      roleSeller
    })
};

// exports.profile = (req, res) => {
//   let msg = false;
//   if (req.query.msg) {
//     msg = req.query.msg;
//   }
//   let proyecto = req.params.id  
//   console.log(proyecto)
  
//   let roleAdmin;
//   let roleClient;
//   let roleSeller;
//   if (req.user.type_user === 'Inversionista') {
//     roleClient = true;
//   } else if(req.user.type_user === 'Vendedor') {
//     roleClient = true;
//     roleSeller = true;
//   }
//   else {
//     roleAdmin = true;
//   }

//     res.render(proyecto+"/profile", {
//       pageName: "Mi Perfil",
//       dashboardPage: true,
//       dashboard: true,
//       py24:true,
//       login: false,
//       prof: true,
//       username: req.user.username,
//       typeUser: req.user.type_user,
//       roleClient,
//       roleAdmin,
//       roleSeller
//     })
// };

exports.contracts = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  

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

  console.log(proyecto)
    res.render(proyecto+"/contracts", {
      pageName: "Contratos",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      login: false,
      contr: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

// exports.earnings = (req, res) => {
//   let msg = false;
//   if (req.query.msg) {
//     msg = req.query.msg;
//   }
//   let proyecto = req.params.id  
//   console.log(proyecto)

//   let roleAdmin;
//   let roleClient;
//   let roleSeller;
//   if (req.user.type_user === 'Inversionista') {
//     roleClient = true;
//   } else if(req.user.type_user === 'Vendedor') {
//     roleClient = true;
//     roleSeller = true;
//   }
//   else {
//     roleAdmin = true;
//   }
  
//     res.render(proyecto+"/earnings", {
//       pageName: "Ingresos",
//       dashboardPage: true,
//       dashboard: true,
//       py24:true,
//       login: false,
//       earn: true,
//       username: req.user.username,
//       typeUser: req.user.type_user,
//       roleAdmin,
//       roleClient,
//       roleSeller
//     })
// };

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
      py24:true,
      login: false,
      ret: true,
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
      py24:true,
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
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  }
  else {
    roleAdmin = true;
  }

    res.render(proyecto+"/seller", {
      pageName: "Vendedores",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      login: false,
      sell: true,
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
      py24:true,
      login: false,
      pay: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

exports.paymanag = (req, res) => {
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
      py24:true,
      login: false,
      paym: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller
    })
};

// VER TODOS LOS DEPOSITOS
exports.depositsadmin = (req, res) => {
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


  DataBase.GetAllPendingDeposits().then((response) => {
    let AllRes = JSON.parse(response);
    console.log(AllRes)

    DataBase.GetAllCompleteDeposits().then((respuesta) => {
      let AllCompletes = JSON.parse(respuesta);
      console.log(AllCompletes)

    res.render(proyecto+"/deposits", {
      pageName: "Depositos",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      login: false,
      dep: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller,
      AllRes,
      AllCompletes
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error obteniendo depositos realizados";
    return res.redirect("/error24/PYT-24");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// APROBAR DEPOSITO
exports.startdeposit = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin;
  let roleClient = true;
  let roleSeller;
  console.log(req.body)

  let id = req.body.id;
  let nDate = new Date();
  let date = nDate.getDay() + nDate.getMonth() + nDate.getYear();
  DataBase.UpdateDeposits(id, date).then((response) => {
    console.log(response)
    console.log("RESPUESTA CONTROLADOR")
    res.redirect('deposits24/PYT-24');
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  })
};

// exports.duration = (req, res) => {
//   let msg = false;
//   if (req.query.msg) {
//     msg = req.query.msg;
//   }
//   let proyecto = req.params.id  
//   console.log(proyecto)

//   let roleAdmin;
//   let roleClient;
//   let roleSeller;
//   if (req.user.type_user === 'Inversionista') {
//     roleClient = true;
//   } else if(req.user.type_user === 'Vendedor') {
//     roleClient = true;
//     roleSeller = true;
//   }
//   else {
//     roleAdmin = true;
//   }

//     res.render(proyecto+"/duration", {
//       pageName: "Duración y Riesgo",
//       dashboardPage: true,
//       dashboard: true,
//       py24:true,
//       login: false,
//       dur: true,
//       username: req.user.username,
//       typeUser: req.user.type_user,
//       roleAdmin,
//       roleClient,
//       roleSeller
//     })
// };

// AÑADIR MAQUINA DE MINADO
exports.addth = (req, res) => {
  console.log(req.body);
  const { amount } = req.body;
  let msg = false;
  if (amount.trim() === '') {
    console.log('Complete todos los campos')
    res.redirect('/th/PYT-24');
  } else {
    DataBase.AddMachineTH(amount).then((respuesta) =>{
      console.log("Datos agregados satisfactoriamente");
      res.redirect('/th/PYT-24');
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  }
};

// CONTROL DE TH PRECIO, % DE MANTENIMIENTO, % DE ERROR, GANANCIAS POR REFERIDOS, SALDO MINIMO DE RETIRO
exports.controlth = (req, res) => {
  console.log(req.body);
  const { price, maintance, error, earnings, minwithd } = req.body;
  let msg = false;
  if (price.trim() === '' || maintance.trim() === '' || error.trim() === '' || earnings.trim() === '' || minwithd.trim() === '') {
    console.log('Complete todos los campos')
    res.redirect('/th/PYT-24');
  } else {
    DataBase.ControlTH(price, maintance, error, earnings, minwithd).then((respuesta) =>{
      console.log("Datos agregados satisfactoriamente");
      res.redirect('/th/PYT-24');
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24" + msg);
    });
  }
};

// OBTENER DATOS GENERALES DEL SISTEMA, PRECIO TH, COBRO MANTENIMIENTO ETC
exports.th = (req, res) => {
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

  // CONTROL TH PRECIOS, COSTOS ETC
  DataBase.GetControlTH().then((response)=>{
    let data = JSON.parse(response)[0];
    // OBTENER MAQUINAS DE MINADO
    DataBase.GetMachineTH().then((resp)=> {
      machine = JSON.parse(resp);
      
      res.render(proyecto+"/th", {
        pageName: "Administrar TH",
        dashboardPage: true,
        dashboard: true,
        py24:true,
        login:false,
        th: true,
        username: req.user.username,
        typeUser: req.user.type_user,
        roleAdmin,
        roleClient,
        roleSeller,
        data,
        machine
      });
  }).catch((err) => {
    console.log(err)
    let msg = "Error obteniendo maquinas de minado en el sistema";
    return res.redirect("/error24/PYT-24");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error obteniendo datos de control precios etc, en el sistema";
    return res.redirect("/error24/PYT-24");
  })
};

// ACTUALIZAR PRECIO TH
exports.updateth = (req, res) => {
  const {id, price} = req.body

  DataBase.UpdatePriceTH(id, price).then((respuesta) =>{
    let msg = respuesta
    res.redirect('/th/PYT-24')
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// ACTUALIZAR PORCENTAJE DE MANTENIMIENTO
exports.updatemaintance = (req, res) => {
  const {id, maintance} = req.body

  DataBase.UpdateMaintance(id, maintance).then((respuesta) =>{
    let msg = respuesta
    res.redirect('/th/PYT-24')
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// ACTUALIZAR PORCENTAJE DE ERROR
exports.updateerror = (req, res) => {
  const {id, error} = req.body

  DataBase.UpdateError(id, error).then((respuesta) =>{
    let msg = respuesta
    res.redirect('/th/PYT-24')
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// ACTUALIZAR GANANCIAS POR REFERIDOS
exports.updateearnings = (req, res) => {
  const {id, earnings} = req.body

  DataBase.UpdateRefEarnings(id, earnings).then((respuesta) =>{
    let msg = respuesta
    res.redirect('/th/PYT-24')
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// ACTUALIZAR SALDO MINIMO DE RETIRO
exports.updateminwithd = (req, res) => {
  const {id, minwithd} = req.body

  DataBase.UpdateMinWithdrawal(id, minwithd).then((respuesta) =>{
    let msg = respuesta
    res.redirect('/th/PYT-24')
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// CREAR PAQUETES
exports.createpackages = (req, res) => {
  const { name, price, duration, amount, maintance } = req.body;
  let msg = false;
  if (name.trim() === '' || price.trim() === '' || duration.trim() === '' || amount.trim() === '' || maintance.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/plans/PYT-24');
  } else {
    DataBase.CreatePackages(name, price, duration, amount, maintance).then((respuesta) =>{
      res.redirect('/plans/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24" + msg);
    });
  };
}

// CREAR PAQUETES
exports.createpackagespers = (req, res) => {
  const { price, duration, amount, maintance } = req.body;
  let msg = false;
  if (price.trim() === '' || duration.trim() === '' || amount.trim() === '' || maintance.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/plans/PYT-24');
  } else {
    DataBase.CreatePackagesPers(price, duration, amount, maintance).then((respuesta) =>{
      let response = JSON.parse(respuesta);
      console.log(response)
      console.log("PERSONALIZADO")
      res.send({response})
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  };
}

// ACTUALIZAR PAQUETES
exports.updatepackages = (req, res) => {
  const { id, name, price, duration, amount, maintance } = req.body;
  let msg = false;
  if (id.trim() === '' || name.trim() === '' || price.trim() === '' || duration.trim() === '' || amount.trim() === '' || maintance.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/plans/PYT-24');
  } else {
    DataBase.UpdatePackages(id, name, price, duration, amount, maintance).then((respuesta) =>{
      res.redirect('/plans/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  };
}

// ELIMINAR PAQUETES
exports.deletepackages = (req, res) => {
  const { id } = req.body;
  console.log(req.body)
  console.log("ID")
  let msg = false;
  if (id.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/plans/PYT-24');
  } else {
    DataBase.DeletePackages(id).then((respuesta) =>{
      res.redirect('/plans/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  };
}

// CREAR METODO DE PAGO TRANSFERENCIA BANCARIA
exports.addbank = (req, res) => {
  const { fullname, dni, bank_name, type_account, num_account } = req.body;
  let msg = false;
  if (fullname.trim() === '' || dni.trim() === '' || bank_name.trim() === '' || type_account.trim() === '' || num_account.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/paymethods24/PYT-24');
  } else {
    DataBase.AddBank(fullname, dni, bank_name, type_account, num_account).then((respuesta) =>{
      res.redirect('/paymethods24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24");
    });
  };
}

// CREAR METODO DE PAGO (PAGO MOVIL)
exports.addpaym = (req, res) => {
  const { fullname, dni, bank_name, phone } = req.body;
  let msg = false;
  if (fullname.trim() === '' || dni.trim() === '' || bank_name.trim() === '' || phone.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/paymethods24/PYT-24');
  } else {
    DataBase.AddPaym(fullname, dni, bank_name, phone).then((respuesta) =>{
      res.redirect('/paymethods24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24");
    });
  };
}

// CREAR METODO DE PAGO RETIRO EN BTC
exports.addbtc = (req, res) => {
  const { code_wallet } = req.body;
  let msg = false;
  if (code_wallet.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/paymethods24/PYT-24');
  } else {
    DataBase.AddBTC(code_wallet).then((respuesta) =>{
      res.redirect('/paymethods24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24");
    });
  };
}

// CREAR METODO DE PAGO BILLETERA DIGITAL
exports.addwallet = (req, res) => {
  const { email } = req.body;
  let msg = false;
  if (email.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/paymethods24/PYT-24');
  } else {
    DataBase.AddDigitalWallet(email).then((respuesta) =>{
      res.redirect('/paymethods24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24");
    });
  };
}

exports.plans = (req, res) => {
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
  DataBase.GetPackages().then((respuesta) =>{
    let data = JSON.parse(respuesta);

    DataBase.GetControlTH().then((response)=>{
      let datath = JSON.parse(response)[0];
      let percentage;
      if(datath) {
        percentage = datath.percentage_maintance;
      }
      
    res.render(proyecto+"/plans", {
      pageName: "Paquetes",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      login:false,
      plans: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller,
      data,
      percentage
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error obteniendo datos de control en el sistema";
    return res.redirect("/error24/PYT-24");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// OBTENER PAQUETES
exports.presale = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  
  let roleAdmin;
  let roleClient = true;
  let roleSeller;
  let presale = true;

  DataBase.GetPackages().then((response)=>{
    let data = JSON.parse(response);
    DataBase.GetControlTH().then((response_th)=>{
      let data_th = JSON.parse(response_th)[0];
      //console.log(data_th)

    // TRAER TODOS LOS METODOS DE PAGO
    DataBase.GetAllPaym().then((all)=>{
      let allpays = JSON.parse(all);
      console.log(allpays)
      // TRAER CUENTAS PARA TRANSFERENCIAS BANCARIAS
      DataBase.GetBanks().then((banks)=>{
        let allbanks = JSON.parse(banks);
        console.log(allbanks)
        // TRAER CUENTAS PARA PAGO MOVIL
        DataBase.GetPaym().then((paym)=>{
          let allpaym = JSON.parse(paym);
          console.log(allpaym)
          // TRAER CUENTAS PARA RETIRO EN BTC
          DataBase.GetBTC().then((btc)=>{
            let allbtc = JSON.parse(btc);
            console.log(allbtc)
            // TRAER CUENTAS PARA RETIRO EN BTC
            DataBase.GetDigWallet().then((wallet)=>{
              let allwallet = JSON.parse(wallet);
              console.log(allwallet)
            
    res.render(proyecto+"/presale", { 
      pageName: "Minner - Comprar TH",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      login:false,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller,
      presale,
      data, 
      data_th,
      allpays, allbanks, allpaym, allbtc, allwallet,
      buy: true
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });  
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });  
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
  });  
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });  
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
  });  
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

exports.controlroles = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  console.log("ROLE")
  console.log(req.user.type_user)
  if (req.user.type_user === 'Administrador') {
    return res.redirect('../py24/PYT-24')
  } else {
    return res.redirect('../boardpresale/PYT-24')
  }
  
};

exports.boardpresale = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
 
  let roleAdmin;
  let roleClient = true;
  let roleSeller;
  let presale = true;

    res.render(proyecto+"/boardpresale", {
      pageName: "Minner - Tablero",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      login:false,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller,
      presale,
      board: true,
    })
};

exports.depositpresale = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
 
  let roleAdmin;
  let roleClient = true;
  let roleSeller;
  let presale = true;

  let idUser = res.locals.user.id

  DataBase.GetDeposits(idUser).then((response) => {
    let AllRes = JSON.parse(response);
    console.log(AllRes)
  
    res.render(proyecto+"/depositpresale", {
      pageName: "Minner - Depositos",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      login:false,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller,
      presale,
      dep: true,
      AllRes
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

exports.createdeposits = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  let idUser = res.locals.user.id
  console.log(proyecto)
  console.log(req.body)

  let {id, methodid, ttype, name, dni, email, amount, bank_name, num_account, type_account, phone, code_wallet, digital_wallet_email, voucher, ref} = req.body;

  name = res.locals.user.username;
  dni = res.locals.user.dni;
  email = res.locals.user.email;

  DataBase.CreateDeposits(ttype, name, dni, email, amount, bank_name, num_account, type_account, phone, code_wallet, digital_wallet_email, voucher, ref, id, methodid, idUser).then((response) => {
    console.log(response)
    res.redirect('/depositpresale/PYT-24');
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};