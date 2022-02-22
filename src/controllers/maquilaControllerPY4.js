const fs = require("fs");
const path = require("path");
const DataBase = require("../models/PYT4/data")
const passport = require("passport");
var moment = require('moment-timezone');

/** MAQUILA **/
exports.maquila_principal = async (req, res) => {
  let msg = false;
  let id_cliente_qr = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  if (req.params.id_cliente) {
    id_cliente_qr = req.params.id_cliente;
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
      PedidosDBByDay=DataBase.PedidosMaquilaByDay
      SumRellenosPedidos=DataBase.SumRellenosPedidos
      break;
  
    default:
    ClientesDB=DataBase.Todos_cliente_maquila
      PedidosDB=DataBase.PedidosMaquila
      break;
  }
  //DATA-COMUNES
  let dia = moment().format('YYYY-MM-DD')
 var clientes_maquila = JSON.parse(await ClientesDB(id_sucursal))
 var pedidos_maquila = JSON.parse(await PedidosDB(id_sucursal))
 var pedidos_maquilaByDay = JSON.parse(await PedidosDBByDay(dia))
console.log(pedidos_maquila)
let clientes_maquila_st = JSON.stringify(clientes_maquila)
let pedidos_maquila_st = JSON.stringify(pedidos_maquila)


let ventas_del_dia = pedidos_maquilaByDay.length
let rellenos=0, bwaters=0, ingresos=0

for (let i = 0; i < pedidos_maquilaByDay.length; i++) {  
  rellenos +=  parseInt(pedidos_maquilaByDay[i]['rellenos'])
  bwaters +=  parseInt(pedidos_maquilaByDay[i]['bwater'])
  ingresos +=  parseFloat(pedidos_maquilaByDay[i]['monto_total'])
}
console.log('------')
var notif_maquila_relleno=[],notif_maquila_bwater=[]
var suma_rellenos_bwaters = JSON.parse(await SumRellenosPedidos(id_sucursal))

console.log(suma_rellenos_bwaters)
var json
for (let i = 0; i < suma_rellenos_bwaters.length; i++) {
  json=suma_rellenos_bwaters[i]
  for (let j = 0; j < clientes_maquila.length; j++) {
    if (suma_rellenos_bwaters[i]['clientesMaquilaId'] ==clientes_maquila[i]['id'] ) {
      json.nombre = clientes_maquila[i]['name'];
    }    
  }
  if (( suma_rellenos_bwaters[i]['total_rellenos'] % 1000 ) == 0 || suma_rellenos_bwaters[i]['total_rellenos'] >1000) {
    notif_maquila_relleno.push(suma_rellenos_bwaters[i])
  }
  if (( suma_rellenos_bwaters[i]['total_bwaters'] % 500 ) == 0 || suma_rellenos_bwaters[i]['total_bwaters'] >500) {
    notif_maquila_bwater.push(suma_rellenos_bwaters[i])
  }
}
let cont_not = parseInt(notif_maquila_relleno.length) + parseInt(notif_maquila_bwater.length)
console.log(notif_maquila_relleno)
console.log(notif_maquila_bwater)

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
      pedidos_maquila_st,ventas_del_dia,rellenos,
      bwaters,
      ingresos,id_cliente_qr,notif_maquila_relleno,notif_maquila_bwater,cont_not
          })
   
};

/**CLIENTES MAQUILA */
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
};/**FIN CLIENTES MAQUILA */

/**PEDIDO MAQUILA */
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

