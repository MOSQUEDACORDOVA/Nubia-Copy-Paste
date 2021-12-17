const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../models/PYT4/data")
const passport = require("passport");
//const {getStreamUrls} = require('mixcloud-audio')
//var moment = require('moment'); // require
var moment = require('moment-timezone');
const Push = require('push.js')

exports.change_sucursal = (req, res) => {
let nuevo_id = req.body.cambia_sucursal
  //DATA-COMUNES
  DataBase.Sucursales_id(nuevo_id).then((resp)=>{
    let resp_ = JSON.parse(resp)
   let sucursal_select = resp_[0].id
   req.session.sucursal_select= sucursal_select
         return res.redirect('/homepy4')
     
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};

exports.dashboard = (req, res) => {
  console.log(req.session.sucursal_select)
  //Push.create('Hello World!')
  let msg = false;
  let admin = false
  if (req.session.tipo == "Director") {
    admin = true
  }
  if (req.params.msg) {
    msg = req.params.msg;
  }
  if (req.params.day) {
    
    dia =moment(req.params.day, 'YYYY-DD-MM').format('YYYY-MM-DD');
  }else{
    dia = new Date()
  }
 let id_sucursal = req.session.sucursal_select
 console.log(req.session.tipo)
  //DATA-COMUNES
  let ClientesDB = "", PedidosDB="", ChoferesDB="", LastPedidosAll="",PrestadosGroupByCliente=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
    PedidosDB=DataBase.PedidosAll
    ChoferesDB=DataBase.ChoferesAll
    LastPedidosAll=DataBase.LastPedidosAll
    PrestadosGroupByCliente=DataBase.PrestadosGroupByCliente
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
    PedidosDB=DataBase.PedidosAllS
    ChoferesDB=DataBase.ChoferesAllS
LastPedidosAll=DataBase.LastPedidosAllS
PrestadosGroupByCliente=DataBase.PrestadosGroupByClienteS
      break;
  }
  DataBase.CodigosP().then((cp_)=>{
    let cp_arr = JSON.parse(cp_)
  ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     PedidosDB(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)

LastPedidosAll(id_sucursal).then((pedidos_g)=>{
  let pedidos_letG = JSON.parse(pedidos_g)
   let notif1_2=[], notif3_5=[], notif6_12=[]
   let hoy = moment()
  var duration=""
for (let i = 0; i < pedidos_letG.length; i++) {
if (pedidos_letG[i].status_pedido == "Entregado") {
  if (pedidos_letG[i].total_garrafones_pedido <= 2) {
    let dia_pedido  = moment(pedidos_letG[i].createdAt)
    duration = hoy.diff(dia_pedido, 'days');
      if (duration >=10 && duration < 20) {
        
        notif1_2.push({id_pedido: pedidos_letG[i].id, total_g: pedidos_letG[i].total_garrafones_pedido,id_cliente:pedidos_letG[i].clienteId,nombre_cliente: pedidos_letG[i].cliente.firstName,apellido_cliente: pedidos_letG[i].cliente.lastName,fecha_:pedidos_letG[i].createdAt, tiempo_desde: duration, asentamiento:pedidos_letG[i].cliente.cp.asentamiento})
      }     
    }
    if (pedidos_letG[i].total_garrafones_pedido >=3 && pedidos_letG[i].total_garrafones_pedido <=5) {
      let dia_pedido  = moment(pedidos_letG[i].createdAt)
      duration = hoy.diff(dia_pedido, 'days');
        if (duration >=20 && duration < 30) {
 
          notif3_5.push({id_pedido: pedidos_letG[i].id, total_g: pedidos_letG[i].total_garrafones_pedido,id_cliente:pedidos_letG[i].clienteId,nombre_cliente: pedidos_letG[i].cliente.firstName,apellido_cliente: pedidos_letG[i].cliente.lastName,fecha_:pedidos_letG[i].createdAt, tiempo_desde: duration,asentamiento:pedidos_letG[i].cliente.cp.asentamiento})
        }     
      }
      if (pedidos_letG[i].total_garrafones_pedido >=6 && pedidos_letG[i].total_garrafones_pedido <=12) {
        let dia_pedido  = moment(pedidos_letG[i].createdAt)
        duration = hoy.diff(dia_pedido, 'days');
          if (duration >=30) {

            notif6_12.push({id_pedido: pedidos_letG[i].id, total_g: pedidos_letG[i].total_garrafones_pedido,id_cliente:pedidos_letG[i].clienteId,nombre_cliente: pedidos_letG[i].cliente.firstName,apellido_cliente: pedidos_letG[i].cliente.lastName,fecha_:pedidos_letG[i].createdAt, tiempo_desde: duration,asentamiento:pedidos_letG[i].cliente.cp.asentamiento})
          }     
        }
  }
  }
let cont_not = parseInt(notif1_2.length) + parseInt(notif3_5.length)+ parseInt(notif6_12.length)
       ChoferesDB(id_sucursal).then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
        DataBase.Sucursales_ALl().then((sucursales_)=>{
          let sucursales_let = JSON.parse(sucursales_)
          PrestadosGroupByCliente(id_sucursal).then((prestamos_)=>{
          let prestamos_let = JSON.parse(prestamos_)  
                let prestamos_byday = []
                let prestamos_del_dia = 0, devueltos_del_dia =0
                let residencial_cont = 0
                let negocio_cont = 0
                let ptoVenta_cont = 0
                for (let i = 0; i < prestamos_let.length; i++) {
                  fecha_created = prestamos_let[i].fecha_ingreso
                  
                  let iguales = moment(fecha_created).isSame(dia, 'day'); // true
                  if (iguales == true) {
                    prestamos_byday.push(prestamos_let[i])//OJO CORREGIR ID DEL CLIENTE NO PUEDE SER NULL
                    prestamos_del_dia = parseInt(prestamos_del_dia) + parseInt(prestamos_let[i].cantidad) 
                    devueltos_del_dia = parseInt(devueltos_del_dia) + parseInt(prestamos_let[i].devueltos)    

                    switch (prestamos_let[i].cliente.tipo) {
                      case 'Residencial':
                       residencial_cont ++
                        break;
                        case 'Negocio':
                           negocio_cont++
                          break;
                          case 'Punto de venta':
                            ptoVenta_cont++
                            break;
                      default:
                        break;
                    } 
                  }
                  
                }
                   prestamos_byday =JSON.stringify(prestamos_byday)
                   DataBase.Etiquetas(id_sucursal).then((etiquetas_)=>{
                    let etiquetas_let = JSON.parse(etiquetas_)
    res.render("PYT-4/home", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      dash:true,
      admin,
      clientes_d,
      clientes_arr,
      pedidos_,
      pedidos_let,
      choferes_,prestamos_byday,prestamos_,sucursales_let,prestamos_del_dia,
      devueltos_del_dia,cp_,
      notif1_2,cont_not,notif3_5,
      notif6_12,etiquetas_let,
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
  passport.authenticate("local",  function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      console.log("no existe usuario")
      return res.redirect("/loginpy4");
    }
    req.logIn(user, async function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }

      req.session.sucursal_select= user.dataValues.sucursaleId
      req.session.tipo = user.dataValues.tipo

      return res.redirect('/homepy4')
    });
  })(req, res);
};


exports.usuariosTable = (req, res) => {
  
  let msg = false;

  if (req.params.msg) {
    msg = req.params.msg;
  }
  let admin = false
  if (req.session.tipo == "Director") {
    admin = true
  }
  let id_sucursal = req.session.sucursal_select
  let ClientesDB = "", PedidosDB="", ChoferesDB=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
    PedidosDB=DataBase.PedidosAll
    ChoferesDB=DataBase.ChoferesAll
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
    PedidosDB=DataBase.PedidosAllS
    ChoferesDB=DataBase.ChoferesAllS
      break;
  }
  //DATA-COMUNES
  ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     PedidosDB(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       ChoferesDB(id_sucursal).then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
        DataBase.Sucursales_ALl().then(async(sucursales_)=>{
          let sucursales_let = JSON.parse(sucursales_)
       DataBase.Etiquetas(id_sucursal).then((etiquetas_)=>{
            let etiquetas_let = JSON.parse(etiquetas_)

     res.render("PYT-4/usersTable", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      admin,
      users1:true,
      clientes_d,pedidos_,
      pedidos_let,
      choferes,
      choferes_,
      clientes_arr,
      count,sucursales_let,sucursales_,
      etiquetas_let,etiquetas_,
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
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
   
};


exports.save_cliente_py4 = (req, res) => {
  
  const { firstName,cp,asentamiento,lastName,ciudad,municipio, fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,sucursal, email,color} = req.body
  let msg = false;
  var modo_cliente ="SI"
  if (cliente_nuevo == null){
    modo_cliente = "NO"
  }

  DataBase.registrar_cliente(firstName,cp,asentamiento,lastName,ciudad,municipio,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, modo_cliente, fecha_ultimo_pedido, utimos_botellones,sucursal, email,color).then((respuesta) =>{

    res.redirect('/usuarios/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
}
exports.save_cliente_cuponera =  (req, res) => {
  
  const { firstName,cp,asentamiento,lastName,ciudad,municipio, fraccionamiento,coto,casa, calle, avenida, referencia, telefono,  tipo_cliente,sucursal, email,color} = req.body
  let msg = false;

  DataBase.registrar_clienteCuponera(firstName,cp,asentamiento,lastName,ciudad,municipio,fraccionamiento,coto,casa, calle, avenida, referencia, telefono,  tipo_cliente,sucursal, email,color).then(async(respuesta) =>{
    console.log(respuesta)    
      if (respuesta == "0") {
        respuesta ="Este domicilio ya se se encuentra registrado favor de comunicarse con el titular de la cuenta, contactar con Bwater sí requieren más ayuda"
        res.redirect('/log_cupon/'+respuesta)
      }else{
        let cliente_created = JSON.parse(respuesta)[0]
        await DataBase.saveCupNotificacionClientNew('Nuevo cliente', '0','Se ha creado un nuevo cliente desde la cuponera', cliente_created.id)
        res.redirect('/log_cuponera/'+respuesta)
      }


    

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
}

exports.delete_cliente = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
  DataBase.Delete_Cliente(id_).then((respuesta) =>{
    
    
  let msg = "Cliente Eliminado con éxito"
  res.redirect('/usuarios/'+msg)

   })   
 };

 exports.editar_cliente = (req, res) => {
  const user = res.locals.user;
  let id_ = req.body.id
  let id_sucursal = req.session.sucursal_select
  //DATA-COMUNES
DataBase.ClientebyId(id_).then((clientes_)=>{
  let cliente_let = JSON.parse(clientes_)

  res.send({cliente_let})

  }).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
 };
 exports.save_cliente_edit = (req, res) => {
   
  
  const {id_cliente,cp,asentamiento, firstName,lastName,ciudad,municipio,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,zona, email,color} = req.body
  let msg = false;
  var modo_cliente ="SI"
  if (cliente_nuevo == null){
    modo_cliente = "NO"
  }
console.log(req.body)
  DataBase.update_cliente(id_cliente,cp,asentamiento,firstName,lastName,ciudad,municipio,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, modo_cliente, fecha_ultimo_pedido, utimos_botellones,zona, email,color).then((respuesta) =>{
    let id_sucursal = req.session.sucursal_select
    let ClientesDB = ""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
      break;
  }
  ClientesDB(id_sucursal).then(async (clientes_d)=>{
      let clientes_arr = JSON.parse(clientes_d)
      if (req.body.id_notificacion) {
        console.log(req.body.id_notificacion)
     const save_not =   await DataBase.saveEditedNotificaciones(req.body.id_notificacion,'1')
     console.log(save_not)
     if (save_not) {
      console.log('----')
        let notif_ = JSON.parse(await DataBase.obtenernotificaciones())
         return res.send({notif_})
     }
   
      }

      return res.send({clientes_arr})
  
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
}
exports.save_cliente_edit_tag = async (req, res) => {
     
  const {id,color} = req.body
  let msg = false;
let ids =id.split(',')

for (let i = 0; i < ids.length; i++) {
  console.log(ids[i])
  await DataBase.update_cliente_tag(ids[i],color).then((respuesta) =>{
 }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
}

    let id_sucursal = req.session.sucursal_select
    let ClientesDB = ""
    switch (req.session.tipo) {
      case "Director":
        ClientesDB=DataBase.ClientesAll
        break;
    
      default:
         ClientesDB=DataBase.ClientesAllS
        break;
    }
    ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
    res.send({clientes_arr})

  
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}


exports.reguserPy4 = (req, res) => {
  const { tipo, nombre, email, password,zona} = req.body
  let msg = false;

  DataBase.RegUser(tipo, nombre, email, password,zona).then((respuesta) =>{
      let respuesta_let = JSON.parse(respuesta)

res.send({respuesta_let})
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
exports.closeSesioncuponera = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/intro_cuponera");
  });
};

exports.regPedidoPy4 = (req, res) => {
  
  let garrafon19L ={refill_cant: req.body.refill_cant_garrafon, refill_mont: req.body.refill_garrafon_mont, canje_cant: req.body.canje_cant_garrafon, canje_mont:req.body.canje_garrafon_mont, nuevo_cant:req.body.enNew_cant_garrafon, nuevo_mont: req.body.nuevo_garrafon_mont, total_cant: req.body.total_garrafon_cant, total_cost: req.body.total_garrafon, enobsequio_cant_garrafon: req.body.enobsequio_cant_garrafon}

  let botella1L ={refill_cant: req.body.refill_cant_botella, refill_mont: req.body.refill_botella_mont, canje_cant: req.body.canje_cant_botella, canje_mont:req.body.canje_botella_mont, nuevo_cant:req.body.enNew_cant_botella, nuevo_mont: req.body.nuevo_botella_mont, total_cant: req.body.total_botella_cant, total_cost: req.body.total_botella, enobsequio_cant_botella: req.body.enobsequio_cant_botella}

  let garrafon11L ={refill_cant: req.body.refill_cant_garrafon11l, refill_mont: req.body.refill_garrafon11l_mont, canje_cant: req.body.canje_cant_garrafon11l, canje_mont:req.body.canje_garrafon11l_mont, nuevo_cant:req.body.enNew_cant_garrafon11l, nuevo_mont: req.body.nuevo_garrafon11l_mont, total_cant: req.body.total_garrafon11l_cant, total_cost: req.body.total_garrafon11l, enobsequio_cant_garrafon11l: req.body.enobsequio_cant_garrafon11l}

  let botella5L ={refill_cant: req.body.refill_cant_botella5l, refill_mont: req.body.refill_botella5l_mont, canje_cant: req.body.canje_cant_botella5l, canje_mont:req.body.canje_botella5l_mont, nuevo_cant:req.body.enNew_cant_botella5l, nuevo_mont: req.body.nuevo_botella5l_mont, total_cant: req.body.total_botella5l_cant, total_cost: req.body.total_botella5l, enobsequio_cant_botella5l: req.body.enobsequio_cant_botella5l}

  const user = res.locals.user
  const { id_cliente, firstName, lastName,  ciudad,municipio, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago, status_pago,   status_pedido, garrafones_prestamos, observacion,danados,id_chofer, sucursal, deuda_anterior} = req.body

  let total_garrafones_pedido = parseInt(garrafon19L.total_cant) + parseInt(botella1L.total_cant)+parseInt(garrafon11L.total_cant)+ parseInt(botella5L.total_cant) 
  let total_refill_cant_pedido = parseInt(garrafon19L.refill_cant) + parseInt(botella1L.refill_cant)+parseInt(garrafon11L.refill_cant)+ parseInt(botella5L.refill_cant) 
  let total_canje_cant_pedido = parseInt(garrafon19L.canje_cant) + parseInt(botella1L.canje_cant)+parseInt(garrafon11L.canje_cant)+ parseInt(botella5L.canje_cant) 
  let total_nuevo_cant_pedido = parseInt(garrafon19L.nuevo_cant) + parseInt(botella1L.nuevo_cant)+parseInt(garrafon11L.nuevo_cant)+ parseInt(botella5L.nuevo_cant) 
  let total_obsequio_pedido = parseInt(garrafon19L.enobsequio_cant_garrafon) + parseInt(botella1L.enobsequio_cant_botella)+parseInt(garrafon11L.enobsequio_cant_garrafon11l)+ parseInt(botella5L.enobsequio_cant_botella5l)

  DataBase.PedidosReg(id_cliente, firstName, lastName,  ciudad, municipio,fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago,   status_pago,   status_pedido, garrafones_prestamos, observacion,danados,id_chofer, garrafon19L,botella1L, garrafon11L, botella5L, user.id, sucursal, deuda_anterior,total_garrafones_pedido,total_refill_cant_pedido, total_canje_cant_pedido,total_nuevo_cant_pedido, total_obsequio_pedido).then((respuesta) =>{
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
  
  DataBase.Delete_Pedido(id_).then((respuesta) =>{
    
    
  let msg = "Pedido Eliminado con éxito"
  return res.send({respuesta: msg})
  //res.redirect('/homepy4/'+msg)

   })   
 };

 exports.editar_pedido = (req, res) => {
  const user = res.locals.user;


  let id_ = req.body.id
  
DataBase.PedidoById2(id_).then((pedidos_)=>{
  let pedido_let = JSON.parse(pedidos_)
  let id_sucursal = req.session.sucursal_select

  return res.status(200).send(pedido_let);
  }).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
 };
 

 exports.Save_editPedidoPy4 = (req, res) => {

  let garrafon19L ={refill_cant: req.body.refill_cant_garrafon, refill_mont: req.body.refill_garrafon_mont, canje_cant: req.body.canje_cant_garrafon, canje_mont:req.body.canje_garrafon_mont, nuevo_cant:req.body.enNew_cant_garrafon, nuevo_mont: req.body.nuevo_garrafon_mont, total_cant: req.body.total_garrafon_cant, total_cost: req.body.total_garrafon, enobsequio_cant_garrafon: req.body.enobsequio_cant_garrafon}

  let botella1L ={refill_cant: req.body.refill_cant_botella, refill_mont: req.body.refill_botella_mont, canje_cant: req.body.canje_cant_botella, canje_mont:req.body.canje_botella_mont, nuevo_cant:req.body.enNew_cant_botella, nuevo_mont: req.body.nuevo_botella_mont, total_cant: req.body.total_botella_cant, total_cost: req.body.total_botella, enobsequio_cant_botella: req.body.enobsequio_cant_botella}

  let garrafon11L ={refill_cant: req.body.refill_cant_garrafon11l, refill_mont: req.body.refill_garrafon11l_mont, canje_cant: req.body.canje_cant_garrafon11l, canje_mont:req.body.canje_garrafon11l_mont, nuevo_cant:req.body.enNew_cant_garrafon11l, nuevo_mont: req.body.nuevo_garrafon11l_mont, total_cant: req.body.total_garrafon11l_cant, total_cost: req.body.total_garrafon11l, enobsequio_cant_garrafon11l: req.body.enobsequio_cant_garrafon11l}

  let botella5L ={refill_cant: req.body.refill_cant_botella5l, refill_mont: req.body.refill_botella5l_mont, canje_cant: req.body.canje_cant_botella5l, canje_mont:req.body.canje_botella5l_mont, nuevo_cant:req.body.enNew_cant_botella5l, nuevo_mont: req.body.nuevo_botella5l_mont, total_cant: req.body.total_botella5l_cant, total_cost: req.body.total_botella5l, enobsequio_cant_botella5l: req.body.enobsequio_cant_botella5l}

  const user = res.locals.user
  const { id_pedido,id_cliente, chofer, total_total_inp, metodo_pago, status_pago,   status_pedido, garrafones_prestamos, observacion, danados,id_chofer,sucursal,deuda_anterior} = req.body

  let total_garrafones_pedido = parseInt(garrafon19L.total_cant) + parseInt(botella1L.total_cant)+parseInt(garrafon11L.total_cant)+ parseInt(botella5L.total_cant) 
  let total_refill_cant_pedido = parseInt(garrafon19L.refill_cant) + parseInt(botella1L.refill_cant)+parseInt(garrafon11L.refill_cant)+ parseInt(botella5L.refill_cant) 
  let total_canje_cant_pedido = parseInt(garrafon19L.canje_cant) + parseInt(botella1L.canje_cant)+parseInt(garrafon11L.canje_cant)+ parseInt(botella5L.canje_cant) 
  let total_nuevo_cant_pedido = parseInt(garrafon19L.nuevo_cant) + parseInt(botella1L.nuevo_cant)+parseInt(garrafon11L.nuevo_cant)+ parseInt(botella5L.nuevo_cant) 
  let total_obsequio_pedido = parseInt(garrafon19L.enobsequio_cant_garrafon) + parseInt(botella1L.enobsequio_cant_botella)+parseInt(garrafon11L.enobsequio_cant_garrafon11l)+ parseInt(botella5L.enobsequio_cant_botella5l)

 
  DataBase.PedidosUpd(id_pedido,id_cliente, chofer, total_total_inp, metodo_pago,   status_pago,   status_pedido, garrafones_prestamos, observacion,danados,id_chofer, garrafon19L,botella1L, garrafon11L, botella5L, user.id,sucursal,deuda_anterior,total_garrafones_pedido,total_refill_cant_pedido, total_canje_cant_pedido,total_nuevo_cant_pedido, total_obsequio_pedido).then((respuesta) =>{
    let id_sucursal = req.session.sucursal_select
    DataBase.PedidosAllS(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
    let msg=respuesta
    return res.send({msg:msg, pedidos_let})
    // res.redirect('/homepy4/'+msg)

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

exports.cambiaS_pedido = (req, res) => {
  
  const user = res.locals.user
  // const id_pedido = req.params.id
  // const status = req.params.status
  
  const id_pedido = req.body.id
  const status = req.body.status
  let id_sucursal = req.session.sucursal_select
  DataBase.CambiaStatus(id_pedido,status).then((respuesta) =>{
    DataBase.PedidosAllS(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
    let msg=respuesta
    return res.send({msg:msg, pedidos_let})
    // res.redirect('/homepy4/'+msg)

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
exports.cambia_S_pago = (req, res) => {
  
  const user = res.locals.user
  const id_pedido = req.body.id
  const status = req.body.status
  let id_sucursal = req.session.sucursal_select

  DataBase.CambiaStatusPago(id_pedido,status).then((respuesta) =>{
    DataBase.PedidosAllS(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
    let msg=respuesta
    return res.send({msg:msg, pedidos_let})
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


//PERSONAL
exports.personal_table = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  let admin = false
  if (req.session.tipo == "Director") {
    admin = true
  }
  let id_sucursal = req.session.sucursal_select
  console.log(req.session.tipo)
  console.log(id_sucursal)
  //DATA-COMUNES
  let ClientesDB = "", PedidosDB="", ChoferesDB="", PersonalDB=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
    PedidosDB=DataBase.PedidosAll
    ChoferesDB=DataBase.ChoferesAll
    PersonalDB=DataBase.PersonalAll
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
    PedidosDB=DataBase.PedidosAllS
    ChoferesDB=DataBase.ChoferesAllS
    PersonalDB=DataBase.PersonalAllS
      break;
  }
  //DATA-COMUNES
  ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     PedidosDB(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       ChoferesDB(id_sucursal).then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
       
        PersonalDB(id_sucursal).then((personal_)=>{
        let personal_let = JSON.parse(personal_)
         let count = personal_let.length
            DataBase.vehiculosAll().then((vehiculos_)=>{
              let vehiculos_let = JSON.parse(vehiculos_)
               let count = vehiculos_let.length
               DataBase.Sucursales_ALl().then((sucursales_)=>{
                let sucursales_let = JSON.parse(sucursales_)

                DataBase.UsuariobyAll().then((usuarios_)=>{
                let usuarios_let = JSON.parse(usuarios_)

    res.render("PYT-4/personal", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      personal:true,
      clientes_d, clientes_arr,  personal_let, personal_,  pedidos_,choferes,choferes_,
      vehiculos_let,  msg,sucursales_let,usuarios_let,
      usuarios_,sucursales_,admin
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
  
  const { firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo} = req.body
  let msg = false;
  let id_sucursal = req.session.sucursal_select
  DataBase.savePersonal(firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo).then((respuesta) =>{
    let PersonalDB=""
  switch (req.session.tipo) {
    case "Director":
    PersonalDB=DataBase.PersonalAll
      break;
  
    default:
    PersonalDB=DataBase.PersonalAllS
      break;
  }
  PersonalDB(id_sucursal).then((personal_)=>{
    let personal_let = JSON.parse(personal_)
    res.send({personal_let})
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


exports.delete_personal = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
  DataBase.Delete_Personal(id_).then((respuesta) =>{
    
  let msg = "Personal Eliminado con éxito"
  res.sed({msg})

   })   
 };

 exports.editar_personal = (req, res) => {
  const user = res.locals.user;
  let id_ = req.body.id
  let id_sucursal = req.session.sucursal_select
  //DATA-COMUNES

DataBase.PersonalById(id_).then((personal_)=>{
  let personal_let = JSON.parse(personal_)
  
res.send({personal_let})
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });



 };

 exports.save_personal_py4 = (req, res) => {
   
  const user = res.locals.user
  const {id_personal,firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo} = req.body

  DataBase.updPersonal(id_personal,firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo).then((respuesta) =>{
 
    let id_sucursal = req.session.sucursal_select
      let PersonalDB=""
    switch (req.session.tipo) {
      case "Director":
      PersonalDB=DataBase.PersonalAll
        break;
    
      default:
      PersonalDB=DataBase.PersonalAllS
        break;
    }
    PersonalDB(id_sucursal).then((personal_)=>{
      let personal_let = JSON.parse(personal_)
      console.log(personal_let)
      res.send({personal_let})
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

//USUARIOS
exports.delete_users = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
  DataBase.UsuarioDelete(id_).then((respuesta) =>{
    
  let msg = "Usuario Eliminado con éxito"
  res.redirect('/personal_py4/'+msg)

   })   
 };

 exports.editar_usuarios = (req, res) => {
  const user = res.locals.user;
  let id_ = req.body.id
  let id_sucursal = req.session.sucursal_select
  //DATA-COMUNES

DataBase.UsuariobyId(id_).then((usuarios_)=>{
  let usuarios_let = JSON.parse(usuarios_)
res.send({usuarios_let})
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});

 };

 exports.save_usuarios_py4 = (req, res) => {
   
  const user = res.locals.user
  const {id_user, tipo, nombre, email, zona} = req.body

  DataBase.actualizarUser(id_user,nombre, email, tipo, zona).then((respuesta) =>{

    DataBase.UsuariobyAll().then((usuarios_)=>{
      let usuarios_let = JSON.parse(usuarios_)

      res.send({usuarios_let})

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
exports.cambia_pass = (req, res) => {
   
  const user = res.locals.user
  const {id_, pass} = req.body

  DataBase.actualizarpassW(id_, pass).then((respuesta) =>{
console.log(respuesta)
    DataBase.UsuariobyAll().then((usuarios_)=>{
      let usuarios_let = JSON.parse(usuarios_)

      res.send({usuarios_let})

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
exports.cambia_zona_client = async (req, res) => {
   
  const user = res.locals.user
  const {ids_cli, zona} = req.body

  let split_id = ids_cli.split(',')

  for (let i = 0; i < split_id.length; i++) {
    await DataBase.actualizarZonaCliente(split_id[i],zona) 
  }
  let id_sucursal = req.session.sucursal_select
  let ClientesAllS=""
  switch (req.session.tipo) {
    case "Director":
      ClientesAllS=DataBase.ClientesAll
      break;
  
    default:
      ClientesAllS=DataBase.ClientesAllS
      break;
  }
  ClientesAllS(id_sucursal).then((clientes_d)=>{
      let clientes_arr = JSON.parse(clientes_d)
      res.send({clientes_arr})

  
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
};
//CORTE
exports.corte_table = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  let admin = false
  if (req.session.tipo == "Director") {
    admin = true
  }
  let dia =""
 
  if (req.params.day) {
    
    dia =moment(req.params.day, 'YYYY-DD-MM').format('YYYY-MM-DD');
  }else{
    dia = new Date()
  }
  let id_sucursal = req.session.sucursal_select
  //DATA-COMUNES
  let ClientesDB = "", PedidosDB="", ChoferesDB="", PersonalDB="", PedidosAllGroupByChoferes=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
    PedidosDB=DataBase.PedidosAll
    ChoferesDB=DataBase.ChoferesAll
    PersonalDB=DataBase.PersonalAll
    PedidosAllGroupByChoferes=DataBase.PedidosAllGroupByChoferes
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
    PedidosDB=DataBase.PedidosAllS
    ChoferesDB=DataBase.ChoferesAllS
    PersonalDB=DataBase.PersonalAllS
    PedidosAllGroupByChoferes=DataBase.PedidosAllGroupByChoferesS
      break;
  }
  DataBase.CodigosP().then((cp_)=>{
    let cp_arr = JSON.parse(cp_)
    ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     PedidosDB(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       ChoferesDB(id_sucursal).then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
        PersonalDB(id_sucursal).then((personal_)=>{
          let personal_let = JSON.parse(personal_)
           let count = personal_let.length
           PedidosAllGroupByChoferes(id_sucursal).then(async (pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
            let pedidos_byday = []
            let ventas_del_dia = 0
            let cont_ventas_del_dia = 0
            let residencial_cont = 0
            let residencial_mont= 0, residencial_cont_garrafones=0
            let negocio_cont = 0
            let negocio_mont= 0,negocio_cont_garrafones=0
            let ptoVenta_cont = 0
            let ptoVenta_mont= 0,ptoventa_cont_garrafones=0
            var chofer_pedido = []
            let garrafon19Larray, botella1Larr, garrafon11Larr, botella5Larr;
            let carga_inicial ="", arr_carga=[]
            for (let i = 0; i < pedidos_let.length; i++) {
              fecha_created = pedidos_let[i].createdAt
              let iguales = moment(fecha_created).isSame(dia, 'day'); // true
              if (iguales == true && pedidos_let[i].status_pedido == "Entregado") {
                carga_inicial = JSON.parse(await DataBase.carga_init_corte(id_sucursal,pedidos_let[i].personalId))
                arr_carga.push(carga_inicial)
                garrafon19Larray = JSON.parse(pedidos_let[i].garrafon19L)
                botella1Larr = JSON.parse(pedidos_let[i].botella1L)
                garrafon11Larr = JSON.parse(pedidos_let[i].garrafon11L)
                botella5Larr = JSON.parse(pedidos_let[i].botella5L)

                pedidos_byday.push(pedidos_let[i])

               ventas_del_dia = parseInt(ventas_del_dia) + parseInt(pedidos_let[i].monto_total)
                cont_ventas_del_dia++
                switch (pedidos_let[i].cliente.tipo) {
                  case 'Residencial':
                    residencial_mont= parseInt(residencial_mont) + parseInt(pedidos_let[i].monto_total)
                    residencial_cont_garrafones= parseInt(residencial_cont_garrafones) + parseInt(pedidos_let[i].total_garrafones_pedido)
                   residencial_cont ++
                    break;
                    case 'Negocio':
                       negocio_mont= parseInt(negocio_mont) + parseInt(pedidos_let[i].monto_total)
                       negocio_cont_garrafones= parseInt(negocio_cont_garrafones) + parseInt(pedidos_let[i].total_garrafones_pedido)
                       negocio_cont++
                      break;
                      case 'Punto de venta':
                        ptoVenta_mont = parseInt(ptoVenta_mont) + parseInt(pedidos_let[i].monto_total)
                        ptoventa_cont_garrafones = parseInt(ptoventa_cont_garrafones) + parseInt(pedidos_let[i].total_garrafones_pedido)
                        ptoVenta_cont++
                        break;
                  default:
                    break;
                }
              }
            }

               pedidos_byday =JSON.stringify(pedidos_byday) 
               arr_carga = JSON.stringify(arr_carga)
               total_garrafones= parseInt(residencial_cont_garrafones) +parseInt(negocio_cont_garrafones) +parseInt(ptoventa_cont_garrafones)
               DataBase.Sucursales_ALl().then((sucursales_)=>{
                let sucursales_let = JSON.parse(sucursales_)  
                       
    res.render("PYT-4/corte", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,admin,
      corte:true,dia,
      clientes_d,clientes_arr,personal_let,personal_,pedidos_byday,
      cont_ventas_del_dia,ventas_del_dia,residencial_cont,residencial_mont, negocio_cont,  negocio_mont,ptoVenta_cont,ptoVenta_mont,pedidos_,residencial_cont_garrafones,
      negocio_cont_garrafones,total_garrafones,
      ptoventa_cont_garrafones,
choferes,chofer_pedido,
choferes_,sucursales_let,arr_carga,
      msg,cp_,
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


//CORTE PRESTADOS
exports.corte_prestados_table = (req, res) => {
  let id_chofer  = req.params. id_chofer, 
  cantidad = req.params.cantidad ,
  id_cliente = req.params.id_cliente ,
  fecha = req.params.fecha;
  
  DataBase.DescontarGPrestados(id_chofer,  cantidad, id_cliente, fecha).then((desc_)=>{
    let desc__let = JSON.parse(desc_)[0]
    
    let devueltos_nuevo = parseInt(desc__let.devueltos)+ parseInt(cantidad)
    let nueva_cantidad = parseInt(desc__let.cantidad)- parseInt(cantidad)
    
    DataBase.UpdateGPRestados(id_chofer,  devueltos_nuevo, id_cliente, fecha,nueva_cantidad).then((personal_)=>{
      let pedidos_let = JSON.parse(personal_)[0]
             
      res.send(pedidos_let.devueltos)
    })
  })

}

  //DEUDA PEDIDO
  exports.verifica_deuda_pedido = (req, res) => {
    let id_cliente = req.body.id_cliente
    DataBase.Verf_deuda_pedido(id_cliente, req.session.sucursal_select).then((desc_)=>{
      let deuda = JSON.parse(desc_)
      let deuda_monto = 0, prestados = 0;
      for (let i = 0; i < deuda.length; i++) {
        
        deuda_monto = parseFloat(deuda_monto) + parseFloat(deuda[i].monto_total)
        prestados = parseFloat(prestados) + parseFloat(deuda[i].garrafones_prestamos)
      } 

        return res.status(200).send({'deuda':deuda_monto,'prestados':prestados });
      })
  }

//CP
exports.consultaCP = (req, res) => {
  
  let cp = req.body.cp
  DataBase.CPbycp(cp).then((CP_)=>{
    let cp_let = JSON.parse(CP_)
    let count = cp_let.length
    
    return res.status(200).send({ cp_let:cp_let });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


//VEHICULOS
exports.vehiculos_table = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  let admin = false
  if (req.session.tipo == "Director") {
    admin = true
  }
  let ClientesDB = "", PedidosDB="", ChoferesDB="", vehiculosAll=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
    PedidosDB=DataBase.PedidosAll
    ChoferesDB=DataBase.ChoferesAll
    vehiculosAll=DataBase.vehiculosAll
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
    PedidosDB=DataBase.PedidosAllS
    ChoferesDB=DataBase.ChoferesAllS
    vehiculosAll=DataBase.vehiculosAllS
      break;
  }
  let id_sucursal = req.session.sucursal_select
  //DATA-COMUNES
  ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     PedidosDB(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       ChoferesDB(id_sucursal).then((choferes)=>{
        let choferes_ = JSON.parse(choferes)       
       
        vehiculosAll(id_sucursal).then((vehiculos_)=>{
        let vehiculos_let = JSON.parse(vehiculos_)
         let count = vehiculos_let.length
            DataBase.Sucursales_ALl().then((sucursales_)=>{
              let sucursales_let = JSON.parse(sucursales_)
    res.render("PYT-4/vehiculos", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      vehiculos:true,
      clientes_d,
      clientes_arr,
      vehiculos_let,
      vehiculos_,
      pedidos_,sucursales_let,
choferes,
choferes_,sucursales_,
      msg, admin
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
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.save_vehiculos = (req, res) => {
  
  const { matricula, marca, modelo, anio, status, sucursal,tipo, capacidad} = req.body
  let msg = false;

  DataBase.savevehiculos(matricula, marca, modelo, anio, status, sucursal,tipo,capacidad).then((respuesta) =>{
    let save_veh = JSON.parse(respuesta)
    res.send({save_veh})

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.delete_vehiculos = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
  DataBase.Delete_vehiculos(id_).then((respuesta) =>{
    
  let msg = "vehiculos Eliminado con éxito"
  res.send({msg})

   })   
 };

 exports.editar_vehiculos = (req, res) => {
  const user = res.locals.user;
  let id_ = req.body.id
  
DataBase.vehiculosById(id_).then((vehiculos_)=>{
  let vehiculos_let = JSON.parse(vehiculos_)
res.send({vehiculos_let})
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
 };

 exports.save_vehiculos_py4 = (req, res) => {
  let id_sucursal = req.session.sucursal_select
  const user = res.locals.user
  const {id_vehiculo,matricula, marca, modelo, anio, status, sucursal,tipo, capacidad} = req.body

  DataBase.updVehiculos(id_vehiculo,matricula, marca, modelo, anio, status, sucursal,tipo, capacidad).then((respuesta) =>{
    
    let vehiculosAll=""
    switch (req.session.tipo) {
      case "Director":
      vehiculosAll=DataBase.vehiculosAll
        break;
    
      default:
      vehiculosAll=DataBase.vehiculosAllS
        break;
    }
    vehiculosAll(id_sucursal).then((vehiculos_)=>{
      let vehiculos_let = JSON.parse(vehiculos_)
      console.log(vehiculos_let)
      res.send({vehiculos_let})
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

//SUCURSALES
exports.sucursales = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  let admin = false
  if (req.session.tipo == "Director") {
    admin = true
  }
  let id_sucursal = req.session.sucursal_select
  let ClientesDB = "", PedidosDB="", ChoferesDB="", vehiculosAll=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
    PedidosDB=DataBase.PedidosAll
    ChoferesDB=DataBase.ChoferesAll
    vehiculosAll=DataBase.vehiculosAll
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
    PedidosDB=DataBase.PedidosAllS
    ChoferesDB=DataBase.ChoferesAllS
    vehiculosAll=DataBase.vehiculosAllS
      break;
  }
  //DATA-COMUNES
  ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     PedidosDB(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       ChoferesDB(id_sucursal).then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
        vehiculosAll(id_sucursal).then((vehiculos_)=>{
              let vehiculos_let = JSON.parse(vehiculos_)
               let count = vehiculos_let.length
 DataBase.Sucursales_ALl().then((sucursales_)=>{
                let sucursales_let = JSON.parse(sucursales_)
                 let count = sucursales_let.length
               //no comunes
              
                 DataBase.Gerentes().then((gerentes_)=>{
                  let gerentes_let = JSON.parse(gerentes_)
                   let count = gerentes_let.length
    res.render("PYT-4/sucursales", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,admin,
      sucursales:true,
      clientes_d, clientes_arr,pedidos_,choferes,choferes_,
      vehiculos_let,  msg,
      //NO COMUNES
      sucursales_let, sucursales_,gerentes_let
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


exports.save_sucursal = (req, res) => {
  
  const { nombre, direccion, longitud, latitud, telefono, gerente,telefono_gerente, id_gerente} = req.body
  let msg = false;

  DataBase.saveSucursal(nombre, direccion, longitud, latitud, telefono, gerente,telefono_gerente, id_gerente).then((respuesta) =>{
    res.redirect('/sucursales_py4/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};

exports.delete_sucursales = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
  DataBase.delete_sucursales(id_).then((respuesta) =>{
    
  let msg = "Sucursal eliminada con éxito"
  res.send({msg})

   })   
 };
 
 exports.editar_sucursales = (req, res) => {
  const user = res.locals.user;
  let id_ = req.body.id
  
DataBase.Sucursales_id(id_).then((sucursales_)=>{
  let sucursales_let = JSON.parse(sucursales_)
res.send({sucursales_let})
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
 };

 exports.editar_sucursales_save = (req, res) => {
   
  const user = res.locals.user
  const {id_, nombre, telefono} = req.body
  console.log(id_)
  console.log(nombre)
  DataBase.updSucursal(id_,nombre, telefono).then((respuesta) =>{
    console.log(respuesta)
    DataBase.Sucursales_ALl().then((sucursales_)=>{
      let sucursales_let = JSON.parse(sucursales_)
       let count = sucursales_let.length

    res.send({sucursales_let})
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
 
//CARGA INCIAL
exports.carga_inicial = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  let dia ="", admin= false
 
  if (req.params.day) {
    
    dia =moment(req.params.day, 'YYYY-DD-MM').format('YYYY-MM-DD');
  }else{
    dia = new Date()
  }
  let id_sucursal = req.session.sucursal_select
  //DATA-COMUNES
  let ClientesDB = "", PedidosDB="", ChoferesDB="", PersonalAll="",Carga_init="", Asig_chofer= "",vehiculosAll=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
    PedidosDB=DataBase.PedidosAll
    ChoferesDB=DataBase.ChoferesAll
    PersonalAll=DataBase.PersonalAll
    Carga_init=DataBase.Carga_init
    Asig_chofer=DataBase.ObtenerAsignados
    vehiculosAll=DataBase.vehiculosAll
    admin = true
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
    PedidosDB=DataBase.PedidosAllS
    ChoferesDB=DataBase.ChoferesAllS
    PersonalAll=DataBase.PersonalAllS
    Carga_init=DataBase.Carga_initS
Asig_chofer=DataBase.ObtenerAsignados
vehiculosAll=DataBase.vehiculosAllS
      break;
  }
  ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     PedidosDB(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       ChoferesDB(id_sucursal).then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
        PersonalAll(id_sucursal).then((personal_)=>{
          let personal_let = JSON.parse(personal_)
           let count = personal_let.length 
               DataBase.Sucursales_ALl().then((sucursales_)=>{
                let sucursales_let = JSON.parse(sucursales_)  
                Carga_init(id_sucursal).then((carga_)=>{
                let carga_let = JSON.parse(carga_) 
                Asig_chofer(id_sucursal).then((asignados)=>{
                  console.log(asignados)
                  vehiculosAll(id_sucursal).then((vehiculos_)=>{
                    let vehiculos_let = JSON.parse(vehiculos_)
  console.log(carga_let)
    res.render("PYT-4/carga_init", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      carga_init:true,dia,
      clientes_d,clientes_arr,personal_let,personal_,
      pedidos_,choferes,choferes_,sucursales_let,
      msg,carga_,asignados,vehiculos_let,admin
    }) 
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
               }).catch((err =>{
                 console.log(err)
                 let msg = "Error en sistema";
                 return res.redirect("/errorpy4/"+ msg)
               }))
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

exports.save_carga_inicial = (req, res) => {
  
  const { carga_init,  id_chofer_carga} = req.body
  let msg = false;
  let id_sucursal = req.session.sucursal_select
  DataBase.savecarga_inicial(carga_init,  id_chofer_carga, req.session.sucursal_select).then((respuesta) =>{
    let respuesta_let = JSON.parse(respuesta)
    switch (req.session.tipo) {
      case "Director":
      Carga_init=DataBase.Carga_init
      admin = true
        break;
    
      default:
      Carga_init=DataBase.Carga_initS
        break;
    }
    Carga_init(id_sucursal).then((carga_)=>{
      let carga_let = JSON.parse(carga_) 

    res.send({carga_let})
    

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
exports.save_recarga = async (req, res) => {
  
  const { id_carga, recarga } = req.body
  let msg = false;
  let id_sucursal = req.session.sucursal_select
  console.log(id_carga)
  var carga_actual = JSON.parse(await DataBase.cargaActual(id_carga))
  console.log(carga_actual)
  let nueva_carga = parseInt(recarga) + parseInt(carga_actual.recarga)
  console.log(nueva_carga)
var update_recarga = await DataBase.updcarga_inicial(id_carga,  nueva_carga);
console.log(update_recarga)
var recarga_table = await DataBase.recarga_table(id_carga,  recarga)
console.log(recarga_table)
    switch (req.session.tipo) {
      case "Director":
      Carga_init=DataBase.Carga_init
      admin = true
        break;
    
      default:
      Carga_init=DataBase.Carga_initS
        break;
    }
    Carga_init(id_sucursal).then((carga_)=>{
      let carga_let = JSON.parse(carga_) 

    res.send({carga_let})
    

}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
};



//ASIGNAR CHOFER
exports.save_asignar_chofer = (req, res) => {
  
  const { chofer, vehiculo, zona} = req.body
  console.log(req.body)
  let id_sucursal = req.session.sucursal_select
  DataBase.SaveAsignado(vehiculo, chofer,zona).then((respuesta) =>{
    console.log(respuesta)
    let respuesta_let = JSON.parse(respuesta)
DataBase.ObtenerAsignados(id_sucursal).then((asignados_)=>{
            let asignados_let = JSON.parse(asignados_)
            console.log(asignados_let)

    return res.send({asignados_let})

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
  }); 
}).catch((err) => {
    console.log(err)
    let msg = "Error en sistema2";
return res.redirect("/errorpy4/" + msg);
  });
};
exports.save_asignar_chofer_edited = (req, res) => {
  
  const {id_asig, chofer, vehiculo, zona} = req.body
  console.log(req.body)
  let id_sucursal = req.session.sucursal_select
  DataBase.SaveAsignadoEdited(id_asig, vehiculo, chofer,zona).then((respuesta) =>{
    console.log(respuesta)
    let respuesta_let = JSON.parse(respuesta)
DataBase.ObtenerAsignados(id_sucursal).then((asignados_)=>{
            let asignados_let = JSON.parse(asignados_)
            console.log(asignados_let)

    return res.send({asignados_let})

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
  }); 
}).catch((err) => {
    console.log(err)
    let msg = "Error en sistema2";
return res.redirect("/errorpy4/" + msg);
  });
};
exports.delete_asignar_chofer = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  let id_sucursal = req.session.sucursal_select
  DataBase.delete_asignar_chofer(id_).then((respuesta) =>{
    
  let msg = "Etiqueta Eliminada con éxito"
  DataBase.ObtenerAsignados(id_sucursal).then((asignados_)=>{
    let asignados_let = JSON.parse(asignados_)
    console.log(asignados_let)

return res.send({asignados_let})

}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
   })   
 };
exports.editar_asig_chofer = (req, res) => {
  const user = res.locals.user;
  let id_ = req.body.id
  
DataBase.ObtenerAsignadosbyId(id_).then((asig_chofer_)=>{
  let asig_chofer_let = JSON.parse(asig_chofer_)
  console.log(asig_chofer_let)
res.send({asig_chofer_let})
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
 };

//ETIQUETAS

exports.save_etiquetas = (req, res) => {
  
  const { nombre, color} = req.body
  let msg = false;
  let id_sucursal = req.session.sucursal_select
  DataBase.Etiquetas_save(nombre, color,id_sucursal).then((respuesta) =>{
    let respuesta_let = JSON.parse(respuesta)
DataBase.Etiquetas(id_sucursal).then((etiquetas_)=>{
            let etiquetas_let = JSON.parse(etiquetas_)
    res.send({respuesta_let})

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


exports.delete_etiqueta = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  let id_sucursal = req.session.sucursal_select
  DataBase.delete_etiqueta(id_).then((respuesta) =>{
    
  let msg = "Etiqueta Eliminada con éxito"
  DataBase.Etiquetas(id_sucursal).then((etiquetas_)=>{
    let etiquetas_let = JSON.parse(etiquetas_)
res.send({etiquetas_let})

}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
   })   
 };

 // CUPONES
exports.getCupones = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  let admin = false
  if (req.session.tipo == "Director") {
    admin = true
  }
  let id_sucursal = req.session.sucursal_select
  let ClientesDB = "", PedidosDB="", ChoferesDB="", vehiculosAll=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
    PedidosDB=DataBase.PedidosAll
    ChoferesDB=DataBase.ChoferesAll
    vehiculosAll=DataBase.vehiculosAll
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
    PedidosDB=DataBase.PedidosAllS
    ChoferesDB=DataBase.ChoferesAllS
    vehiculosAll=DataBase.vehiculosAllS
      break;
  }
  //DATA-COMUNES
  ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     PedidosDB(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       ChoferesDB(id_sucursal).then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
        vehiculosAll(id_sucursal).then((vehiculos_)=>{
              let vehiculos_let = JSON.parse(vehiculos_)
               let count = vehiculos_let.length
 DataBase.Sucursales_ALl().then((sucursales_)=>{
                let sucursales_let = JSON.parse(sucursales_)
                 let count = sucursales_let.length
    DataBase.CodigosP().then((cp_)=>{
                  let cp_arr = JSON.parse(cp_)
                 DataBase.totalcupones().then( async(total_cupones) => {
    let cupones_act = JSON.parse(total_cupones);
    DataBase.obtenerCuponesUsados().then( async(total_cupones_usados) => {
      let total_cupones_usados_cupones_act = JSON.parse(total_cupones_usados);
      
    console.log(cupones_act);
    res.render("PYT-4/cupones", {
      pageName: "Cupones",
      cupones: true,
      cupones_act,total_cupones,
      msg,
      dashboardPage: true,admin,
      dashboard: true,
      py4:true,
      clientes_d, clientes_arr,pedidos_,choferes,choferes_,
      vehiculos_let,  msg,total_cupones_usados,
      //NO COMUNES
      sucursales_let, sucursales_,cp_
    });
  }).catch((err) => {
    console.log(err);
  });
}).catch((err) => {
  console.log(err);
});
}).catch((err) => {
  console.log(err);
});
}).catch((err) => {
  console.log(err);
});
}).catch((err) => {
  console.log(err);
});
}).catch((err) => {
  console.log(err);
});
}).catch((err) => {
  console.log(err);
});
}).catch((err) => {
  console.log(err);
});
};


exports.save_cupon = async (req, res) => {
  const {nombre_cupon, categoria, nombre_proveedor,ws_proveedor, fecha_inicio, fecha_final, cantidad, img,descripcion,dir_proveedor} = req.body;
  var msg = "";
  const user = res.locals.user.id
  DataBase.guardarCupon(user,nombre_cupon,categoria,nombre_proveedor,ws_proveedor,fecha_inicio, fecha_final,cantidad, descripcion,img,dir_proveedor)
    .then((result) => {
      let cupones_let = JSON.parse(result)
        res.send({cupones_let})
  }).catch((err) => {
      return res.status(500).send("Error actualizando" + err);
    });
};

exports.editCupon = (req, res) => {
  let id_buscar = req.body.id;

  DataBase.obtenerCuponforedit(id_buscar).then((resultado) => {
    let parsed_cupon = JSON.parse(resultado);
res.send({parsed_cupon})
  });
};

exports.saveCuponEdited = async (req, res) => {
  const {nombre_cupon, categoria, nombre_proveedor,ws_proveedor, fecha_inicio, fecha_final, cantidad, img,id_cupon,descripcion,dir_proveedor} = req.body;
  var msg = "";
  const user = res.locals.user.id
  DataBase.saveEditedCupon(id_cupon,user,nombre_cupon,categoria,nombre_proveedor,ws_proveedor,fecha_inicio, fecha_final,cantidad, descripcion,img,dir_proveedor)
    .then((result) => {
      console.log(result)
      DataBase.totalcupones().then((total_cupones) => {
        let cupones_act = JSON.parse(total_cupones);
        res.send({cupones_act})
    })
    .catch((err) => {
      return res.status(500).send("Error actualizando" + err);
    });
  })
  .catch((err) => {
    return res.status(500).send("Error actualizando" + err);
  })
};
exports.deleteCupon = async (req, res) => {
  let parametro_buscar = req.params.id;

  DataBase.deleteCupon(parametro_buscar).then((resultado) => {
    DataBase.obtenerCuponesUsados().then( async(total_cupones_usados) => {
      let total_cupones_usados_cupones_act = JSON.parse(total_cupones_usados);
    let msg = "Cupón eliminado con exito";
    res.send({total_cupones_usados_cupones_act});
  });
});
};

exports.usar_cupon = async (req, res) => {
  const { form_id_cliente, id_cupon_selected, fecha_selected } = req.body;
console.log(req.body);
  const cupon = JSON.parse(await DataBase.consultarCupon(id_cupon_selected))
  //   let parsed = JSON.parse(resultado)[0];
  //   
      var cantidad_act = cupon.cantidad_actual - 1;
      console.log(cantidad_act);
  //   if (typeof parsed === "undefined") {
  //     return res.send("El cupón no existe favor verificar");
  //   } else { 
  //     if (parsed.cantidad_actual == 0) {
  //       return res.send("Cupon agotado");
  //     } else {
  //       Hoy = moment(); 
  //       console.log(Hoy)
  //           let fecha_final= moment(Hoy).isAfter(parsed.fecha_final); // true
  //               console.log(fecha_final)
  //               if (fecha_final == true) {
  //                 return res.send("Cupon vencido");
  //                 return;
  //               } else {
  //         console.log("Has introducido la fecha de Hoy");
  //         var cantidad_act = parsed.cantidad_actual - 1;
  //         var id_cupon = parsed.id;
  //         var valor = parsed.valor;
  //         var nombre_cupon = parsed.nombre_cupon;
  //         var tipo = parsed.tipo;
  //         var fecha_uso = Hoy.toISOString()
  //         var especial =parsed.especial
  //         let usuario_id =0
  //         if (typeof res.locals.user.id != "undefined") {
  //           usuario_id = res.locals.user.id
            
  //         }
  //         if (especial == "SI") {
  //           let cupon_s= {'valor':valor,'tipo':tipo, 'especial': parsed.especial}
  //           console.log(res.locals.user.id)
  //           if (typeof res.locals.user.id == "undefined") {
  //             console.log('no ha iniciado sesion para aplicar cupon')
  //             return res.send(cupon_s);
  //           }
             const usado = JSON.parse( await DataBase.consultarCuponesUsados(id_cupon_selected, form_id_cliente))
             console.log(usado)
             if (usado != null) {
               let cupun_sU = {'msg':'USADO'}
               console.log('usado')
               return res.send(cupun_sU);
             }
             const usar=  await DataBase.UpdateUsedCupon(id_cupon_selected, cantidad_act)
             console.log(usar)
  DataBase.CuponUsado(form_id_cliente, id_cupon_selected, fecha_selected).then((resultadoaqui) => {
              
                return res.send({msg: resultadoaqui});
              })
          .catch((err) => {
            console.log(err)
            return res.status(500).send("Error actualizando" + err);
          })
};

//INTRO CUPONERA
exports.introCup = (req, res) => {
  const { error } = res.locals.messages;
  let crea=false, msg=false
  if (req.params.crea) {
    crea = true
  }
  if (req.params.registrado) {
    msg="Se ha registrado con éxito, ingrese el télefono registrado, para ingresar a la cuponera"
  }
  if (req.params.msg) {
    msg=req.params.msg
  }
  res.render("PYT-4/intro_cuponera", {
    pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      login:true,crea,msg,
    error,
  });
};
exports.sessionCuponera = (req, res) => {
 console.log(req.body)
  passport.authenticate("cuponera",  function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    console.log(err)
    console.log(info)
    if (!user) {
      console.log("no existe usuario")
      return res.redirect("/intro_cuponera/crea");
    }
    req.logIn(user, async function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }
      console.log(user.dataValues.cuponera)
if (user.dataValues.cuponera == '' || user.dataValues.cuponera == "c/a") {
  return res.redirect('/cuponera')
}else{
  let msg="Por favor espere a que le sea dado el acceso por el área de administración, si tiene alguna duda puede contactarnos para más información"
  return res.redirect('/log_cupon/'+msg)
}
      
    });
  })(req, res);
};
exports.introCupValidate = (req, res) => {
  let msg = false, cupon=true, cat_salud=false,cat_belleza=false,cat_fitness=false,cat_comida=false,cat_otros=false;

  if (req.params.msg) {
    msg = req.params.msg;
  }
  if (req.params.cat) {
    cupon =false
    switch (req.params.cat) {
      case 'salud':
        cat_salud =true
        break;
        case 'belleza':
          cat_belleza =true
          break;
          case 'fitness':
            cat_fitness =true
            break;
            case 'comida':
              cat_comida =true
              break;
              case 'otros':
                cat_otros =true
                break;
      default:
        break;
    }
  }
  let cliente = res.locals.user
  let salud = [], belleza = [], fitness=[],comida=[], otros =[]

  //DATA-COMUNES
 DataBase.totalcupones().then(async(total_cupones) => {
    let cupones_act = JSON.parse(total_cupones);
    var usado
    for (let i = 0; i < cupones_act.length; i++) {
      usado = JSON.parse( await DataBase.consultarCuponesUsados(cupones_act[i].id,cliente.id ))
      console.log('usado')
      let hoy = moment()
            let fecha_final= ""              
              fecha_final= moment(hoy).isAfter(cupones_act[i].fecha_final); // true
              console.log(fecha_final)
  //  if (usado == null) {
      if (fecha_final == false) {
               switch (cupones_act[i].categoria) {
      case 'Belleza':
        belleza.push(cupones_act[i])
        break;
        case 'Fitness':
          fitness.push(cupones_act[i])
          break;
          case 'Salud':
            salud.push(cupones_act[i])
        break;
        case 'Comida':
          comida.push(cupones_act[i])
        break;
        case 'Otros':
          otros.push(cupones_act[i])
        break;
      default:
        break;
      }
      }

   // }  
  }
    res.render("PYT-4/cuponera", {
      pageName: "Cuponera",
      cupones_act,total_cupones,
      msg,
      dashboardPage: true,
      dashboard: true,
      py4:true,
      cliente,
      salud, belleza, fitness, comida,  otros,  py4:true,
  dash:true,cupon,cat_belleza,  cat_salud,  cat_fitness,  cat_comida,  cat_otros,disabled_chofer: true
    });

}).catch((err) => {
  console.log(err);
});
};


//NOTIFICACIONES
exports.notificaciones_table = (req, res) => {
  console.log(req.session.sucursal_select)
  //Push.create('Hello World!')
  let msg = false;
  let admin = false
  if (req.session.tipo == "Director") {
    admin = true
  }
  if (req.params.msg) {
    msg = req.params.msg;
  }
  if (req.params.day) {
    
    dia =moment(req.params.day, 'YYYY-DD-MM').format('YYYY-MM-DD');
  }else{
    dia = new Date()
  }
 let id_sucursal = req.session.sucursal_select
 console.log(req.session.tipo)
  //DATA-COMUNES
  let ClientesDB = "", PedidosDB="", ChoferesDB="", obtenernotificaciones="",PrestadosGroupByCliente=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
    PedidosDB=DataBase.PedidosAll
    ChoferesDB=DataBase.ChoferesAll
    obtenernotificaciones=DataBase.obtenernotificaciones
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
    PedidosDB=DataBase.PedidosAllS
    ChoferesDB=DataBase.ChoferesAllS
obtenernotificaciones=DataBase.obtenernotificaciones
      break;
  }
  DataBase.CodigosP().then((cp_)=>{
    let cp_arr = JSON.parse(cp_)
  ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     PedidosDB(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
obtenernotificaciones().then((notif_)=>{
  let notifi_g = JSON.parse(notif_)
       ChoferesDB(id_sucursal).then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
        DataBase.Sucursales_ALl().then((sucursales_)=>{
          let sucursales_let = JSON.parse(sucursales_)
                   DataBase.Etiquetas(id_sucursal).then((etiquetas_)=>{
                    let etiquetas_let = JSON.parse(etiquetas_)
                    console.log(notifi_g)
    res.render("PYT-4/notificaciones", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      notificaciones:true,
      admin,
      clientes_d,
      clientes_arr,
      pedidos_,
      pedidos_let,
      choferes_,sucursales_let,
      cp_,notifi_g,etiquetas_let,
      msg,notif_
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
exports.save_cliente_edit_cupon = (req, res) => {
    
  const {id, actual} = req.body
  let msg = false;
console.log(req.body)
  DataBase.update_cliente_cuponAct(id,actual).then(async (respuesta) =>{
 
        let notif_ = JSON.parse(await DataBase.obtenernotificaciones())
         return res.send({notif_})
  
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/errorpy4/" + msg);
    });
}

//seguimiento
exports.seguimiento_table = (req, res) => {
  console.log(req.session.sucursal_select)
  let msg = false;
  let admin = false
  if (req.session.tipo == "Director") {
    admin = true
  }
  if (req.params.msg) {
    msg = req.params.msg;
  }
  if (req.params.day) {
    
    dia =moment(req.params.day, 'YYYY-DD-MM').format('YYYY-MM-DD');
  }else{
    dia = new Date()
  }
 let id_sucursal = req.session.sucursal_select
 console.log(req.session.tipo)
  //DATA-COMUNES
  let ClientesDB = "", PedidosDB="", ChoferesDB="", obtenernotificaciones="", LastPedidosAll=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.ClientesAll
    PedidosDB=DataBase.PedidosAll
    ChoferesDB=DataBase.ChoferesAll
    obtenernotificaciones=DataBase.obtenernotificaciones 
    LastPedidosAll=DataBase.LastPedidosAll
      break;
  
    default:
       ClientesDB=DataBase.ClientesAllS
    PedidosDB=DataBase.PedidosAllS
    ChoferesDB=DataBase.ChoferesAllS
obtenernotificaciones=DataBase.obtenernotificaciones 
LastPedidosAll=DataBase.LastPedidosAllS
      break;
  }
  DataBase.CodigosP().then((cp_)=>{
    let cp_arr = JSON.parse(cp_)
  ClientesDB(id_sucursal).then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     PedidosDB(id_sucursal).then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
      LastPedidosAll(id_sucursal).then((pedidos_g)=>{
        let pedidos_letG = JSON.parse(pedidos_g)
         let notif1_2=[], notif3_5=[], notif6_12=[], notificacion_g =[]
         let hoy = moment()
        var duration=""
      for (let i = 0; i < pedidos_letG.length; i++) {
      if (pedidos_letG[i].status_pedido == "Entregado") {
        if (pedidos_letG[i].total_garrafones_pedido <= 2) {
          let dia_pedido  = moment(pedidos_letG[i].createdAt)
          duration = hoy.diff(dia_pedido, 'days');
            if (duration >=10 && duration < 20) {
              
              notif1_2.push({id_pedido: pedidos_letG[i].id, total_g: pedidos_letG[i].total_garrafones_pedido,id_cliente:pedidos_letG[i].clienteId,nombre_cliente: pedidos_letG[i].cliente.firstName,apellido_cliente: pedidos_letG[i].cliente.lastName,fecha_:pedidos_letG[i].createdAt, tiempo_desde: duration, asentamiento:pedidos_letG[i].cliente.cp.asentamiento})
            }     
          }
          if (pedidos_letG[i].total_garrafones_pedido >=3 && pedidos_letG[i].total_garrafones_pedido <=5) {
            let dia_pedido  = moment(pedidos_letG[i].createdAt)
            duration = hoy.diff(dia_pedido, 'days');
              if (duration >=20 && duration < 30) {
       
                notif3_5.push({id_pedido: pedidos_letG[i].id, total_g: pedidos_letG[i].total_garrafones_pedido,id_cliente:pedidos_letG[i].clienteId,nombre_cliente: pedidos_letG[i].cliente.firstName,apellido_cliente: pedidos_letG[i].cliente.lastName,fecha_:pedidos_letG[i].createdAt, tiempo_desde: duration,asentamiento:pedidos_letG[i].cliente.cp.asentamiento})
              }     
            }
            if (pedidos_letG[i].total_garrafones_pedido >=6 && pedidos_letG[i].total_garrafones_pedido <=12) {
              let dia_pedido  = moment(pedidos_letG[i].createdAt)
              duration = hoy.diff(dia_pedido, 'days');
                if (duration >=30) {
      
                  notif6_12.push({id_pedido: pedidos_letG[i].id, total_g: pedidos_letG[i].total_garrafones_pedido,id_cliente:pedidos_letG[i].clienteId,nombre_cliente: pedidos_letG[i].cliente.firstName,apellido_cliente: pedidos_letG[i].cliente.lastName,fecha_:pedidos_letG[i].createdAt, tiempo_desde: duration,asentamiento:pedidos_letG[i].cliente.cp.asentamiento})
                }     
              }
        }
        }
      let cont_not = parseInt(notif1_2.length) + parseInt(notif3_5.length)+ parseInt(notif6_12.length)
notificacion_g.push({notif1_2: notif1_2, notif3_5:notif3_5,notif6_12:notif6_12})
       ChoferesDB(id_sucursal).then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
        DataBase.Sucursales_ALl().then((sucursales_)=>{
          let sucursales_let = JSON.parse(sucursales_)
                   DataBase.Etiquetas(id_sucursal).then((etiquetas_)=>{
                    let etiquetas_let = JSON.parse(etiquetas_)
                    
console.log(notif1_2)
console.log(notif3_5)
console.log(notificacion_g)
notif1_2 = JSON.stringify(notif1_2)
notif3_5 = JSON.stringify(notif3_5)
notif6_12  = JSON.stringify(notif6_12)
notificacion_g = JSON.stringify(notificacion_g)
    res.render("PYT-4/seguimiento", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      seguimiento:true,
      admin,
      clientes_d,
      clientes_arr,
      pedidos_,
      pedidos_let,
      choferes_,sucursales_let,
      cp_,etiquetas_let,
      msg,notificacion_g,notif1_2,
      notif3_5,
      notif6_12
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