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
var moment = require('moment-timezone');

module.exports = {
  //USUARIO
  RegUser(tipo, nombre, email, password) {
    return new Promise((resolve, reject) => {
      Usuarios.create(
        {
         name: nombre, tipo: tipo, email: email, password: password})
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve('Usuario registrado con éxito');
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
  UsuariobyId(id){
    return new Promise((resolve, reject) => {
      Usuarios.findAll({
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
  actualizarUser(userid, name, email, photo1) {
    return new Promise((resolve, reject) => {
      Usuarios.update(
        {
          name:name, email: email, photo:photo1
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
          //console.log(err);
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
   // password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
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
          //console.log(err);
        });
    });
  },

  //CLIENTE
  registrar_cliente(firstName,cp,asentamiento,lastName,ciudad,municipio,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,sucursal, email) {
    return new Promise((resolve, reject) => {
      Clientes.create(
        {
          firstName: firstName,lastName: lastName,ciudad: ciudad,municipio:municipio,fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono, nombre_familiar_1:nombre_familiar_1,  apellido_familiar_1:apellido_familiar_1,       telefono_familiar_1:telefono_familiar_1,  nombre_familiar_2:nombre_familiar_2,  apellido_familiar_2:apellido_familiar_2,       telefono_familiar_2:telefono_familiar_2,tipo:tipo_cliente, fecha_ultimo_pedido: fecha_ultimo_pedido,   utimos_botellones: utimos_botellones,  email:email , nuevo:cliente_nuevo ,sucursaleId: sucursal,estado:cp, cpId: asentamiento})
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve('Cliente registrado con éxito');
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },

  update_cliente(id_cliente,cp,asentamiento,firstName,lastName,ciudad,municipio,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,sucursal, email) {
    return new Promise((resolve, reject) => {
      Clientes.update(
        {
          firstName: firstName,lastName: lastName,ciudad: ciudad,municipio: municipio, fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono, nombre_familiar_1:nombre_familiar_1,  apellido_familiar_1:apellido_familiar_1,       telefono_familiar_1:telefono_familiar_1,  nombre_familiar_2:nombre_familiar_2,  apellido_familiar_2:apellido_familiar_2,       telefono_familiar_2:telefono_familiar_2,tipo:tipo_cliente, fecha_ultimo_pedido: fecha_ultimo_pedido,   utimos_botellones: utimos_botellones,  email:email , nuevo:cliente_nuevo ,sucursaleId: sucursal,estado:cp, cpId: asentamiento},{
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

  ClientesAll(){
    return new Promise((resolve, reject) => {
      Clientes.findAll({include:[
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
  ClientesAllS(id){
    return new Promise((resolve, reject) => {
      Clientes.findAll({where:{sucursaleId:id},
        include:[
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
  
  ClientebyId(id){
    return new Promise((resolve, reject) => {
      Clientes.findAll({where:{
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

  Delete_Cliente(id){
    return new Promise((resolve, reject) => {
      Clientes.destroy({where:{
        id: id
      }
      },)
        .then((data) => {
          Pedidos.destroy({where:{
            clienteId: id
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

   //Pedidos
   PedidosReg(id_cliente, firstName, lastName,  ciudad, municipio,fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago,   status_pago, status_pedido, garrafones_prestamos, observacion,danados,id_chofer, garrafon19L,botella1L, garrafon11L, botella5L, id_usuario, sucursal,deuda_anterior) {
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
      Pedidos.create(
        {
          chofer: chofer,monto_total: total_total_inp,metodo_pago: metodo_pago,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario,garrafon19L: garrafon19L_, botella1L: botella1L_,garrafon11L: garrafon11L_, botella5L: botella5L_, danados:danados, clienteId: id_cliente,personalId: id_chofer, sucursaleId: sucursal, deuda_anterior:deuda_anterior })
        .then((data) => {
          let data_set = JSON.stringify(data);
                
          let hoy =moment().format('YYYY-MM-DD')
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
 PedidosUpd(id_pedido,id_cliente, firstName, lastName,  ciudad, municipio,fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago,   status_pago,   status_pedido, garrafones_prestamos, observacion,danados,id_chofer, garrafon19L,botella1L, garrafon11L, botella5L, id_usuario,sucursal,deuda_anterior) {
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
          chofer: chofer,monto_total: total_total_inp,metodo_pago: metodo_pago,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario,garrafon19L: garrafon19L_, botella1L: botella1L_,garrafon11L: garrafon11L_, botella5L: botella5L_,danados:danados, clienteId: id_cliente, personalId: id_chofer,sucursaleId: sucursal,deuda_anterior:deuda_anterior}, { where:{
            id: id_pedido
        }})
        .then((data) => {
          let data_set = JSON.stringify(data);
          let hoy =moment().format('YYYY-MM-DD')
          Clientes.update(
            {
              firstName: firstName,lastName: lastName,ciudad: ciudad,municipio:municipio, fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono,  },{ where:{
                  id: id_cliente
              }}) .then((data_cli) => {
                resolve("Se actualizó correctamente el pedido");
                //console.log(planes);
              })          
            .catch((err) => {                      
              reject(err)
            });         

    })
    .catch((err) => {
      console.log(err)
      reject(err)
    })})
  },

  CambiaStatus(id_pedido,status) {
    return new Promise((resolve, reject) => {
        
      Pedidos.update(
        {
          status_pedido: status}, { where:{
            id: id_pedido
        }})
        .then((data) => {
          let data_set = JSON.stringify(data);
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
          status_pago: status}, { where:{
            id: id_pedido
        }})
        .then((data) => {
          let data_set = JSON.stringify(data);
                       resolve("Se actualizó correctamente el status del pago");
            
          //console.log(planes);
        })
        .catch((err) => {
          console.log(err)
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

  PedidosAll(){
    return new Promise((resolve, reject) => {
      Pedidos.findAll({include:[
        {association:Pedidos.Usuarios },
        {association:Pedidos.Clientes },
        
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
        {association:Pedidos.Clientes },
        
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
        {association:Pedidos.Usuarios },
        {association:Pedidos.Clientes },
        {association:Pedidos.Personal, include:[
          {association: Personal.Vehiculos}
        ] },        
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
        {association:Pedidos.Usuarios },
        {association:Pedidos.Clientes },
        {association:Pedidos.Personal, include:[
          {association: Personal.Vehiculos}
        ] },        
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
     //Personal
     savePersonal(firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo) {
      return new Promise((resolve, reject) => {
        Personal.create(
          {
            name: firstName, lastName: lastName, direccion: direccion,cargo: cargo, salario: salario, telefono: telefono,  sucursal: sucursal, correo: email, fecha_ingreso: fecha_ingreso, vehiculoId: vehiculo, sucursaleId:sucursal})
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
        Personal.findAll({where: {
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
    

    //Vehiculos
    savevehiculos(matricula, marca, modelo, anio, status, sucursal,tipo, capacidad) {
      return new Promise((resolve, reject) => {
        Vehiculos.create(
          {
            matricula: matricula, marca: marca, modelo: modelo, anio: anio, status: status, sucursal: sucursal, tipo:tipo, capacidad:capacidad,sucursaleId: sucursal})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Vehículo registrado con éxito');
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
            resolve('Vehiculo actualizado con éxito');
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
        Vehiculos.findAll({where: {
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
        Sucursales.findAll({include:[
          {model: Vehiculos , as:'Vehiculos'},
           {model: Clientes , as:'Clientes'},
            {model: GPrestados , as:'GPrestados'},
           {model: Pedidos , as:'Pedidos'},
           {model: Personal , as:'Personal'}
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
    saveSucursal(nombre, direccion, longitud, latitud, telefono, gerente,telefono_gerente, id_gerente) {
      return new Promise((resolve, reject) => {
        Sucursales.create(
          {nombre: nombre, direccion: direccion, logitud: longitud, latitud: latitud, telefono: telefono, gerente: gerente,telefono_gerente: telefono_gerente, id_gerente: id_gerente})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Sucursal registrada con éxito');
            //console.log(planes);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    updSucursal(id_Sucursales,firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso,vehiculo) {
      return new Promise((resolve, reject) => {
        Sucursales.update(
          {
            name: firstName, lastName: lastName, direccion: direccion,cargo: cargo, salario: salario, telefono: telefono,  sucursal: sucursal, correo: email, fecha_ingreso: fecha_ingreso, vehiculoId: vehiculo}, {where:{
              id: id_Sucursales
            }})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Sucursal actualizada con éxito');
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
        Sucursales.findAll({where: {
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
    
};
