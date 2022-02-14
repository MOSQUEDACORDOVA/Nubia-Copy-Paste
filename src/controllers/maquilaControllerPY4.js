const fs = require("fs");
const path = require("path");
const DataBase = require("../models/PYT4/data")
const passport = require("passport");
var moment = require('moment-timezone');

/** MAQUILA **/
exports.maquila_principal = async (req, res) => {
  let msg = false;

  if (req.params.msg) {
    msg = req.params.msg;
  }
  let admin = false
  if (req.session.tipo == "Director") {
    admin = true
  }
  let id_sucursal = req.session.sucursal_select
  let ClientesDB = "", PedidosDB=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.Todos_cliente_maquila
   // PedidosDB=DataBase.PedidosAll
      break;
  
    default:
    ClientesDB=DataBase.Todos_cliente_maquila
   // PedidosDB=DataBase.PedidosAllS
      break;
  }
  //DATA-COMUNES
 var clientes_maquila = JSON.parse(await ClientesDB(id_sucursal))
 //var pedidos_maquila = JSON.parse(await PedidosDB(id_sucursal))
let clientes_maquila_st = JSON.stringify(clientes_maquila)
     res.render("PYT-4/maquila", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      admin,
      maquila:true,
      clientes_maquila,
      clientes_maquila_st,
      msg,
    })
   
};

exports.save_clientes_maquila = async(req, res) => {
  
  var {name, telefono, vehiculo, placa,email} = req.body
  let msg = false;
//const revisa_cliente = JSON.parse(await DataBase.SearchClientePedido(name, telefono, vehiculo, placa))
console.log('revisa_cliente')
//console.log(revisa_cliente)
// if (revisa_cliente != null) {
//   msg ="Ya éxiste el cliente: "+revisa_cliente.firstName+" "+revisa_cliente.lastName+", con los datos indicados"
//   res.redirect('/homepy4/'+msg)
//   return
// }

 var save_cliente_maquila = JSON.parse(await DataBase.Reg_cliente_maquila(name, telefono, vehiculo, placa).then((response)=>{return response}))
 console.log(save_cliente_maquila)
 let id_sucursal = req.session.sucursal_select
 let ClientesDB = "", PedidosDB=""
 switch (req.session.tipo) {
   case "Director":
     ClientesDB=DataBase.Todos_cliente_maquila
  // PedidosDB=DataBase.PedidosAll
     break; 
   default:
   ClientesDB=DataBase.Todos_cliente_maquila
  // PedidosDB=DataBase.PedidosAllS
     break;
 }
 var clientes_maquila = JSON.parse(await ClientesDB(id_sucursal))
 //var pedidos_maquila = JSON.parse(await PedidosDB(id_sucursal))
let clientes_maquila_st = JSON.stringify(clientes_maquila)
 return res.send({clientes_maquila_st})
}
exports.delete_cliente = async (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  // let cliente_pedido = await DataBase.SearchClientePedido(id_)
  // console.log(cliente_pedido)
  
  DataBase.Delete_Cliente(id_).then((respuesta) =>{
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
  ClientesDB(id_sucursal).then(async (response_clientes)=>{
      let clientes_arr = JSON.parse(response_clientes)
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
  ClientesDB(id_sucursal).then(async (response_clientes)=>{
      let clientes_arr = JSON.parse(response_clientes)
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