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
      PedidosDB=DataBase.PedidosMaquila
      break;
  
    default:
    ClientesDB=DataBase.Todos_cliente_maquila
      PedidosDB=DataBase.PedidosMaquila
      break;
  }
  //DATA-COMUNES
 var clientes_maquila = JSON.parse(await ClientesDB(id_sucursal))
 var pedidos_maquila = JSON.parse(await PedidosDB(id_sucursal))
console.log(pedidos_maquila)
let clientes_maquila_st = JSON.stringify(clientes_maquila)
let pedidos_maquila_st = JSON.stringify(pedidos_maquila)
     res.render("PYT-4/maquila", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      admin,
      maquila:true,
      clientes_maquila,
      clientes_maquila_st,
      msg,pedidos_maquila,
      pedidos_maquila_st

    })
   
};

exports.save_clientes_maquila = async(req, res) => {
  
  var {name, telefono, vehiculo, placa,email} = req.body
  let msg = false;
const revisa_cliente_maquila = JSON.parse(await DataBase.BuscaClienteMaquilaRepeat(telefono, placa))
console.log('revisa_cliente_maquila')
console.log(revisa_cliente_maquila)
 if (revisa_cliente_maquila != null) {
   msg ="Ya éxiste el cliente: "+revisa_cliente_maquila.name+", con los datos indicados"
 return res.send({msg})
   
 }

 var save_cliente_maquila = JSON.parse(await DataBase.Reg_cliente_maquila(name, telefono,  placa,vehiculo).then((response)=>{return response}))
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
exports.delete_cliente_maquila = async (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  // let cliente_pedido = await DataBase.SearchClientePedido(id_)
  // console.log(cliente_pedido)
  
  DataBase.Delete_cliente_maquila(id_).then(async(respuesta) =>{
  let id_sucursal = req.session.sucursal_select
  let ClientesDB = ""
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

   })   
 };
 exports.edit_cliente_manila = (req, res) => {
  const user = res.locals.user;
  let id_ = req.body.id
  let id_sucursal = req.session.sucursal_select
  //DATA-COMUNES
DataBase.Cliente_maquila_byID(id_).then((cliente)=>{
  let cliente_let = JSON.parse(cliente)

  res.send({cliente_let})

  }).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
 };
 exports.save_cliente_edit = async (req, res) => {
  var {name, telefono, vehiculo, placa,email,id_cliente} = req.body
  let msg = false;
 var save_cliente_maquila = JSON.parse(await DataBase.Edit_cliente_maquila(name, telefono,  placa,vehiculo,id_cliente).then((response)=>{return response}))
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

exports.save_pedido_maquila = async(req, res) => {
  console.log(req.body)
  var {id_cliente, name, telefono,vehiculo, placa,fecha_pedido,relleno_cant_garrafon,relleno_garrafon_mont,  bwaters_cant_garrafon,  bwaters_garrafon_mont, total_total_inp,  metodo_pago, status_pago, status_pedido, observacion} = req.body
  let msg = false;
// const revisa_cliente_maquila = JSON.parse(await DataBase.BuscaClienteMaquilaRepeat(telefono, placa))
// console.log('revisa_cliente_maquila')
// console.log(revisa_cliente_maquila)
//  if (revisa_cliente_maquila != null) {
//    msg ="Ya éxiste el cliente: "+revisa_cliente_maquila.name+", con los datos indicados"
//  return res.send({msg})
   
//  }
let total_garrafones_pedido= parseInt(relleno_cant_garrafon)+parseInt(bwaters_cant_garrafon)
 var save_pedido_maquila = JSON.parse(await DataBase.Reg_pedido_maquila(total_total_inp, fecha_pedido,  metodo_pago,status_pago, status_pedido, observacion,relleno_cant_garrafon, bwaters_cant_garrafon,total_garrafones_pedido,relleno_garrafon_mont,  bwaters_garrafon_mont,id_cliente).then((response)=>{return response}))
 console.log(save_pedido_maquila)
 let id_sucursal = req.session.sucursal_select
 let ClientesDB = "", PedidosDB=""
 switch (req.session.tipo) {
   case "Director":
     ClientesDB=DataBase.Todos_cliente_maquila
  PedidosDB=DataBase.PedidosMaquila
     break; 
   default:
   ClientesDB=DataBase.Todos_cliente_maquila
  PedidosDB=DataBase.PedidosMaquila
     break;
 }
 //var clientes_maquila = JSON.parse(await ClientesDB(id_sucursal))
 var pedidos_maquila = JSON.parse(await PedidosDB(id_sucursal))
let pedidos_maquila_st = JSON.stringify(pedidos_maquila)
 return res.send({pedidos_maquila_st})
}