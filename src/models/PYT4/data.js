const { Op, where } = require("sequelize");
const db = require("../../config/db");
const bcrypt = require("bcrypt-nodejs");
const Usuarios = require("../../models/PYT4/Usuarios");
const Clientes = require("../../models/PYT4/Clientes");
const Pedidos = require("../../models/PYT4/Pedidos");
const Personal = require("../../models/PYT4/Personal");
const Vehiculos = require("../../models/PYT4/Vehiculos");
const GPrestados = require("../../models/PYT4/GPrestados");
const CoP = require("../../models/PYT4/CP");
const Sucursales = require("../../models/PYT4/Sucursales");
const Carga_init = require("../../models/PYT4/Carga_init");
const Last_p = require("../../models/PYT4/Last_pedido");
const Etiquetas = require("../../models/PYT4/Etiquetas");
const Cupones = require("../../models/PYT4/Cupones");
const Used_cupons = require("../../models/PYT4/Used_cupons");
const Notificaciones = require("../../models/PYT4/Notificaciones");
const Asig_chofer = require("../../models/PYT4/Asig_chofer");
const Recargas = require("../../models/PYT4/Recargas");
var moment = require('moment-timezone');

module.exports = {
  //USUARIO
  RegUser(tipo, nombre, email, password, zona) {
    return new Promise((resolve, reject) => {
      Usuarios.create(
        {
         name: nombre, tipo: tipo, email: email, password: password, sucursaleId:zona})
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  UsuariobyId(id){
    return new Promise((resolve, reject) => {
      Usuarios.findOne({
        where: {
          id: id,
        },
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  UsuariobyAll(){
    return new Promise((resolve, reject) => {
      Usuarios.findAll({order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["updatedAt", "DESC"],
      ],
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  UsuarioDelete(id){
    return new Promise((resolve, reject) => {
      Usuarios.destroy({where: {
        id: id,
      },
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  
  login(email, password){
    return new Promise((resolve, reject) => {
      Usuarios.findAll({
        where: {
          email: email,
        },
      })
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });

  },
  actualizarUser(userid, name, email, tipo, zona) {
    return new Promise((resolve, reject) => {
      Usuarios.update(
        {
          name:name, email: email, tipo:tipo, sucursaleId: zona
        },
        {
          where: {
            id: userid,
          },
        }
      )
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
          //console.log(planes);
        })
        .catch((err) => {
          console.log(err);
          reject(err)
        });
    });
  },
  Gerentes(){
    return new Promise((resolve, reject) => {
      Usuarios.findAll({
        where: {
          tipo: {
            [Op.or]: ['Director', 'Gerente de Sucursal']
          }
        },
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  actualizarpassW(id, password) {
    //Actualizar clave
  password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    ////console.log(password);
    return new Promise((resolve, reject) => {

      Usuarios.update(
        {
          password:password
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
          //console.log(planes);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //CLIENTE
  registrar_cliente(firstName,cp,asentamiento,lastName,ciudad,municipio,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,sucursal, email,color) {
    return new Promise((resolve, reject) => {
      Clientes.findOrCreate({
        where: { ciudad: ciudad,municipio:municipio,fraccionamiento: asentamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,telefono:telefono, },
        defaults: {
          firstName: firstName,lastName: lastName,ciudad: ciudad,municipio:municipio,fraccionamiento: asentamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono, nombre_familiar_1:nombre_familiar_1,  apellido_familiar_1:apellido_familiar_1,       telefono_familiar_1:telefono_familiar_1,  nombre_familiar_2:nombre_familiar_2,  apellido_familiar_2:apellido_familiar_2,       telefono_familiar_2:telefono_familiar_2,tipo:tipo_cliente, fecha_ultimo_pedido: fecha_ultimo_pedido,   utimos_botellones: utimos_botellones,  email:email , nuevo:cliente_nuevo ,sucursaleId: sucursal,estado:cp, cpId: asentamiento, etiquetaId: color
        }
      }).then((data)=>{
        let data_set = JSON.stringify(data);
        console.log(data_set);
        resolve('Cliente registrado con éxito');
        
      })
      .catch((err) => {
        reject(err)
      });
    /*  Clientes.create(
        {
          firstName: firstName,lastName: lastName,ciudad: ciudad,municipio:municipio,fraccionamiento: asentamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono, nombre_familiar_1:nombre_familiar_1,  apellido_familiar_1:apellido_familiar_1,       telefono_familiar_1:telefono_familiar_1,  nombre_familiar_2:nombre_familiar_2,  apellido_familiar_2:apellido_familiar_2,       telefono_familiar_2:telefono_familiar_2,tipo:tipo_cliente, fecha_ultimo_pedido: fecha_ultimo_pedido,   utimos_botellones: utimos_botellones,  email:email , nuevo:cliente_nuevo ,sucursaleId: sucursal,estado:cp, cpId: asentamiento})
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve('Cliente registrado con éxito');
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });*/
    });
  },

  registrar_clienteCuponera(firstName,cp,asentamiento,lastName,ciudad,municipio,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, tipo_cliente, sucursal, email,color) {
    return new Promise((resolve, reject) => {
      Clientes.findOne({
        where: { ciudad: ciudad,municipio:municipio,fraccionamiento: asentamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,telefono:telefono, }
      }).then((data)=>{

        if (!data) {
          Clientes.create({firstName: firstName,lastName: lastName,ciudad: ciudad,municipio:municipio,fraccionamiento: asentamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono, tipo:tipo_cliente,  email:email , estado:cp, cpId: asentamiento, cuponera:"s/a"}).then((data_cliente)=>{
          let data_set = JSON.stringify(data);
        console.log(data_set);
        resolve(data_set);

          })
          
        }else{
          console.log('ya existe esa dirección')
          resolve('0');
        }
        
        
      })
      .catch((err) => {
        reject(err)
      });
    /*  Clientes.create(
        {
          firstName: firstName,lastName: lastName,ciudad: ciudad,municipio:municipio,fraccionamiento: asentamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono, nombre_familiar_1:nombre_familiar_1,  apellido_familiar_1:apellido_familiar_1,       telefono_familiar_1:telefono_familiar_1,  nombre_familiar_2:nombre_familiar_2,  apellido_familiar_2:apellido_familiar_2,       telefono_familiar_2:telefono_familiar_2,tipo:tipo_cliente, fecha_ultimo_pedido: fecha_ultimo_pedido,   utimos_botellones: utimos_botellones,  email:email , nuevo:cliente_nuevo ,sucursaleId: sucursal,estado:cp, cpId: asentamiento})
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve('Cliente registrado con éxito');
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });*/
    });
  },

  update_cliente(id_cliente,cp,asentamiento,firstName,lastName,ciudad,municipio,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,sucursal, email, color) {
    return new Promise((resolve, reject) => {
      Clientes.update(
        {
          firstName: firstName,lastName: lastName,ciudad: ciudad,municipio: municipio, fraccionamiento: asentamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono, nombre_familiar_1:nombre_familiar_1,  apellido_familiar_1:apellido_familiar_1,       telefono_familiar_1:telefono_familiar_1,  nombre_familiar_2:nombre_familiar_2,  apellido_familiar_2:apellido_familiar_2,       telefono_familiar_2:telefono_familiar_2,tipo:tipo_cliente, fecha_ultimo_pedido: fecha_ultimo_pedido,   utimos_botellones: utimos_botellones,  email:email , nuevo:cliente_nuevo ,sucursaleId: sucursal,estado:cp, cpId: asentamiento, etiquetaId:color},{
            where:
            {
              id: id_cliente
            }
          })
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve('Cliente actualizado con éxito');
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  update_cliente_cuponAct(id,actual) {
    return new Promise((resolve, reject) => {
      Clientes.update(
        {
          cuponera:actual},{
            where:
            {
              id: id
            }
          })
        .then((data) => {
          let data_set = JSON.stringify(data);
          Notificaciones.update({estado:'1'}, {where:{clienteId:id}})
          resolve(data_set);
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  update_cliente_tag(id,color) {
    return new Promise((resolve, reject) => {
      Clientes.update(
        {
          etiquetaId:color},{
            where:
            {
              id: id
            }
          })
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  actualizarZonaCliente(id,id_sucursal) {
    return new Promise((resolve, reject) => {
      Clientes.update(
        {
          sucursaleId:id_sucursal},{
            where:
            {
              id: id
            }
          })
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  ClientesAll(){
    return new Promise((resolve, reject) => {
      Clientes.findAll({include:[
        {association:Clientes.CoP },
        {association:Clientes.Etiquetas },
      ],order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["updatedAt", "DESC"],
      ],
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  ClientesAllS(id){
    return new Promise((resolve, reject) => {
      Clientes.findAll({where:{sucursaleId:id},
        include:[
        {association:Clientes.CoP },
        {association:Clientes.Etiquetas },
      ],order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["updatedAt", "DESC"],
      ],
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  
  ClientebyId(id){
    return new Promise((resolve, reject) => {
      Clientes.findOne({where:{
        id: id
      },include:[
        {association:Clientes.CoP },
      ],order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["updatedAt", "DESC"],
      ],
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  SearchClientePedido(firstName,cp,asentamiento,lastName,ciudad,municipio,fraccionamiento,coto,casa, calle, avenida, referencia, telefono){
    return new Promise((resolve, reject) => {
      Clientes.findOne({
        where: { ciudad: ciudad,municipio:municipio,fraccionamiento: asentamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,telefono:telefono, }})
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
              ////console.log(id_usuario);
            })
        .catch((err) => {
          reject(err)
        });
    });
  },
  Delete_Cliente(id){
    return new Promise((resolve, reject) => {
      Pedidos.destroy({where:{
        clienteId: id
      }
      },)
        .then((data) => {
         Clientes .destroy({where:{
            id: id
          }
          },)
            .then((data) => {
              let data_p = JSON.stringify(data);
              //console.log(data)
              resolve('data_p');
              ////console.log(id_usuario);
            })
            .catch((err) => {
              reject(err)
            });
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  ClienteByTlf(id){
    return new Promise((resolve, reject) => {
      Clientes.findOne({where:{
        telefono: id
      },include:[
        {association:Clientes.CoP },
      ],order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["updatedAt", "DESC"],
      ],
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },

   //Pedidos
   PedidosReg(id_cliente, firstName, lastName,  ciudad, municipio,fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago,   status_pago, status_pedido, garrafones_prestamos, observacion,danados,id_chofer, garrafon19L,botella1L, garrafon11L, botella5L, id_usuario, sucursal,deuda_anterior,total_garrafones_pedido,total_refill_cant_pedido, total_canje_cant_pedido, total_nuevo_cant_pedido, total_obsequio_pedido,fecha_pedido) {
    return new Promise(async (resolve, reject) => {
      let garrafon19L_ = JSON.stringify(garrafon19L);
      let botella1L_ = JSON.stringify(botella1L);
      let garrafon11L_ = JSON.stringify(garrafon11L);
      let botella5L_ = JSON.stringify(botella5L);
      if (garrafones_prestamos =="") {
        garrafones_prestamos = 0
      }
      if (danados =="") {
        danados = 0
      }
      const Last = await Last_p.findOne().then((las_)=>{
        return las_
       })
       console.log(Last)
      Pedidos.create(
        {
          chofer: chofer,monto_total: total_total_inp,metodo_pago: metodo_pago,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario,garrafon19L: garrafon19L_, botella1L: botella1L_,garrafon11L: garrafon11L_, botella5L: botella5L_, danados:danados, clienteId: id_cliente,personalId: id_chofer, sucursaleId: sucursal, deuda_anterior:deuda_anterior,total_garrafones_pedido:total_garrafones_pedido,total_refill_pedido:total_refill_cant_pedido,
          total_canje_pedido:total_canje_cant_pedido,
          total_nv_pedido:total_nuevo_cant_pedido,
          total_obsequio_pedido:total_obsequio_pedido,fecha_pedido:fecha_pedido })
        .then(async (data) => {
          let data_set = JSON.stringify(data);
          console.log('pedidos save')
                console.log(data.dataValues.id)
          if (!Last) {
            console.log('pedidos cre')
            Last_p.create({chofer: chofer,monto_total: total_total_inp,metodo_pago: metodo_pago,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario,garrafon19L: garrafon19L_, botella1L: botella1L_,garrafon11L: garrafon11L_, botella5L: botella5L_, danados:danados, clienteId: id_cliente,personalId: id_chofer, sucursaleId: sucursal, deuda_anterior:deuda_anterior,total_garrafones_pedido:total_garrafones_pedido, pedidoId:data.dataValues.id,
              total_refill_pedido:total_refill_cant_pedido,
              total_canje_pedido:total_canje_cant_pedido,
              total_nv_pedido:total_nuevo_cant_pedido,
              total_obsequio_pedido:total_obsequio_pedido,fecha_pedido:fecha_pedido},)
          }else{
            console.log('pedidos upd')
            Last_p.update({chofer: chofer,monto_total: total_total_inp,metodo_pago: metodo_pago,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario,garrafon19L: garrafon19L_, botella1L: botella1L_,garrafon11L: garrafon11L_, botella5L: botella5L_, danados:danados, clienteId: id_cliente,personalId: id_chofer, sucursaleId: sucursal, deuda_anterior:deuda_anterior,total_garrafones_pedido:total_garrafones_pedido, pedidoId:data.dataValues.id,total_refill_pedido:total_refill_cant_pedido,
              total_canje_pedido:total_canje_cant_pedido,
              total_nv_pedido:total_nuevo_cant_pedido,
              total_obsequio_pedido:total_obsequio_pedido,fecha_pedido:fecha_pedido},{where:{clienteId: id_cliente,}})
          }

          Clientes.update(
            {
              firstName: firstName,lastName: lastName,ciudad: ciudad,municipio:municipio, fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono,  },{ where:{
                  id: id_cliente
              }}) .then((data_cli) => {
                resolve("Se creó correctamente el pedido");
                //console.log(planes);
              })          
            .catch((err) => {                      
              reject(err)
            });
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
 PedidosUpd(id_pedido,id_cliente,  chofer, total_total_inp, metodo_pago,   status_pago,   status_pedido, garrafones_prestamos, observacion,danados,id_chofer, garrafon19L,botella1L, garrafon11L, botella5L, id_usuario,sucursal,deuda_anterior,total_garrafones_pedido,total_refill_cant_pedido,total_canje_cant_pedido,total_nuevo_cant_pedido, total_obsequio_pedido,descuento,fecha_pedido) {
    return new Promise((resolve, reject) => {
      let garrafon19L_ = JSON.stringify(garrafon19L);
      let botella1L_ = JSON.stringify(botella1L);
      let garrafon11L_ = JSON.stringify(garrafon11L);
      let botella5L_ = JSON.stringify(botella5L);
      if (garrafones_prestamos =="") {
        garrafones_prestamos = 0
      }
      if (danados =="") {
        danados = 0
      }
      Pedidos.update(
        {
          chofer: chofer,monto_total: total_total_inp,metodo_pago: metodo_pago,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario,garrafon19L: garrafon19L_, botella1L: botella1L_,garrafon11L: garrafon11L_, botella5L: botella5L_,danados:danados, clienteId: id_cliente, personalId: id_chofer,sucursaleId: sucursal,deuda_anterior:deuda_anterior, total_garrafones_pedido:total_garrafones_pedido,total_refill_pedido:total_refill_cant_pedido,
          total_canje_pedido:total_canje_cant_pedido,
          total_nv_pedido:total_nuevo_cant_pedido,
          total_obsequio_pedido:total_obsequio_pedido,descuento:descuento,fecha_pedido:fecha_pedido }, { where:{
            id: id_pedido
        }})
        .then((data) => {
          let data_set = JSON.stringify(data);
          let hoy =moment().format('YYYY-MM-DD')
          Last_p.update({chofer: chofer,monto_total: total_total_inp,metodo_pago: metodo_pago,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario,garrafon19L: garrafon19L_, botella1L: botella1L_,garrafon11L: garrafon11L_, botella5L: botella5L_, danados:danados, clienteId: id_cliente,personalId: id_chofer, sucursaleId: sucursal, deuda_anterior:deuda_anterior,total_garrafones_pedido:total_garrafones_pedido,total_refill_pedido:total_refill_cant_pedido,
            total_canje_pedido:total_canje_cant_pedido,
            total_nv_pedido:total_nuevo_cant_pedido,
            total_obsequio_pedido:total_obsequio_pedido,descuento:descuento,fecha_pedido:fecha_pedido  },{where:{pedidoId:id_pedido}})
            resolve("Se actualizó correctamente el pedido");     

    })
    .catch((err) => {
      console.log(err)
      reject(err)
    })})
  },

  CambiaStatus(id_pedido,status, motivo) {
    return new Promise((resolve, reject) => {
        
      Pedidos.update(
        {
          status_pedido: status, motivo: motivo}, { where:{
            id: id_pedido
        }})
        .then((data) => {
          let data_set = JSON.stringify(data);
          Last_p.update({status_pedido: status},{where:{pedidoId:id_pedido}})
          //console.log(data_set)
          Pedidos.findAll({where: {id: id_pedido}}).then((pedido_) =>{
             console.log(pedido_[0].dataValues.status_pedido)
           if (pedido_[0].dataValues.status_pedido =="Entregado") {
              let hoy =moment(pedido_[0].dataValues.createdAt).format('MM/DD/YYYY')
console.log(hoy)
            GPrestados.findAll({where:{
                     clienteId: pedido_[0].dataValues.clienteId, 
                     personalId: pedido_[0].dataValues.personalId,
                     fecha_ingreso: hoy
                   }}).then((date)=>{
                     console.log(date)
                     if (date =="") {
                       console.log(hoy)
                       GPrestados.create({
                         cantidad: pedido_[0].dataValues.garrafones_prestamos,fecha_ingreso:hoy,clienteId: pedido_[0].dataValues.clienteId, personalId: pedido_[0].dataValues.personalId, status_pedido:pedido_[0].dataValues.status_pedido, sucursaleId: pedido_[0].dataValues.sucursaleId
                       }).then((data_cli) => {
                         resolve("Se creó correctamente el pedido");
                         //console.log(planes);
                       })
                     }
                     GPrestados.update({
                       cantidad: pedido_[0].dataValues.garrafones_prestamos,status_pedido:pedido_[0].dataValues.status_pedido },
                       {where:
                         {cantidad: pedido_[0].dataValues.garrafones_prestamos,fecha_ingreso:hoy,clienteId: pedido_[0].dataValues.clienteId, personalId: pedido_[0].dataValues.personalId, status_pedido:pedido_[0].dataValues.status_pedido, sucursaleId: pedido_[0].dataValues.sucursaleId}
                     }).then((data_upd) => {
                       let data_set2 = JSON.stringify(data_upd)
                       console.log(data_set2);
                       resolve("Se creó correctamente el pedido");
                       //console.log(planes);
                     })
                   }).catch((err) => {
                           console.log(err)
                           reject(err)
                         })
           }
           resolve("Se actualizó el estado con éxito");
          }).catch((err) => {
                           console.log(err)
                           reject(err)
                         })
      
         
            
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  CambiaStatusPago(id_pedido,status) {
    return new Promise((resolve, reject) => {
        
      Pedidos.update(
        {
          status_pago: status, deuda_anterior:0}, { where:{
            id: id_pedido
        }})
        .then((data) => {
          Last_p.update({ status_pago: status, deuda_anterior:0},{where:{pedidoId:id_pedido}})
          let data_set = JSON.stringify(data);
                       resolve(data_set);
            
          //console.log(planes);
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        });
    });
  },
  cambiaChofer(ids_pedido,chofer) {
    return new Promise((resolve, reject) => {
        
      Pedidos.update(
        {
          personalId: chofer}, { where:{
            id: ids_pedido
        }})
        .then((data) => {
          let data_set = JSON.stringify(data);
          Last_p.update({personalId: chofer},{where:{pedidoId:ids_pedido}})
          //console.log(data_set)
          Pedidos.findOne({where: {id: ids_pedido}}).then((pedido_) =>{
             console.log(pedido_.dataValues.status_pedido)
           if (pedido_.dataValues.status_pedido =="Entregado") {
              let hoy =moment(pedido_.dataValues.createdAt).format('MM/DD/YYYY')
console.log(hoy)
            GPrestados.findAll({where:{
                     clienteId: pedido_.dataValues.clienteId, 
                     personalId: pedido_.dataValues.personalId,
                     fecha_ingreso: hoy
                   }}).then((date)=>{
                     console.log(date)
                     GPrestados.update({
                      personalId: chofer },
                       {where:
                         {cantidad: pedido_.dataValues.garrafones_prestamos,fecha_ingreso:hoy,clienteId: pedido_.dataValues.clienteId, personalId: pedido_.dataValues.personalId, status_pedido:pedido_.dataValues.status_pedido, sucursaleId: pedido_.dataValues.sucursaleId}
                     }).then((data_upd) => {
                       let data_set2 = JSON.stringify(data_upd)
                       console.log(data_set2);
                       resolve("Se creó correctamente el pedido");
                       //console.log(planes);
                     })
                   }).catch((err) => {
                           console.log(err)
                           reject(err)
                         })
           }
           resolve("Se actualizó el estado con éxito");
          }).catch((err) => {
                           console.log(err)
                           reject(err)
                         })
      
         
            
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
 UpdateGPRestados(id_chofer,cantidad,id_cliente, fecha,nueva_cantidad) {
    return new Promise((resolve, reject) => {
      let hoy =moment().format('MM/DD/YYYY')
      fecha = moment(fecha).format('MM/DD/YYYY')
console.log(hoy)
   GPrestados.update({devueltos: cantidad, fecha_devolucion: hoy, cantidad:nueva_cantidad },
      {where:{fecha_ingreso:fecha,clienteId: id_cliente, personalId: id_chofer}
                     }).then((data_upd) => {
                       let data_set2 = JSON.stringify(data_upd)
                       console.log(data_set2);
                       GPrestados.findAll({where:{
                        fecha_ingreso:fecha,clienteId: id_cliente, personalId: id_chofer
                      }}).then((date)=>{
                        let data_set2 = JSON.stringify(date)

                       resolve(data_set2);                      
                   }).catch((err) => {
                           console.log(err)
                           reject(err)
                         })
                        }).catch((err) => {
                          console.log(err)
                          reject(err)
                        })
    });
  },

  DescontarGPrestados(id_chofer,cantidad,id_cliente, fecha) {
    return new Promise((resolve, reject) => {
      fecha = moment(fecha).format('MM/DD/YYYY')
      console.log(fecha)
                       GPrestados.findAll({where:{
                        fecha_ingreso:fecha,clienteId: id_cliente, personalId: id_chofer
                      }}).then((date)=>{
                        let data_set2 = JSON.stringify(date)

                       resolve(data_set2);                      
                   }).catch((err) => {
                           console.log(err)
                           reject(err)
                         })
    });
  },
  LastPedidosAllS(id){
    return new Promise((resolve, reject) => {
      Last_p.findAll({where:{sucursaleId:id},
        include:[
        {association:Last_p.Clientes, include:[
          {association:Clientes.CoP}
        ] },
    ]
      },)
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  LastPedidosAll(id){
    return new Promise((resolve, reject) => {
      Last_p.findAll({
        include:[
        {association:Last_p.Clientes, include:[
          {association:Clientes.CoP}
        ] },
    ]
      },)
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  PedidosAll(){
    return new Promise((resolve, reject) => {
      Pedidos.findAll({include:[
        {association:Pedidos.Usuarios },
        {association:Pedidos.Clientes, include:[
          {association:Clientes.Etiquetas },] },
        {association:Pedidos.Personal },
    ]
      },)
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  PedidosAllS(id){
    return new Promise((resolve, reject) => {
      Pedidos.findAll({where:{sucursaleId:id},
        include:[
        {association:Pedidos.Usuarios },
        {association:Pedidos.Clientes, include:[
          {association:Clientes.Etiquetas },] },
        {association:Pedidos.Personal },
    ]
      },)
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  PedidoById(id){
    return new Promise((resolve, reject) => {
      Pedidos.findAll({where: {
        id: id
      },include:[
        {association:Pedidos.Usuarios },
        {association:Pedidos.Clientes },
        //{ model: Productos_pedidos,as:'Productos_' }
    ]
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  PedidoById2(id){
    return new Promise((resolve, reject) => {
      Pedidos.findOne({where: {
        id: id
      },include:[
        {association:Pedidos.Usuarios },
        {association:Pedidos.Clientes },
        //{ model: Productos_pedidos,as:'Productos_' }
    ]
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  Verf_deuda_pedido(id,id_sucursal){
    return new Promise((resolve, reject) => {
      Pedidos.findAll({where: {
        clienteId: id,
        status_pago:'Por verificar',
        sucursaleId: id_sucursal
      },include:[
        {association:Pedidos.Clientes },
       // {association:Pedidos.Clientes },
        //{ model: Productos_pedidos,as:'Productos_' }
    ]})
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  Delete_Pedido(id){
    return new Promise((resolve, reject) => {
      Pedidos.destroy({where:{
        id: id
      }
      },)
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve('data_p');
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  PedidosbyDay(dia){
    return new Promise((resolve, reject) => {
      Pedidos.findAll({where: {
        createdAt: dia
      },include:[
        {association:Pedidos.Usuarios },
        {association:Pedidos.Clientes },
        //{ model: Productos_pedidos,as:'Productos_' }
    ]
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  PedidosAllGroupByChoferes(){
    return new Promise((resolve, reject) => {
      Pedidos.findAll({include:[
        
        {association:Pedidos.Clientes, include:[{association:Clientes.Etiquetas },] },
        {association:Pedidos.Personal, include:[
          {association: Personal.Vehiculos}] },        
    ]
      },{ group: ['chofer'] },)
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  PedidosAllGroupByChoferesS(id){
    return new Promise((resolve, reject) => {
      Pedidos.findAll({where:{sucursaleId:id},include:[
        
        {association:Pedidos.Clientes, include:[{association:Clientes.Etiquetas },] },
        {association:Pedidos.Personal, include:[
          {association: Personal.Vehiculos}] },        
    ]
      },{ group: ['chofer'] },)
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  PrestadosGroupByCliente(){
    return new Promise((resolve, reject) => {
      GPrestados.findAll({include:[
        {association:GPrestados.Clientes },
        {association:GPrestados.Personal, include:[
          {association: Personal.Vehiculos}
        ] },        
    ]
      },{ group: ['clienteId'] },)
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  PrestadosGroupByClienteS(id){
    return new Promise((resolve, reject) => {
      GPrestados.findAll({where:{sucursaleId: id},
        include:[
        {association:GPrestados.Clientes },
        {association:GPrestados.Personal, include:[
          {association: Personal.Vehiculos}
        ] },        
    ]
      },{ group: ['clienteId'] },)
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  PedidosAllSbyGruop(id){
    return new Promise((resolve, reject) => {
      Pedidos.findAll({where:{sucursaleId: id},
        include:[
           // {association:Pedidos.Usuarios },
            {association:Pedidos.Clientes },       
    ],
      group: ['clienteId']} )
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  //RESUMEN
  entregados_resumen(id,dia){
    return new Promise((resolve, reject) => {
      Pedidos.findAll({where:{sucursaleId: id,status_pedido: 'Entregado',createdAt: { [Op.gte]: dia }},
        include:[
            {association:Pedidos.Personal },
            {association:Pedidos.Clientes },       
    ], order: [
         ["createdAt", "DESC"],
      ]} )
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  Carga_initSResumen(id, dia){
    return new Promise((resolve, reject) => {
      Carga_init.findAll({where:{sucursaleId:id, createdAt: dia}, include:[{association: Carga_init.Personal},{ model: Recargas,as:'Recargas' }]})
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  Carga_initResumen(id, dia){
    return new Promise((resolve, reject) => {
      Carga_init.findAll({where:{createdAt: { [Op.gte]: dia }},include:[{association: Carga_init.Personal},{ model: Recargas,as:'Recargas' }]})
        .then((data) => {
          let data_p = JSON.stringify(data);
          //console.log(data)
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
     //Personal
     savePersonal(firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo) {
      return new Promise((resolve, reject) => {
        Personal.create(
          {
            name: firstName, lastName: lastName, direccion: direccion,cargo: cargo, salario: salario, telefono: telefono,  sucursal: sucursal, correo: email, fecha_ingreso: fecha_ingreso, sucursaleId:sucursal})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Personal registrado con éxito');
            //console.log(planes);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    updPersonal(id_personal,firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso,vehiculo) {
      return new Promise((resolve, reject) => {
        Personal.update(
          {
            name: firstName, lastName: lastName, direccion: direccion,cargo: cargo, salario: salario, telefono: telefono,  sucursal: sucursal, correo: email, fecha_ingreso: fecha_ingreso, vehiculoId: vehiculo, sucursaleId:sucursal}, {where:{
              id: id_personal
            }})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Personal actualizado con éxito');
            //console.log(planes);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
   
    PersonalAll(){
      return new Promise((resolve, reject) => {
        Personal.findAll()
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
PersonalAllS(id){
      return new Promise((resolve, reject) => {
        Personal.findAll({where: {sucursaleId:id}})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    
    PersonalById(id){
      return new Promise((resolve, reject) => {
        Personal.findOne({where: {
          id: id
        },include:[
          {association: Personal.Vehiculos}
        ]})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    ChoferesAll(id){
      return new Promise((resolve, reject) => {
        Personal.findAll({where: {
          cargo: 'Chofer' }})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    Delete_Personal(id){
      return new Promise((resolve, reject) => {
        Personal.destroy({where:{
          id: id
        }
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve('data_p');
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    ChoferesAllS(id){
      return new Promise((resolve, reject) => {
        Personal.findAll({where: {
          cargo: 'Chofer', sucursaleId: id }})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    CPbycp(cp){
      return new Promise((resolve, reject) => {
        CoP.findAll({where: {
          cp: cp
        }})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    CodigosP(){
      return new Promise((resolve, reject) => {
        CoP.findAll()
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    

    //Vehiculos
    savevehiculos(matricula, marca, modelo, anio, status, sucursal,tipo, capacidad) {
      return new Promise((resolve, reject) => {
        Vehiculos.create(
          {
            matricula: matricula, marca: marca, modelo: modelo, anio: anio, status: status, sucursal: sucursal, tipo:tipo, capacidad:capacidad,sucursaleId: sucursal})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve(data_set);
            //console.log(planes);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    updVehiculos(id_vehiculo,matricula, marca, modelo, anio, status, sucursal,tipo, capacidad) {
      return new Promise((resolve, reject) => {
        Vehiculos.update(
          {
            matricula: matricula, marca: marca, modelo: modelo, anio: anio, status: status, sucursal: sucursal, tipo:tipo, capacidad:capacidad, sucursaleId: sucursal}, {where:{
              id: id_vehiculo
            }})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve(data_set);
            //console.log(planes);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
   
    vehiculosAll(){
      return new Promise((resolve, reject) => {
        Vehiculos.findAll()
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    vehiculosAllS(id){
      return new Promise((resolve, reject) => {
        Vehiculos.findAll({where:{sucursaleId:id}})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    vehiculosById(id){
      return new Promise((resolve, reject) => {
        Vehiculos.findOne({where: {
          id: id
        }})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    Delete_vehiculos(id){
      return new Promise((resolve, reject) => {
        Vehiculos.destroy({where:{
          id: id
        }
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve('data_p');
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },

    //SUCURSALES
    Sucursales_ALl(){
      return new Promise((resolve, reject) => {
        Sucursales.findAll(
         /* {include:[
          {model: Vehiculos , as:'Vehiculos'},
           {model: Clientes , as:'Clientes'},
            {model: GPrestados , as:'GPrestados'},
           {model: Pedidos , as:'Pedidos'},
           {model: Personal , as:'Personal'}
        ]}*/
        )
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    saveSucursal(nombre, direccion, longitud, latitud, telefono, gerente,telefono_gerente, id_gerente) {
      return new Promise((resolve, reject) => {
        Sucursales.create(
          {nombre: nombre, direccion: direccion, logitud: longitud, latitud: latitud, telefono: telefono, gerente: gerente,telefono_gerente: telefono_gerente, id_gerente: id_gerente})
          .then((data) => {
            let data_set = JSON.stringify(data);
            console.log(data.id)
            Usuarios.update({sucursaleId: data.id}, {where:{
              id: id_gerente
            }})
            resolve('Zona registrada con éxito');
            //console.log(planes);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    updSucursal(id_Sucursales, nombre,telefono) {
      return new Promise((resolve, reject) => {
        Sucursales.update(
          {
            nombre: nombre, telefono: telefono}, {where:{
              id: id_Sucursales
            }})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve(data_set);
            //console.log(planes);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    delete_sucursales(id){
      return new Promise((resolve, reject) => {
        Sucursales.destroy({where:{
          id: id
        }
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve('data_p');
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    Sucursales_id(id){
      return new Promise((resolve, reject) => {
        Sucursales.findOne({where: {
          id: id
        }})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    Sucursal_byId_gerente(id){
      return new Promise((resolve, reject) => {
        Sucursales.findAll({where: {
          id_gerente: id
        }})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },

    //Carga inicial
    Carga_initS(id){
      return new Promise((resolve, reject) => {
        Carga_init.findAll({where:{sucursaleId:id}, include:[{association: Carga_init.Personal},{ model: Recargas,as:'Recargas' }]})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    Carga_init(id){
      return new Promise((resolve, reject) => {
        Carga_init.findAll({include:[{association: Carga_init.Personal},{ model: Recargas,as:'Recargas' }]})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    cargaActual(id_){
      return new Promise((resolve, reject) => {
        Carga_init.findOne({where:{id:id_}},{attributes:['recarga']}
        )
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    updcarga_inicial(id, recarga_new){
      return new Promise((resolve, reject) => {
        Carga_init.update({recarga:recarga_new}, {where:{id:id}}
        )
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    carga_init_corte(id, id_personal){
      return new Promise((resolve, reject) => {
        Carga_init.findAll({where:{sucursaleId:id, personalId: id_personal}, include:[{association: Carga_init.Personal}]})
          .then((data) => {
            let data_p = JSON.stringify(data);
            //console.log(data)
            resolve(data_p);
            ////console.log(id_usuario);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    savecarga_inicial(carga_init,  chofer,id_sucursal) {
      return new Promise((resolve, reject) => {
        Carga_init.create(
          {cantidad_inicial: carga_init, recarga: carga_init,personalId: chofer, sucursaleId:id_sucursal})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve(data_set);
            //console.log(planes);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    recarga_table(id_carga,  nueva_carga) {
      return new Promise((resolve, reject) => {
        Recargas.create(
          {recarga: nueva_carga, cargaInitId: id_carga})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve(data_set);
            //console.log(planes);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
        //Etiquetas
        Etiquetas(id){
          return new Promise((resolve, reject) => {
            Etiquetas.findAll({where:{sucursaleId:id}})
              .then((data) => {
                let data_p = JSON.stringify(data);
                //console.log(data)
                resolve(data_p);
                ////console.log(id_usuario);
              })
              .catch((err) => {
                reject(err)
              });
          });
        },
        EtiquetasAll(){
          return new Promise((resolve, reject) => {
            Etiquetas.findAll()
              .then((data) => {
                let data_p = JSON.stringify(data);
                //console.log(data)
                resolve(data_p);
                ////console.log(id_usuario);
              })
              .catch((err) => {
                reject(err)
              });
          });
        },
        Etiquetas_save(nombre,  color,id_sucursal) {
          return new Promise((resolve, reject) => {
            Etiquetas.create(
              {etiquetas: nombre, color: color, sucursaleId:id_sucursal})
              .then((data) => {
                let data_set = JSON.stringify(data);
                resolve(data_set);
                //console.log(planes);
              })
              .catch((err) => {
                reject(err)
              });
          });
        },
        delete_etiqueta(id){
          return new Promise((resolve, reject) => {
            Etiquetas.destroy({where:{
              id: id
            }
            },)
              .then((data) => {
                let data_p = JSON.stringify(data);
                //console.log(data)
                resolve('data_p');
                ////console.log(id_usuario);
              })
              .catch((err) => {
                reject(err)
              });
          });
        },

        
  //CUPONES
  totalcupones() {
    return new Promise((resolve, reject) => {
      Cupones.findAll()
        .then((res) => {
          let about = JSON.stringify(res);
          resolve(about);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  guardarCupon(id_usuario,nombre_cupon,categoria,nombre_proveedor,ws_proveedor,fecha_inicio, fecha_final,cantidad, descripcion,img,dir_proveedor) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
          // Item not found, create a new one
          Cupones.create({
            nombre_cupon:nombre_cupon,
nombre_proveedor:nombre_proveedor,
ws_proveedor:ws_proveedor,
fecha_inicio:fecha_inicio,
fecha_final:fecha_final,
cantidad:cantidad,
cantidad_actual:cantidad,
categoria:categoria,
especial:descripcion,
img:img,
usuarioId:id_usuario,
ubicacion:dir_proveedor
          })
            .then((res) => {
              let about = JSON.stringify(res);
              resolve(about);
              //console.log(about);
            })
      }).catch((err) => {
        //console.log(err);
        reject(err)
      });
  },
  obtenerCuponforedit(id) {
    return new Promise((resolve, reject) => {
      Cupones.findOne({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  saveEditedCupon(id_cupon,user,nombre_cupon,categoria,nombre_proveedor,ws_proveedor,fecha_inicio, fecha_final,cantidad, descripcion,img,dir_proveedor) {
    let now = new Date();
    fecha = now.toString();
    //console.log(fecha_inicio);
    //console.log(fecha_final);
    return new Promise((resolve, reject) => {
      Cupones.update(
        {nombre_cupon:nombre_cupon,
          nombre_proveedor:nombre_proveedor,
          ws_proveedor:ws_proveedor,
          fecha_inicio:fecha_inicio,
          fecha_final:fecha_final,
          cantidad:cantidad,
          cantidad_actual:cantidad,
          categoria:categoria,
          especial:descripcion,
          img:img,
          usuarioId:user,
          ubicacion:dir_proveedor,
        },
        {
          where: {
            id: id_cupon,
          },
        }
      )
        .then((about) => {
          let aboutes = JSON.stringify(about);
          resolve(aboutes);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  deleteCupon(parametro_buscar) {
    return new Promise((resolve, reject) => {
     Used_cupons.destroy({where:{cuponeId:parametro_buscar}})
      Cupones.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
        reject(err)
      });
    });
  },
  consultarCupon(consultar) {
    return new Promise((resolve, reject) => {
      Cupones.findOne({
        where: {
          [Op.or]: [{ id: consultar }],
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(ress);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  UpdateUsedCupon(id, cantidad) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Cupones.update(
        { cantidad_actual: cantidad },
        {
          where: {
            id: id,
          },
        }
      )
        .then((about) => {
          let aboutes = JSON.stringify(about);
          resolve(aboutes);
          //console.log(aboutes);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  CuponUsado(form_id_cliente, id_cupon_selected, fecha_selected) {
    return new Promise((resolve, reject) => {
      Used_cupons.create({
        fecha_uso: fecha_selected,
        cuponeId: id_cupon_selected,
        clienteId: form_id_cliente
      })
        .then((about) => {
          let aboutes = JSON.stringify(about);
          resolve(aboutes);
          // //console.log(aboutes);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  obtenerCuponesUsados() {
    return new Promise((resolve, reject) => {
      Used_cupons.findAll({include:[{association: Used_cupons.Cupones},{association: Used_cupons.Clientes}],
        // order: [
        //   ["updatedAt", "DESC"],
        // ],
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          ////console.log(id);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  consultarCuponesUsados(id_cupon, id_cliente) {
    return new Promise((resolve, reject) => {
      Used_cupons.findOne({
        where: {
          cuponeId: id_cupon,
          clienteId: id_cliente
        },
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          ////console.log(id);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },

    //NOTIFICACIONES
obtenernotificaciones() {
      return new Promise((resolve, reject) => {
        Notificaciones.findAll(
          {
            //where:{estado:'0'},
          include:[{association:Notificaciones.Clientes}],
          order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ["updatedAt", "DESC"],
          ],
        })
          .then((rest) => {
            let respuesta = JSON.stringify(rest);
            resolve(respuesta);
            ////console.log(JSON.stringify(users));
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
  
obtenernotificacionesbyLimit3() {
      return new Promise((resolve, reject) => {
        Notificaciones.findAll({include:[{association:Notificaciones.Cliente}],
          limit: 2,
          order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ["updatedAt", "DESC"],
          ],
        })
          .then((res) => {
            let respuesta = JSON.stringify(res);
            resolve(respuesta);
            ////console.log(JSON.stringify(users));
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
  
saveCupNotificacionClientNew(tipo,estado, descripcion, id_cliente) {
      return new Promise((resolve, reject) => {
            Notificaciones.create({
              tipo:tipo,
estado:estado,
descripcion:descripcion,
clienteId:id_cliente
            })
              .then((res) => {
                let respuesta = JSON.stringify(res);
                resolve(respuesta);
                ////console.log(respuesta);
              })
              .catch((err) => {
                //console.log(err);
                 reject(err)
              });
          
      });
    },
  
    obtenerNotificacionforedit(id) {
      return new Promise((resolve, reject) => {
        Notificaciones.findAll({
          where: {
            id: id,
          },
        })
          .then((res) => {
            let ress = JSON.stringify(res);
            resolve(ress);
            //console.log(id);
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
    saveEditedNotificaciones(id, estado) {
      return new Promise((resolve, reject) => {
        Notificaciones.update(
          { estado: estado},
          {
            where: {
              id: id,
            },
          }
        )
          .then((res) => {
            let reses = JSON.stringify(res);
            resolve(reses);
            //console.log(reses);
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
  
    deleteNotificaciones(parametro_buscar) {
      return new Promise((resolve, reject) => {
        Notificaciones.destroy({
          where: {
            id: parametro_buscar,
          },
        }).then(() => {
          //let gates= JSON.stringify(users)
          resolve("respuesta exitosa");
          ////console.log(JSON.stringify(users));
        }).catch((err) => {
          //console.log(err);
           reject(err)
        });
      });
    },


    //ASIGNACION DE CHOFER
    ObtenerAsignados() {
      return new Promise((resolve, reject) => {
        Asig_chofer.findAll(
          {
            //where:{estado:'0'},
          include:[{association:Asig_chofer.Vehiculos},{association:Asig_chofer.Personal},{association:Asig_chofer.Sucursales},],
          order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ["updatedAt", "DESC"],
          ],
        })
          .then((rest) => {
            let respuesta = JSON.stringify(rest);
            resolve(respuesta);
            ////console.log(JSON.stringify(users));
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
    ObtenerAsignadosbyId(id_) {
      return new Promise((resolve, reject) => {
        Asig_chofer.findOne({where:{id: id_}},
          {
            //where:{estado:'0'},
          include:[{association:Asig_chofer.Vehiculos},{association:Asig_chofer.Personal},{association:Asig_chofer.Sucursales},],
          order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ["updatedAt", "DESC"],
          ],
        })
          .then((rest) => {
            let respuesta = JSON.stringify(rest);
            resolve(respuesta);
            ////console.log(JSON.stringify(users));
          })
          .catch((err) => {
            //console.log(err);
             reject(err)
          });
      });
    },
    SaveAsignado(id_vehiculo,id_chofer, Id_zona) {
      return new Promise((resolve, reject) => {
            Asig_chofer.create({
              vehiculoId:id_vehiculo,
              personalId:id_chofer,
              sucursaleId:Id_zona
            })
              .then((res) => {
                let respuesta = JSON.stringify(res);
                resolve(respuesta);
                ////console.log(respuesta);
              })
              .catch((err) => {
                //console.log(err);
                 reject(err)
              });
          
      });
    },
    SaveAsignadoEdited(id_,id_vehiculo,id_chofer, Id_zona) {
      return new Promise((resolve, reject) => {
            Asig_chofer.update({
              vehiculoId:id_vehiculo,
              personalId:id_chofer,
              sucursaleId:Id_zona
            }, {where:{id:id_}})
              .then((res) => {
                let respuesta = JSON.stringify(res);
                resolve(respuesta);
                ////console.log(respuesta);
              })
              .catch((err) => {
                //console.log(err);
                 reject(err)
              });
          
      });
    },
    delete_asignar_chofer(parametro_buscar) {
      return new Promise((resolve, reject) => {
        Asig_chofer.destroy({
          where: {
            id: parametro_buscar,
          },
        }).then(() => {
          //let gates= JSON.stringify(users)
          resolve("respuesta exitosa");
          ////console.log(JSON.stringify(users));
        }).catch((err) => {
          //console.log(err);
           reject(err)
        });
      });
    },

};
