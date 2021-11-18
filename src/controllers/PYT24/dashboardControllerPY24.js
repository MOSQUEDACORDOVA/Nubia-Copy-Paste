const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../../models/PYT24/data");
const passport = require("passport");
const { rejects } = require("assert");
let moment = require('moment-timezone');
const { truncate } = require("../../models/PYT4/Usuarios");

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
      return res.redirect("/login24/PYT-24");
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
    res.redirect('/register24/PYT-24');
  } else {
    DataBase.RegUser(username, email, password).then((respuesta) =>{
      res.redirect("/login24/PYT-24")
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24");
    });
  }
};

// REGISTRO DE REFERIDOS
exports.reguserreferpy24 = (req, res) => {
  console.log(req.body);
  const { username, email, password, refcode } = req.body;
  let msg = false;
  if (username.trim() === '' || email.trim() === '' || password.trim() === '' || refcode.trim() === '') {
    console.log("complete todos los campos")
    res.redirect("/register24/PYT-24");
  } else {
    DataBase.RegReferUser(username, email, password, refcode).then((respuesta) =>{
      res.redirect("/login24/PYT-24")
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24");
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

  let roleAdmin = true;

  let idUser = res.locals.user.id
  // SALDO DISPONIBLE
  let avalibleBalance = res.locals.user.avalible_balance

  DataBase.GetAllDepositsAdmin().then((resp) => {
    let depositos = JSON.parse(resp);
    console.log(depositos)

    let date = moment().format('YYYY-MM-DD');
    depositos.forEach(element => {
      let culmination = moment(element.culmination);
      let date2 = moment('2021-11-06');

      if(culmination.diff(date, 'days') <= 0) {
        DataBase.CulminateDeposits(element.id).then((resp) => {
          console.log(resp)
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error24/PYT-24");
        });
      } 
    });

    res.render(proyecto+"/board", {
      pageName: "Dashboard",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      dash: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      depositos,
      avalibleBalance,
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// VERIFICAR PAQUETES ADMIN
exports.verifypackges = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  DataBase.GetAllDepositsAdmin().then((resp) => {
    let depositos = JSON.parse(resp);
    console.log(depositos)

    let date = moment().format('YYYY-MM-DD');
    depositos.forEach(element => {
      let culmination = moment(element.culmination);
      let date2 = moment('2021-11-06');

      if(culmination.diff(date, 'days') <= 0) {
        DataBase.CulminateDeposits(element.id).then((resp) => {
          console.log(resp)
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error24/PYT-24");
        });
      } 
    });
    return res.redirect("/py24/PYT-24");
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// VERIFICAR PAQUETES USUARIO
exports.verifypackgesuser = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id 
  let idUser = res.locals.user.id 
  console.log(proyecto)

  DataBase.GetAllDepositsUser(idUser).then((resp) => {
    let depositos = JSON.parse(resp);
    console.log(depositos)

    let date = moment().format('YYYY-MM-DD');
    depositos.forEach(element => {
      let culmination = moment(element.culmination);
      let date2 = moment('2021-11-06');

      if(culmination.diff(date, 'days') <= 0) {
        DataBase.CulminateDeposits(element.id).then((resp) => {
          console.log(resp)
        }).catch((err) => {
          console.log(err)
          let msg = "Error en sistema";
          return res.redirect("/error24/PYT-24");
        });
      } 
    });
    return res.redirect("/boardpresale/PYT-24");
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
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

exports.referregister = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let ref = req.params.ref
  console.log(ref)
  console.log(req.params)

  res.render("PYT-24/auth/registerrefer", {
    pageName: "Registro",
    dashboardPage: true,
    dashboard: true,
    py24: true,
    login: true,
    ref
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
  let presale = true;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  }
  else {
    roleAdmin = true;
  }

  let idUser = res.locals.user.id

  DataBase.GetMRetreatsTransf(idUser).then((res1) => {
    let transf = JSON.parse(res1);
    console.log(transf)

    DataBase.GetMRetreatsPaym(idUser).then((res2) => {
      let paym = JSON.parse(res2);
      console.log(paym)

      DataBase.GetMRetreatsBTC(idUser).then((res3) => {
        let btc = JSON.parse(res3);
        console.log(btc)

        DataBase.GetMRetreatsWallet(idUser).then((res4) => {
          let wallet = JSON.parse(res4);
          console.log(wallet)
        
          // BALANCE MINIMO DE RETIRO
        DataBase.GetControlTH().then((response_th)=>{
          let data_th = JSON.parse(response_th)[0];
          console.log(data_th)

        // HISTORIAL DE RETIROS (PAGOS) PENDIENTES
        DataBase.GetPendingPaymenthsUser(idUser).then((res5) => {
          let retreats = JSON.parse(res5);
          console.log(retreats)
          
        // HISTORIAL DE RETIROS (PAGOS) COMPLETADOS
        DataBase.GetPaymenthsUser(idUser).then((resp) => {
          let retreatsCompletes = JSON.parse(resp);
          console.log(retreatsCompletes)
    
    res.render(proyecto+"/retreats", {
      pageName: "Minner - Retiros",
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
      ret: true,
      transf,
      paym,
      btc,
      retreats,
      retreatsCompletes,
      wallet,
      data_th
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

// OBTENER TODOS LOS METODOS DE RETIROS DE USUARIO
exports.getretreatsuser = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id;
  const {id} = req.body;
  console.log(proyecto)

  DataBase.GetMRetreatsTransf(id).then((res1) => {
    let transf = JSON.parse(res1);
    console.log(transf)
    
    DataBase.GetMRetreatsPaym(id).then((res2) => {
      let paym = JSON.parse(res2);
      console.log(paym)
      
      DataBase.GetMRetreatsBTC(id).then((res3) => {
        let btc = JSON.parse(res3);
        console.log(btc)
        
        DataBase.GetMRetreatsWallet(id).then((res4) => {
          let wallet = JSON.parse(res4);
          console.log(wallet)

           res.send({transf, paym, btc, wallet})
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

// SOLICITAR PAGO USUARIO
exports.solicitpay = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id;
  const {id} = req.body;
  console.log(proyecto)

  let roleAdmin = true;
  DataBase.SolicitPay(id).then((resp)=>{
    return res.redirect('retreats24/PYT-24');
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// SOLICITAR PAGO USUARIO
exports.payuser = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  const {id, methodid, depid} = req.body;
  console.log(id + ' - ' + methodid + ' - ' + depid)
  console.log("ID - METHODID - DEPID")

  DataBase.PayUser(id, methodid).then((resp)=> {
    console.log(resp)
    console.log("RESPUESTA DE PAGOS")
    DataBase.CulminateDeposits(depid).then((resp2) => {
      console.log(resp2)
      console.log("DEPOSITO CULMINADO")
      return res.redirect('paym/PYT-24');
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

exports.users = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin = true;
  DataBase.GetAllVerifiedUsers().then((users)=>{
    let allusers = JSON.parse(users);
    console.log(allusers)

    DataBase.GetAllUnVerifiedUsers().then((usernoverify)=>{
      let allunverif = JSON.parse(usernoverify);
      console.log(allunverif)

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
      allusers,
      allunverif
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
// VERIFICAR CUENTA DE USUARIOS
exports.verifyuser = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id;
  const {id} = req.body;
  console.log(proyecto)

  let roleAdmin = true;
  DataBase.VerifyUser(id).then((users)=>{
    return res.redirect('users24/PYT-24');
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
};

// SOLICITAR VERIFICAR CUENTA
exports.solicitverify = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id;
  const id = req.user.id;
  console.log(id)
  const {voucher1, voucher2} = req.body;
  console.log(voucher1)
  console.log(voucher2)
  console.log(req.body)
  console.log(proyecto)

  let roleAdmin = true;
  DataBase.SolicitVerify(id, voucher1, voucher2).then((users)=>{
    return res.redirect('boardpresale/PYT-24');
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error24/PYT-24");
  });
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
  let ref;
  let presale = true;
  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
    ref = req.user.refer_code;
  }
  else {
    roleAdmin = true;
  }

    res.render(proyecto+"/seller", {
      pageName: "Referidos",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      login: false,
      sell: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      roleClient,
      roleSeller,
      ref,
      presale
    });
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

  DataBase.GetBanksAdmin().then((banks)=>{
    let allbanks = JSON.parse(banks);
    console.log(allbanks)
    // TRAER CUENTAS PARA PAGO MOVIL
    DataBase.GetPaymAdmin().then((paym)=>{
      let allpaym = JSON.parse(paym);
      console.log(allpaym)
      // TRAER CUENTAS PARA RETIRO EN BTC
      DataBase.GetBTCAdmin().then((btc)=>{
        let allbtc = JSON.parse(btc);
        console.log(allbtc)
        // TRAER CUENTAS PARA RETIRO EN BTC
        DataBase.GetDigWalletAdmin().then((wallet)=>{
          let allwallet = JSON.parse(wallet);
          console.log(allwallet)
        
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
      roleSeller,
      allbanks,
      allpaym,
      allbtc,
      allwallet
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

// ACTUALIZAR METODOS DE PAGO
exports.updatepaymethod = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  let {id, ttype, name, dni, bank, type_account, num_account, phone, code_wallet, email_wallet} = req.body;

  if(req.body.ttype === 'Transferencia Bancaria') {
    DataBase.UpdatePayMethodTransf(id, ttype, name, dni, bank, type_account, num_account, phone, code_wallet, email_wallet).then((respuesta) =>{
      res.redirect('/paymethods24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  } else if(req.body.ttype === 'Pago Movil') {
    DataBase.UpdatePayMethodPaym(id, ttype, name, dni, bank, phone).then((respuesta) =>{
      res.redirect('/paymethods24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  } else if(req.body.ttype === 'BTC') {
    DataBase.UpdatePayMethodBTC(id, ttype, code_wallet).then((respuesta) =>{
      res.redirect('/paymethods24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  } else if(req.body.ttype === 'Billetera Digital') {
    DataBase.UpdatePayMethodDWallet(id, ttype, email_wallet).then((respuesta) =>{
      res.redirect('/paymethods24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  }
}; 

// HABILITAR / DESHABILITAR METODOS DE PAGO
exports.updatestatuspaymethod = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  let {id, status} = req.body;

  if (id.trim() === '' || status.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/paymethods24/PYT-24');
  } else {
    if(status === 'Habilitado') {
      status = 'Deshabilitado';
    } else {
      status = 'Habilitado';
    }
    DataBase.UpdateStatusPayMethod(id, status).then((respuesta) =>{
      res.redirect('/paymethods24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  }; 
};

// ELIMINAR METODOS DE PAGO
exports.deletepaymethod = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  const {id} = req.body;

  if (id.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/paymethods24/PYT-24');
  } else {
    DataBase.DeletePayMethod(id).then((respuesta) =>{
      res.redirect('/paymethods24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  }; 
};

// GESTION DE PAGOS ADMIN
exports.paymanag = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin = true;

  DataBase.GetPaymenthsAdmin().then((resp2) => {
    let pays = JSON.parse(resp2);
    console.log(pays)

    DataBase.GetPendingPaymenthsAdmin().then((resp) => {
      let pendindPays = JSON.parse(resp);
      console.log(pendindPays)

    res.render(proyecto+"/pay-managment", {
      pageName: "Gestión de Pagos",
      dashboardPage: true,
      dashboard: true,
      py24: true,
      login: false,
      paym: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
      pendindPays,
      pays
    });

  }).catch((err) => {
    console.log(err)
    return res.redirect("/error24/PYT-24");
  });
  }).catch((err) => {
    console.log(err)
    return res.redirect("/error24/PYT-24");
  });
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
  // TRANSFERENCIAS
  DataBase.GetAllCompleteDepositsTransf().then((res1) => {
    let completeTransf = JSON.parse(res1);
    console.log(completeTransf)

  DataBase.GetAllPendingDepositsTransf().then((pres1) => {
    let pendingTransf = JSON.parse(pres1);
    console.log(pendingTransf)

    // PAGO MOVIL
    DataBase.GetAllCompleteDepositsPaym().then((res2) => {
      let completePaym = JSON.parse(res2);
      console.log(completePaym)

    DataBase.GetAllPendingDepositsPaym().then((pres2) => {
      let pendingPaym = JSON.parse(pres2);
      console.log(pendingPaym)

      //BTC
      DataBase.GetAllCompleteDepositsBTC().then((res3) => {
        let completeBTC = JSON.parse(res3);
        console.log(completeBTC)

      DataBase.GetAllPendingDepositsBTC().then((pres4) => {
        let pendingBTC = JSON.parse(pres4);
        console.log(pendingBTC)

        // BILLETERA DIGITAL
        DataBase.GetAllCompleteDepositsWallet().then((res5) => {
          let completeWallet = JSON.parse(res5);
          console.log(completeWallet)
  
        DataBase.GetAllPendingDepositsWallet().then((pres5) => {
          let pendingWallet = JSON.parse(pres5);
          console.log(pendingWallet)

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
      completeTransf, completePaym, completeBTC, completeWallet,
      pendingTransf, pendingPaym, pendingBTC, pendingWallet
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error obteniendo depositos realizados";
    return res.redirect("/error24/PYT-24");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error obteniendo depositos realizados";
    return res.redirect("/error24/PYT-24");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error obteniendo depositos realizados";
    return res.redirect("/error24/PYT-24");
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
  console.log("PARAMS")

  let id = req.body.id; 
  let duration = req.body.durationd;
  let activated = moment().format('YYYY-MM-DD');
  let culminated =  moment().add(duration, 'M').format('YYYY-MM-DD');
  
  console.log(activated)
  console.log(culminated)
  
  DataBase.UpdateDeposits(id, activated, culminated).then((response) => {
    console.log(response)

    let price = req.body.price,
    paqid = req.body.paqueteId;

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

// ELIMINAR MAQUINA DE MINADO
exports.deletemachine = (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  let msg = false;
  if (id.trim() === '') {
    console.log('Complete todos los campos')
    res.redirect('/th/PYT-24');
  } else {
    DataBase.DeleteMachineTH(id).then((respuesta) =>{
      console.log("Datos eliminados satisfactoriamente");
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
  const { price, maintance, error, minwithd } = req.body;
  let msg = false;
  if (price.trim() === '' || maintance.trim() === '' || error.trim() === '' || minwithd.trim() === '') {
    console.log('Complete todos los campos')
    res.redirect('/th/PYT-24');
  } else {
    DataBase.ControlTH(price, maintance, error, minwithd).then((respuesta) =>{
      console.log("Datos agregados satisfactoriamente");
      res.redirect('/th/PYT-24');
    }).catch((err) => {
      console.log(err)
      return res.redirect("/error404/PYT-24");
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

  let roleAdmin = true;
  let roleClient;
  let roleSeller;
    
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

// OBTENER MAQUINAS DE MINADO
exports.getmachines = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
    
  // TH DISPONIBLES
  DataBase.GetMachineTH().then((resp)=>{
    let machine = JSON.parse(resp);
    console.log(machine)
    let thavalible = 0;
    machine.forEach(element => {
      thavalible += element.avalible;
    });

    res.send({thavalible});
  }).catch((err) => {
    console.log(err)
    let msg = "Error obteniendo maquinas de minado en el sistema";
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

// CREAR METODO DE RETIRO TRANSFERENCIA BANCARIA
exports.addretreatsbank = (req, res) => {
  const { fullname, dni, bank_name, type_account, num_account } = req.body;
  let msg = false;
  let userid = res.locals.user.id;
  if (fullname.trim() === '' || dni.trim() === '' || bank_name.trim() === '' || type_account.trim() === '' || num_account.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/retreats24/PYT-24');
  } else {
    DataBase.AddRetreatsBank(fullname, dni, bank_name, type_account, num_account, userid).then((respuesta) =>{
      res.redirect('/retreats24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24");
    });
  };
}

// CREAR METODO DE RETIRO (PAGO MOVIL)
exports.addretreatspaym = (req, res) => {
  const { fullname, dni, bank_name, phone } = req.body;
  let msg = false;
  let userid = res.locals.user.id;
  if (fullname.trim() === '' || dni.trim() === '' || bank_name.trim() === '' || phone.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/retreats24/PYT-24');
  } else {
    DataBase.AddRetreatsPaym(fullname, dni, bank_name, phone, userid).then((respuesta) =>{
      res.redirect('/retreats24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24");
    });
  };
}

// CREAR METODO DE RETIRO RETIRO EN BTC
exports.addretreatsbtc = (req, res) => {
  const { code_wallet } = req.body;
  let msg = false;
  let userid = res.locals.user.id;
  if (code_wallet.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/retreats24/PYT-24');
  } else {
    DataBase.AddRetreatsBTC(code_wallet, userid).then((respuesta) =>{
      res.redirect('/retreats24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24");
    });
  };
}

// CREAR METODO DE RETIRO BILLETERA DIGITAL
exports.addretreatswallet = (req, res) => {
  const { email } = req.body;
  let msg = false;
  let userid = res.locals.user.id;
  if (email.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/retreats24/PYT-24');
  } else {
    DataBase.AddRetreatsDigitalWallet(email, userid).then((respuesta) =>{
      res.redirect('/retreats24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-24");
    });
  };
}

// ELIMINAR METODOS DE RETIRO
exports.deletemretreats = (req, res) => {
  const { id } = req.body;
  console.log(req.body)
  console.log("ID")
  let msg = false;
  if (id.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/retreats24/PYT-24');
  } else {
    DataBase.DeleteMRetreats(id).then((respuesta) =>{
      res.redirect('/retreats24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  };
}

// ACTUALIZAR METODOS DE RETIRO
exports.updatemretreats = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  let {id, ttype, name, dni, bank, type_account, num_account, phone, code_wallet, email_wallet} = req.body;

  if(req.body.ttype === 'Transferencia Bancaria') {
    DataBase.UpdateRetreatsTransf(id, name, dni, bank, type_account, num_account, phone, code_wallet, email_wallet).then((respuesta) =>{
      res.redirect('/retreats24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  } else if(req.body.ttype === 'Pago Movil') {
    DataBase.UpdateRetreatsPaym(id, name, dni, bank, phone).then((respuesta) =>{
      res.redirect('/retreats24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  } else if(req.body.ttype === 'BTC') {
    DataBase.UpdateRetreatsBTC(id, code_wallet).then((respuesta) =>{
      res.redirect('/retreats24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  } else if(req.body.ttype === 'Billetera Digital') {
    DataBase.UpdateRetreatsDWallet(id, email_wallet).then((respuesta) =>{
      res.redirect('/retreats24/PYT-24')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  }
}; 

//
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
  
  let roleClient = true;
  let presale = true;


  let verify, unverify, pendingverify;

  if (req.user.account_verified === 'No verificado') {
    if(req.user.front_img_dni === null || req.user.back_img_dni === null) {
      unverify = true;
    } else {
      pendingverify = true;
    }
  } else {
    verify = true;
  }

  DataBase.GetPackages().then((response)=>{
    let data = JSON.parse(response);
    DataBase.GetControlTH().then((response_th)=>{
      let data_th = JSON.parse(response_th)[0];
      console.log(data_th)
      console.log("THA54GA4G54AS45G4A5S54G4AS45G54AS54G")

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

              // TH DISPONIBLES
              DataBase.GetMachineTH().then((resp)=>{
                let machine = JSON.parse(resp);
                console.log(machine)

    res.render(proyecto+"/presale", { 
      pageName: "Minner - Comprar TH",
      dashboardPage: true,
      dashboard: true,
      py24:true,
      login:false,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleClient,
      presale,
      data, 
      data_th,
      machine,
      allpays, allbanks, allpaym, allbtc, allwallet,
      verify, unverify, pendingverify,
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
    DataBase.GetAllDepositsAdmin().then((resp) => {
      let depositos = JSON.parse(resp);
      console.log(depositos)
  
      let date = moment().format('YYYY-MM-DD');
      depositos.forEach(element => {
        let culmination = moment(element.culmination);
        let date2 = moment('2021-11-06');
  
        if(culmination.diff(date, 'days') <= 0) {
          DataBase.CulminateDeposits(element.id).then((resp) => {
            console.log(resp)
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error24/PYT-24");
          });
        } 
      });
      return res.redirect("../py24/PYT-24");
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
  } else {
    let idUser = res.locals.user.id
    DataBase.GetAllDepositsUser(idUser).then((resp) => {
      let depositos = JSON.parse(resp);
      console.log(depositos)
      let date = moment().format('YYYY-MM-DD');
      depositos.forEach(element => {
        let culmination = moment(element.culmination);
        let date2 = moment('2021-11-06');
  
        if(culmination.diff(date, 'days') <= 0) {
          DataBase.CulminateDeposits(element.id).then((resp) => {
            console.log(resp)
          }).catch((err) => {
            console.log(err)
            let msg = "Error en sistema";
            return res.redirect("/error24/PYT-24");
          });
        } 
      });
      return res.redirect("../py24/PYT-24");
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    });
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

  if (req.user.type_user === 'Inversionista') {
    roleClient = true;
  } else if(req.user.type_user === 'Vendedor') {
    roleClient = true;
    roleSeller = true;
  }
  else {
    roleAdmin = true;
  }

  console.log(req.user)

  let verify, unverify, pendingverify;

  if (req.user.account_verified === 'No verificado') {
    if(req.user.front_img_dni === null || req.user.back_img_dni === null) {
      unverify = true;
    } else {
      pendingverify = true;
    }
  } else {
    verify = true;
  }

  let idUser = res.locals.user.id
  // SALDO DISPONIBLE
  let avalibleBalance = res.locals.user.avalible_balance

  DataBase.GetAllDepositsBoardUser(idUser).then((response) => {
    let capital = JSON.parse(response);
    console.log(capital)

    DataBase.GetAllDepositsUser(idUser).then((resp) => {
      let depositos = JSON.parse(resp);
      console.log(depositos)

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
      verify, unverify, pendingverify,
      capital,
      depositos,
      avalibleBalance,
      board: true,
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

exports.depositpresale = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
 
  let roleAdmin;
  let roleClient = true;
  let presale = true;

  let idUser = res.locals.user.id

  DataBase.GetDepositsTransf(idUser).then((response) => {
    let transf = JSON.parse(response);
    console.log(transf)

    DataBase.GetDepositsPaym(idUser).then((response) => {
      let paym = JSON.parse(response);
      console.log(paym)

      DataBase.GetDepositsBTC(idUser).then((response) => {
        let btc = JSON.parse(response);
        console.log(btc)

        DataBase.GetDepositsWallet(idUser).then((response) => {
          let wallet = JSON.parse(response);
          console.log(wallet)
    
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
      presale,
      dep: true,
      transf,
      paym,
      btc,
      wallet
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

// OBTENER TODOS LOS DEPOSITOS DE USUARIOS ADMIN
exports.getdeposits = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  const { id } = req.body;
  console.log(id)

  DataBase.GetDepositsTransf(id).then((res1) => {
    let transf = JSON.parse(res1);
    console.log(transf)
    
    DataBase.GetDepositsPaym(id).then((res2) => {
      let paym = JSON.parse(res2);
      console.log(paym)
      
      DataBase.GetDepositsBTC(id).then((res3) => {
        let btc = JSON.parse(res3);
        console.log(btc)
        
        DataBase.GetDepositsWallet(id).then((res4) => {
          let wallet = JSON.parse(res4);
          console.log(wallet)
          res.send({transf, paym, btc, wallet})

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

exports.createdeposits = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id;
  let idUser = res.locals.user.id;
  console.log(proyecto)
  console.log(req.body)

  let {id, methodid, ttype, name, dni, email, amount, bank_name, num_account, type_account, phone, code_wallet, digital_wallet_email, voucher, ref, th} = req.body;

  name = res.locals.user.username;
  dni = res.locals.user.dni;
  email = res.locals.user.email;

  let depositid;
  
  DataBase.CreateDeposits(ttype, name, dni, email, amount, bank_name, num_account, type_account, phone, code_wallet, digital_wallet_email, voucher, ref, id, methodid, idUser).then((response) => {
    console.log(response)
    depositid = JSON.parse(response)
    console.log("DEPOSITO-------ID")
  }).then((data) => {
    let data_set = JSON.stringify(data);
    
    DataBase.CreatePaymenthsUser(idUser, amount, id, depositid.id).then((response2) => {
      console.log(response2)
      console.log("RESPUESTA CONTROLADOR")

      // RESTAR TH DISPONIBLES A LAS MAQUINAS
      DataBase.GetMachineTH().then((resp)=> { 
        let machine = JSON.parse(resp);
        console.log(th)
        console.log("CANTIDAD DE TH A RESTAR")
        let count = th;
        let idM, aval, sold;
        console.log(count)
        console.log(machine)
        console.log("DATA CONTROLLER")
        if(machine.length >= 2) {
          machine.forEach(element => {
            console.log(element.avalible)
            console.log("MAQUINAS DISPONIBLES")
            idM = element.id;
            sold = element.sold;
            aval = element.aval;
            
            while (count != 0) {   
              if(count != 0 && aval <= count) {
                DataBase.UpdateMachineTH(idM, sold, aval).then((resp3)=> { 
                  count = (count - sold);
                }).catch((err) => {
                  console.log(err)
                  let msg = "Error actualizando maquinas del sistema";
                  return res.redirect("/error24/PYT-24");
                });
              } else {
                DataBase.UpdateMachineTH(idM, sold, aval).then((resp3)=> { 
                  count = (count - sold);
                  res.redirect('/depositpresale/PYT-24');
                }).catch((err) => {
                  console.log(err)
                  let msg = "Error actualizando maquinas del sistema";
                  return res.redirect("/error24/PYT-24");
                });
              }
            }
          });
        } else {
          sold = parseInt(th);
          aval = parseInt(machine[0].avalible) - parseInt(th);
          console.log("TH DISPONIBLE DE MAQUINA" + aval)
          console.log("TH VENDIDOS DE MAQUINA" + sold)
          idM = machine[0].id;
          DataBase.UpdateMachineTH(idM, sold, aval).then((resp2)=> { 
            res.redirect('/depositpresale/PYT-24');
          }).catch((err) => {
            console.log(err)
            let msg = "Error obteniendo maquinas de minado en el sistema";
            return res.redirect("/error24/PYT-24");
          });
        }

      }).catch((err) => {
        console.log(err)
        let msg = "Error obteniendo maquinas de minado en el sistema";
        return res.redirect("/error24/PYT-24");
      })
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error24/PYT-24");
    })
    resolve('Depostio creado con exito');
  }).catch((err) => {
    reject(err)
    return res.redirect("/error24/PYT-24");
  });
};