const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../../models/PYT21/data");
const passport = require("passport");
let moment = require('moment-timezone');

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
      return res.redirect('/controlrolespy21/PYT-21')
    });
  })(req, res);
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
            return res.redirect("/error404/PYT-21");
          });
        } 
      });
      return res.redirect("../adminpy21/PYT-21");
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
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
            return res.redirect("/error404/PYT-21");
          });
        } 
      });
      return res.redirect("../py21/PYT-21");
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
    return res.redirect('../py21/PYT-21')
  }
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
      return res.redirect("/error404/PYT-21");
    });
  }
};
// * TABLERO USUARIO
exports.dashboard = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  
    let roleClient = true;
    let roleSeller;
    if (req.user.type_user === 'Vendedor') {
      roleSeller = true;
    }

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
        
    res.render(proyecto+"/user/board", {
      pageName: "Tablero",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      dash: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleClient,
      roleSeller,
      verify, unverify, pendingverify,
      capital,
      depositos,
      avalibleBalance,
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error404/PYT-21");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error404/PYT-21");
  });
};
// * TABLERO ADMINISTRADOR
exports.dashboardAdmin = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin = true;
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
          return res.redirect("/error404/PYT-21");
        });
      } 
    });

    res.render(proyecto+"/admin/board", {
      pageName: "Tablero",
      dashboardPage: true,
      dashboard: true,
      py21:true,
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
    return res.redirect("/error404/PYT-21");
  });
};

// * SOLICITAR VERIFICAR CUENTA
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
    return res.redirect('py21/PYT-21');
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error404/PYT-21");
  });
};

// * VERIFICAR CUENTA DE USUARIOS
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
    return res.redirect('users/PYT-21');
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error404/PYT-21");
  });
};

