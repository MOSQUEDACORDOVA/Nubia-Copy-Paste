const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../models/PYT4/data")
const passport = require("passport");
//const {getStreamUrls} = require('mixcloud-audio')

exports.dashboard = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
    // console.log(clientes_arr)
     DataBase.PedidosAll().then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
      // console.log(pedidos_let)
    res.render("PYT-4/home", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      dash:true,
      clientes_d,
      clientes_arr,
      pedidos_,
      pedidos_let
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

exports.login = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
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
  if (req.query.msg) {
    msg = req.query.msg;
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
  if (req.query.msg) {
    msg = req.query.msg;
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
  if (req.query.msg) {
    msg = req.query.msg;
  }
  let proyecto = "PYT-4"
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     res.render("PYT-4/usersTable", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      users1:true,
      clientes_d,
      count,
      msg
    })
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
  console.log(req.body)
  const user = res.locals.user
  const { id_cliente, firstName, lastName,  ciudad, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, productos, monto_total, status_pago,   status_pedido, garrafones_prestamos, observacion} = req.body

  DataBase.PedidosReg(id_cliente, firstName, lastName,  ciudad, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, productos, monto_total, status_pago,   status_pedido, garrafones_prestamos, observacion, user.id).then((respuesta) =>{
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
res.render("PYT-4/edit_pedido", {
  pageName: "Bwater",
  dashboardPage: true,
  dashboard: true,
  py4:true,
  dash:true,
  pedidos_,
  pedido_let
}) 
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
 };

 exports.Save_editPedidoPy4 = (req, res) => {
  console.log(req.body)
  const user = res.locals.user
  const {id_pedido, id_cliente, firstName, lastName,  ciudad, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, productos, monto_total, status_pago,   status_pedido, garrafones_prestamos, observacion} = req.body

  DataBase.PedidosUpd(id_pedido,id_cliente, firstName, lastName,  ciudad, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, productos, monto_total, status_pago,   status_pedido, garrafones_prestamos, observacion, user.id).then((respuesta) =>{
    console.log(respuesta)
    res.redirect('/homepy4/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};