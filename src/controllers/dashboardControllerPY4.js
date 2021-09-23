const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../models/PYT4/data")
const passport = require("passport");
//const {getStreamUrls} = require('mixcloud-audio')

exports.dashboard = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  console.log(msg)
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     DataBase.PedidosAll().then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       DataBase.ChoferesAll().then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
    res.render("PYT-4/home", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      dash:true,
      clientes_d,
      clientes_arr,
      pedidos_,
      pedidos_let,
      choferes_,
      msg
    }) 
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/errorpy4/" + msg);
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};

exports.login = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
   
    res.render("PYT-4/login", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      login:true,
    })
};

exports.register = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
   
    res.render("PYT-4/register", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      login:true,
    })
};

exports.sesionstart = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  console.log(req.body);
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      console.log("no existe usuario")
      return res.redirect("/loginpy4");
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }
      console.log(user.dataValues.id);
      return res.redirect('/homepy4')
    });
  })(req, res);
};


exports.usuariosTable = (req, res) => {
  let msg = false;

  if (req.params.msg) {
    msg = req.params.msg;
  }
  console.log(req.query)
  let proyecto = "PYT-4"
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length 
     DataBase.PedidosAll().then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       DataBase.ChoferesAll().then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
     res.render("PYT-4/usersTable", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      users1:true,
      clientes_d,pedidos_,
      pedidos_let,
      choferes,
      choferes_,
      clientes_arr,
      count,
      msg
    })
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
   
};