let revisa_bwater_relleno = JSON.parse(await DataBase.PedidosMaquilaByIDClientCountRB(id_cliente))
console.log(revisa_bwater_relleno)
 return res.send({pedidos_maquila_st,revisa_bwater_relleno})
};
exports.editar_pedido_maquila = (req, res) => {
  const user = res.locals.user;
  let id_ = req.body.id
  let id_sucursal = req.session.sucursal_select
  //DATA-COMUNES
DataBase.PedidosMaquilaByID(id_).then((pedido_maquila)=>{
  let pedido_maquila_let = JSON.parse(pedido_maquila)

  res.send({pedido_maquila_let})

  }).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
 };
 exports.delete_pedido_maquila = async (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  // let cliente_pedido = await DataBase.SearchClientePedido(id_)
  // console.log(cliente_pedido)
  
  DataBase.Delete_Pedido_maquila(id_).then(async(respuesta) =>{
  let id_sucursal = req.session.sucursal_select
  let ClientesDB = ""
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
  var pedidos_maquila = JSON.parse(await PedidosDB(id_sucursal))
  let pedidos_maquila_st = JSON.stringify(pedidos_maquila)
   return res.send({pedidos_maquila_st})

   })   
 };
 exports.save_pedido_edit = async (req, res) => {
  var {id_cliente, name, telefono,vehiculo, placa,fecha_pedido,relleno_cant_garrafon,relleno_garrafon_mont,  bwaters_cant_garrafon,  bwaters_garrafon_mont, total_total_inp,  metodo_pago, status_pago, status_pedido, observacion, id_pedido} = req.body
  let msg = false;
 
 let total_garrafones_pedido= parseInt(relleno_cant_garrafon)+parseInt(bwaters_cant_garrafon)
 var save_pedido_maquila = JSON.parse(await DataBase.Edit_pedido_maquila(total_total_inp, fecha_pedido,  metodo_pago,status_pago, status_pedido, observacion,relleno_cant_garrafon, bwaters_cant_garrafon,total_garrafones_pedido,relleno_garrafon_mont,  bwaters_garrafon_mont,id_cliente,id_pedido).then((response)=>{return response}))
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
};/**FIN PEDIDOS MAQUILA */

/**VENTAS DEL DIA */
exports.ventas_del_dia = async (req, res) => {
  let msg = false;
  let dia = req.params.dia_select

  let id_sucursal = req.session.sucursal_select
  let ClientesDB = "", PedidosDB=""
  switch (req.session.tipo) {
    case "Director":
      ClientesDB=DataBase.Todos_cliente_maquila
      PedidosMaquilaByDay=DataBase.PedidosMaquilaByDay
      break;
  
    default:
    ClientesDB=DataBase.Todos_cliente_maquila
    PedidosMaquilaByDay=DataBase.PedidosMaquilaByDay
      break;
  }
  console.log(dia)
  dia = moment(dia).format('YYYY-MM-DD')

  //DATA-COMUNES
 var pedidos_maquila = JSON.parse(await PedidosMaquilaByDay(dia))
console.log(pedidos_maquila)

let ventas_del_dia = pedidos_maquila.length
let rellenos=0, bwaters=0, ingresos=0
for (let i = 0; i < pedidos_maquila.length; i++) {  
  rellenos +=  parseInt(pedidos_maquila[i]['rellenos'])
  bwaters +=  parseInt(pedidos_maquila[i]['bwater'])
  ingresos +=  parseFloat(pedidos_maquila[i]['monto_total'])
}
console.log('------')
   return res.send({ventas_del_dia:ventas_del_dia,rellenos:rellenos,bwaters:bwaters,ingresos:ingresos })
};

/**NOTIFICACIONES AJAX */
exports.notificaciones_ajax = async (req, res) => {

  var notif_maquila_relleno=[],notif_maquila_bwater=[]
  var suma_rellenos_bwaters = JSON.parse(await SumRellenosPedidos())
  
  console.log(suma_rellenos_bwaters)
  var json
  for (let i = 0; i < suma_rellenos_bwaters.length; i++) {
    json=suma_rellenos_bwaters[i]
    for (let j = 0; j < clientes_maquila.length; j++) {
      if (suma_rellenos_bwaters[i]['clientesMaquilaId'] ==clientes_maquila[i]['id'] ) {
        json.nombre = clientes_maquila[i]['name'];
      }    
    }
    if (( suma_rellenos_bwaters[i]['total_rellenos'] % 1000 ) == 0 ) {
      notif_maquila_relleno.push(suma_rellenos_bwaters[i])
    }
    if (( suma_rellenos_bwaters[i]['total_bwaters'] % 500 ) == 0 ) {
      notif_maquila_bwater.push(suma_rellenos_bwaters[i])
    }
  }
  let cont_not = parseInt(notif_maquila_relleno.length) + parseInt(notif_maquila_bwater.length)
  console.log(notif_maquila_relleno)
  console.log(notif_maquila_bwater)
  
console.log('------')
   return res.send({notif_maquila_relleno,notif_maquila_bwater,cont_not:cont_not})
};