// * CONVERTIR USUARIO EN VENDEDOR
exports.usertoseller = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  const {id} = req.body;

  if (id.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/users/PYT-21');
  } else {
    let code = "";
    let refcode = '/ref=';
    let caracteres = "0123456789abcdefABCDEF?¿¡!:;";
    let longitud = 20;

    function rand_code(chars, lon){
      for (x=0; x < lon; x++) {
        rand = Math.floor(Math.random()*chars.length);
        code += chars.substr(rand, 1);
      }
      refcode += code;
    }
    rand_code(caracteres, longitud);
  
    DataBase.UserToSeller(id, refcode).then((respuesta) =>{
      res.redirect('/users/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  }; 
};

// * CONVERTIR VENDEDOR EN USUARIO
exports.sellertouser = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  const {id} = req.body;

  if (id.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/users404/PYT-21');
  } else {
    DataBase.SellerToUser(id).then((respuesta) =>{
      res.redirect('/users/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  }; 
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

// * RETIROS USUARIOS
exports.retreats = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

    
  let roleClient = true;
  let roleSeller;
  if (req.user.type_user === 'Vendedor') {
    roleSeller = true;
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
        
        // HISTORIAL DE RETIROS (PAGOS) PENDIENTES
        DataBase.GetPendingPaymenthsUser(idUser).then((res5) => {
          let retreats = JSON.parse(res5);
          console.log(retreats)
          
        // HISTORIAL DE RETIROS (PAGOS) COMPLETADOS
        DataBase.GetPaymenthsUser(idUser).then((resp) => {
          let retreatsCompletes = JSON.parse(resp);
          console.log(retreatsCompletes)
    
    res.render(proyecto+"/user/retreats", {
      pageName: "Retiros",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      retr: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleClient,
      roleSeller,
      transf,
      paym,
      btc,
      retreats,
      retreatsCompletes,
      wallet,
    });

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error404/PYT-21");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error404/PYT-21");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error404/PYT-21");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error404/PYT-21");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error404/PYT-21");
  });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/error404/PYT-21");
  });
};

// * CREAR METODO DE RETIRO TRANSFERENCIA BANCARIA
exports.addretreatsbankpy21 = (req, res) => {
  const { fullname, dni, bank_name, type_account, num_account } = req.body;
  let msg = false;
  let userid = res.locals.user.id;
  if (fullname.trim() === '' || dni.trim() === '' || bank_name.trim() === '' || type_account.trim() === '' || num_account.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/retreats/PYT-21');
  } else {
    DataBase.AddRetreatsBank(fullname, dni, bank_name, type_account, num_account, userid).then((respuesta) =>{
      res.redirect('/retreats/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  };
}

// * CREAR METODO DE RETIRO (PAGO MOVIL)
exports.addretreatspaympy21 = (req, res) => {
  const { fullname, dni, bank_name, phone } = req.body;
  let msg = false;
  let userid = res.locals.user.id;
  if (fullname.trim() === '' || dni.trim() === '' || bank_name.trim() === '' || phone.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/retreats/PYT-21');
  } else {
    DataBase.AddRetreatsPaym(fullname, dni, bank_name, phone, userid).then((respuesta) =>{
      res.redirect('/retreats/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  };
}

// * CREAR METODO DE RETIRO RETIRO EN BTC
exports.addretreatsbtcpy21 = (req, res) => {
  const { code_wallet } = req.body;
  let msg = false;
  let userid = res.locals.user.id;
  if (code_wallet.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/retreats/PYT-21');
  } else {
    DataBase.AddRetreatsBTC(code_wallet, userid).then((respuesta) =>{
      res.redirect('/retreats/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  };
}

// * CREAR METODO DE RETIRO BILLETERA DIGITAL
exports.addretreatswalletpy21 = (req, res) => {
  const { email } = req.body;
  let msg = false;
  let userid = res.locals.user.id;
  if (email.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/retreats/PYT-21');
  } else {
    DataBase.AddRetreatsDigitalWallet(email, userid).then((respuesta) =>{
      res.redirect('/retreats/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  };
}

// * ELIMINAR METODOS DE RETIRO
exports.deletemretreatspy21 = (req, res) => {
  const { id } = req.body;
  console.log(req.body)
  console.log("ID")
  let msg = false;
  if (id.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/retreats/PYT-21');
  } else {
    DataBase.DeleteMRetreats(id).then((respuesta) =>{
      res.redirect('/retreats/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  };
}

// * ACTUALIZAR METODOS DE RETIRO
exports.updatemretreatspy21 = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)
  let {id, ttype, name, dni, bank, type_account, num_account, phone, code_wallet, email_wallet} = req.body;

  if(req.body.ttype === 'Transferencia Bancaria') {
    DataBase.UpdateRetreatsTransf(id, name, dni, bank, type_account, num_account, phone, code_wallet, email_wallet).then((respuesta) =>{
      res.redirect('/retreats/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  } else if(req.body.ttype === 'Pago Movil') {
    DataBase.UpdateRetreatsPaym(id, name, dni, bank, phone).then((respuesta) =>{
      res.redirect('/retreats/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  } else if(req.body.ttype === 'BTC') {
    DataBase.UpdateRetreatsBTC(id, code_wallet).then((respuesta) =>{
      res.redirect('/retreats/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  } else if(req.body.ttype === 'Billetera Digital') {
    DataBase.UpdateRetreatsDWallet(id, email_wallet).then((respuesta) =>{
      res.redirect('/retreats/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  }
}; 

// * VER TODOS LOS USUARIOS CON DEPOSITOS ADMIN
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

    res.render(proyecto+"/admin/users", {
      pageName: "Usuarios",
      dashboardPage: true,
      dashboard: true,
      py21:true,
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

// * METODOS DE PAGO EN LA PLATAFORMA ADMIN
exports.paymethods = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin = true;

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

    res.render(proyecto+"/admin/paymethods", {
      pageName: "Formas de Pago",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      payform: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
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

// * CREAR METODO DE PAGO TRANSFERENCIA BANCARIA ADMIN
exports.addbank = (req, res) => {
  const { fullname, dni, bank_name, type_account, num_account } = req.body;
  let msg = false;
  if (fullname.trim() === '' || dni.trim() === '' || bank_name.trim() === '' || type_account.trim() === '' || num_account.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/paymethods/PYT-21');
  } else {
    DataBase.AddBank(fullname, dni, bank_name, type_account, num_account).then((respuesta) =>{
      res.redirect('/paymethods/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  };
}

// * CREAR METODO DE PAGO (PAGO MOVIL) ADMIN
exports.addpaym = (req, res) => {
  const { fullname, dni, bank_name, phone } = req.body;
  let msg = false;
  if (fullname.trim() === '' || dni.trim() === '' || bank_name.trim() === '' || phone.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/paymethods/PYT-21');
  } else {
    DataBase.AddPaym(fullname, dni, bank_name, phone).then((respuesta) =>{
      res.redirect('/paymethods/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  };
}

// * CREAR METODO DE PAGO RETIRO EN BTC ADMIN
exports.addbtc = (req, res) => {
  const { code_wallet } = req.body;
  let msg = false;
  if (code_wallet.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/paymethods/PYT-21');
  } else {
    DataBase.AddBTC(code_wallet).then((respuesta) =>{
      res.redirect('/paymethods/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  };
}

// * CREAR METODO DE PAGO BILLETERA DIGITAL
exports.addwallet = (req, res) => {
  const { email } = req.body;
  let msg = false;
  if (email.trim() === '') {
    console.log('complete todos los campos')
    res.redirect('/paymethods/PYT-21');
  } else {
    DataBase.AddDigitalWallet(email).then((respuesta) =>{
      res.redirect('/paymethods/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  };
}

// * HABILITAR / DESHABILITAR METODOS DE PAGO
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
    res.redirect('/paymethods/PYT-21');
  } else {
    if(status === 'Habilitado') {
      status = 'Deshabilitado';
    } else {
      status = 'Habilitado';
    }
    DataBase.UpdateStatusPayMethod(id, status).then((respuesta) =>{
      res.redirect('/paymethods/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  }; 
};

// * ACTUALIZAR METODOS DE PAGO
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
      res.redirect('/paymethods/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  } else if(req.body.ttype === 'Pago Movil') {
    DataBase.UpdatePayMethodPaym(id, ttype, name, dni, bank, phone).then((respuesta) =>{
      res.redirect('/paymethods/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  } else if(req.body.ttype === 'BTC') {
    DataBase.UpdatePayMethodBTC(id, ttype, code_wallet).then((respuesta) =>{
      res.redirect('/paymethods/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  } else if(req.body.ttype === 'Billetera Digital') {
    DataBase.UpdatePayMethodDWallet(id, ttype, email_wallet).then((respuesta) =>{
      res.redirect('/paymethods/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  }
}; 

// * ELIMINAR METODOS DE PAGO
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
    res.redirect('/paymethods/PYT-21');
  } else {
    DataBase.DeletePayMethod(id).then((respuesta) =>{
      res.redirect('/paymethods/PYT-21')
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/error404/PYT-21");
    });
  }; 
};

// * OBTENER TODOS LOS DEPOSITOS DE USUARIOS ADMIN
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
// * DEPOSITOS USUARIOS
exports.deposits = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleClient = true;
  let roleSeller;
  if (req.user.type_user === 'Vendedor') {
    roleSeller = true;
  }

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
    
    res.render(proyecto+"/user/deposits", {
      pageName: "Depositos",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      dep: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleClient,
      roleSeller,
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
// * DEPOSITOS ADMIN
exports.depositsAdmin = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = req.params.id  
  console.log(proyecto)

  let roleAdmin = true;
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

    res.render(proyecto+"/admin/deposits", {
      pageName: "Depositos",
      dashboardPage: true,
      dashboard: true,
      py21:true,
      login: false,
      dep: true,
      username: req.user.username,
      typeUser: req.user.type_user,
      roleAdmin,
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