exports.save_cliente_py4 = (req, res) => {
  console.log(req.body)
  const { firstName,lastName,ciudad,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,sucursal, email} = req.body
  let msg = false;
  var modo_cliente ="SI"
  if (cliente_nuevo == null){
    modo_cliente = "NO"
  }

  DataBase.registrar_cliente(firstName,lastName,ciudad,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, modo_cliente, fecha_ultimo_pedido, utimos_botellones,sucursal, email).then((respuesta) =>{

    res.redirect('/usuarios/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
}

exports.delete_cliente = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
console.log(id_)
  DataBase.Delete_Cliente(id_).then((respuesta) =>{
    
     console.log(respuesta)
  let msg = "Cliente Eliminado con éxito"
  res.redirect('/usuarios/'+msg)

   })   
 };

 exports.editar_cliente = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
console.log(id_)
DataBase.ClientebyId(id_).then((clientes_)=>{
  let cliente_let = JSON.parse(clientes_)[0]
 console.log(cliente_let)
res.render("PYT-4/edit_cliente", {
  pageName: "Bwater",
  dashboardPage: true,
  dashboard: true,
  py4:true,
  users1:true,
  clientes_,
  cliente_let
}) 
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
 };
 exports.save_cliente_edit = (req, res) => {
  console.log(req.body)
  const {id_cliente, firstName,lastName,ciudad,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,sucursal, email} = req.body
  let msg = false;
  var modo_cliente ="SI"
  if (cliente_nuevo == null){
    modo_cliente = "NO"
  }

  DataBase.update_cliente(id_cliente,firstName,lastName,ciudad,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, modo_cliente, fecha_ultimo_pedido, utimos_botellones,sucursal, email).then((respuesta) =>{
    res.redirect('/usuarios/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
}




  exports.reguserPy4 = (req, res) => {
    console.log(req.body)
    const { tipo, nombre, email, password} = req.body
    let msg = false;
  
    DataBase.RegUser(tipo, nombre, email, password).then((respuesta) =>{
      res.redirect('/homepy4/'+respuesta)
  
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/errorpy4/" + msg);
    });
};


exports.closeSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/loginpy4");
  });
};

exports.regPedidoPy4 = (req, res) => {
 // console.log(req.body)

  let garrafon19L ={refill_cant: req.body.refill_cant_garrafon, refill_mont: req.body.refill_garrafon_mont, canje_cant: req.body.canje_cant_garrafon, canje_mont:req.body.canje_garrafon_mont, nuevo_cant:req.body.enNew_cant_garrafon, nuevo_mont: req.body.nuevo_garrafon_mont, total_cant: req.body.total_garrafon_cant, total_cost: req.body.total_garrafon}

  let botella1L ={refill_cant: req.body.refill_cant_botella, refill_mont: req.body.refill_botella_mont, canje_cant: req.body.canje_cant_botella, canje_mont:req.body.canje_botella_mont, nuevo_cant:req.body.enNew_cant_botella, nuevo_mont: req.body.nuevo_botella_mont, total_cant: req.body.total_botella_cant, total_cost: req.body.total_botella}

  let garrafon11L ={refill_cant: req.body.refill_cant_garrafon11l, refill_mont: req.body.refill_garrafon11l_mont, canje_cant: req.body.canje_cant_garrafon11l, canje_mont:req.body.canje_garrafon11l_mont, nuevo_cant:req.body.enNew_cant_garrafon11l, nuevo_mont: req.body.nuevo_garrafon11l_mont, total_cant: req.body.total_garrafon11l_cant, total_cost: req.body.total_garrafon11l}

  let botella5L ={refill_cant: req.body.refill_cant_botella5l, refill_mont: req.body.refill_botella5l_mont, canje_cant: req.body.canje_cant_botella5l, canje_mont:req.body.canje_botella5l_mont, nuevo_cant:req.body.enNew_cant_botella5l, nuevo_mont: req.body.nuevo_botella5l_mont, total_cant: req.body.total_botella5l_cant, total_cost: req.body.total_botella5l}

  const user = res.locals.user
  const { id_cliente, firstName, lastName,  ciudad,municipio, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago, status_pago,   status_pedido, garrafones_prestamos, observacion} = req.body

  DataBase.PedidosReg(id_cliente, firstName, lastName,  ciudad, municipio,fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago,   status_pago,   status_pedido, garrafones_prestamos, observacion, garrafon19L,botella1L, garrafon11L, botella5L, user.id).then((respuesta) =>{
    res.redirect('/homepy4/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.delete_pedido = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
console.log(id_)
  DataBase.Delete_Pedido(id_).then((respuesta) =>{
    
     console.log(respuesta)
  let msg = "Pedido Eliminado con éxito"
  res.redirect('/homepy4/'+msg)

   })   
 };

 exports.editar_pedido = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
console.log(id_)
DataBase.PedidoById(id_).then((pedidos_)=>{
  let pedido_let = JSON.parse(pedidos_)[0]
 console.log(pedido_let)
 DataBase.ChoferesAll().then((choferes)=>{
  let choferes_ = JSON.parse(choferes)
 console.log(choferes_)
 let garrafon19L = JSON.parse(pedido_let.garrafon19L);
 let botella1L = JSON.parse(pedido_let.botella1L)
 let garrafon11L = JSON.parse(pedido_let.garrafon11L)
 let botella5L = JSON.parse(pedido_let.botella5L)
 console.log(garrafon19L)
 console.log(botella1L)
 console.log(garrafon11L)
 console.log(botella5L)
res.render("PYT-4/edit_pedido", {
  pageName: "Bwater",
  dashboardPage: true,
  dashboard: true,
  py4:true,
  dash:true,
  pedidos_,
  pedido_let,
  garrafon19L,
botella1L,
garrafon11L,
botella5L,
}) 
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
 };

 exports.Save_editPedidoPy4 = (req, res) => {
  
  let garrafon19L ={refill_cant: req.body.refill_cant_garrafon, refill_mont: req.body.refill_garrafon_mont, canje_cant: req.body.canje_cant_garrafon, canje_mont:req.body.canje_garrafon_mont, nuevo_cant:req.body.enNew_cant_garrafon, nuevo_mont: req.body.nuevo_garrafon_mont, total_cant: req.body.total_garrafon_cant, total_cost: req.body.total_garrafon}

  let botella1L ={refill_cant: req.body.refill_cant_botella, refill_mont: req.body.refill_botella_mont, canje_cant: req.body.canje_cant_botella, canje_mont:req.body.canje_botella_mont, nuevo_cant:req.body.enNew_cant_botella, nuevo_mont: req.body.nuevo_botella_mont, total_cant: req.body.total_botella_cant, total_cost: req.body.total_botella}

  let garrafon11L ={refill_cant: req.body.refill_cant_garrafon11l, refill_mont: req.body.refill_garrafon11l_mont, canje_cant: req.body.canje_cant_garrafon11l, canje_mont:req.body.canje_garrafon11l_mont, nuevo_cant:req.body.enNew_cant_garrafon11l, nuevo_mont: req.body.nuevo_garrafon11l_mont, total_cant: req.body.total_garrafon11l_cant, total_cost: req.body.total_garrafon11l}

  let botella5L ={refill_cant: req.body.refill_cant_botella5l, refill_mont: req.body.refill_botella5l_mont, canje_cant: req.body.canje_cant_botella5l, canje_mont:req.body.canje_botella5l_mont, nuevo_cant:req.body.enNew_cant_botella5l, nuevo_mont: req.body.nuevo_botella5l_mont, total_cant: req.body.total_botella5l_cant, total_cost: req.body.total_botella5l}

  const user = res.locals.user
  const { id_pedido,id_cliente, firstName, lastName,  ciudad,municipio, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago, status_pago,   status_pedido, garrafones_prestamos, observacion} = req.body

  DataBase.PedidosUpd(id_pedido,id_cliente, firstName, lastName,  ciudad, municipio,fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago,   status_pago,   status_pedido, garrafones_prestamos, observacion, garrafon19L,botella1L, garrafon11L, botella5L, user.id).then((respuesta) =>{
    console.log(respuesta)
    let msg=respuesta
    res.redirect('/homepy4/'+msg)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};

exports.cambiaS_pedido = (req, res) => {
  console.log(req.body)
  const user = res.locals.user
  const id_pedido = req.params.id
  const status = req.params.status
  console.log(status)

  DataBase.CambiaStatus(id_pedido,status).then((respuesta) =>{
    console.log(respuesta)
    let msg=respuesta
    res.redirect('/homepy4/'+msg)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


//PERSONAL
exports.personal_table = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  console.log(msg)
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
    // console.log(clientes_arr)
     DataBase.PedidosAll().then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
      // console.log(pedidos_let)
      DataBase.PersonalAll().then((personal_)=>{
        let personal_let = JSON.parse(personal_)
         let count = personal_let.length
        
           DataBase.ChoferesAll().then((choferes)=>{
            let choferes_ = JSON.parse(choferes)
    res.render("PYT-4/personal", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      personal:true,
      clientes_d,
      clientes_arr,
      personal_let,
      personal_,
      pedidos_,
choferes,
choferes_,
      msg
    }) 
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/errorpy4/" + msg);
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.save_personal = (req, res) => {
  console.log(req.body)
  const { firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso} = req.body
  let msg = false;

  DataBase.savePersonal(firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso).then((respuesta) =>{
    res.redirect('/personal_py4/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.delete_personal = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
console.log(id_)
  DataBase.Delete_Personal(id_).then((respuesta) =>{
    
     console.log(respuesta)
  let msg = "Personal Eliminado con éxito"
  res.redirect('/personal_py4/'+msg)

   })   
 };

 exports.editar_personal = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
console.log(id_)
DataBase.PersonalById(id_).then((personal_)=>{
  let personal_let = JSON.parse(personal_)[0]
 console.log(personal_let)
res.render("PYT-4/edit_personal", {
  pageName: "Bwater",
  dashboardPage: true,
  dashboard: true,
  py4:true,
  personal:true,
  personal_,
  personal_let
}) 
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
 };

 exports.save_personal_py4 = (req, res) => {
  console.log(req.body)
  const user = res.locals.user
  const {id_personal,firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso} = req.body

  DataBase.updPersonal(id_personal,firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso).then((respuesta) =>{
    console.log(respuesta)
    let msg=respuesta
    res.redirect('/personal_py4/'+msg)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};