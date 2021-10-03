const { Op, where } = require("sequelize");
const db = require("../../config/db");
const bcrypt = require("bcrypt-nodejs");
const Usuarios = require("../../models/PYT4/Usuarios");
const Clientes = require("../../models/PYT4/Clientes");
const Pedidos = require("../../models/PYT4/Pedidos");
const Personal = require("../../models/PYT4/Personal");
const Vehiculos = require("../../models/PYT4/Vehiculos");
const CoP = require("../../models/PYT4/CP");

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
          firstName: firstName,lastName: lastName,ciudad: ciudad,municipio:municipio,fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono, nombre_familiar_1:nombre_familiar_1,  apellido_familiar_1:apellido_familiar_1,       telefono_familiar_1:telefono_familiar_1,  nombre_familiar_2:nombre_familiar_2,  apellido_familiar_2:apellido_familiar_2,       telefono_familiar_2:telefono_familiar_2,tipo:tipo_cliente, fecha_ultimo_pedido: fecha_ultimo_pedido,   utimos_botellones: utimos_botellones,  email:email , nuevo:cliente_nuevo ,sucursal: sucursal,estado:cp, cpId: asentamiento})
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
          firstName: firstName,lastName: lastName,ciudad: ciudad,municipio: municipio, fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono, nombre_familiar_1:nombre_familiar_1,  apellido_familiar_1:apellido_familiar_1,       telefono_familiar_1:telefono_familiar_1,  nombre_familiar_2:nombre_familiar_2,  apellido_familiar_2:apellido_familiar_2,       telefono_familiar_2:telefono_familiar_2,tipo:tipo_cliente, fecha_ultimo_pedido: fecha_ultimo_pedido,   utimos_botellones: utimos_botellones,  email:email , nuevo:cliente_nuevo ,sucursal: sucursal,estado:cp, cpId: asentamiento},{
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
   PedidosReg(id_cliente, firstName, lastName,  ciudad, municipio,fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago,   status_pago,   status_pedido, garrafones_prestamos, observacion, garrafon19L,botella1L, garrafon11L, botella5L, id_usuario) {
    return new Promise((resolve, reject) => {
      let garrafon19L_ = JSON.stringify(garrafon19L);
      let botella1L_ = JSON.stringify(botella1L);
      let garrafon11L_ = JSON.stringify(garrafon11L);
      let botella5L_ = JSON.stringify(botella5L);

      Pedidos.create(
        {
          chofer: chofer,monto_total: total_total_inp,metodo_pago: metodo_pago,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario,garrafon19L: garrafon19L_, botella1L: botella1L_,garrafon11L: garrafon11L_, botella5L: botella5L_, clienteId: id_cliente})
        .then((data) => {
          let data_set = JSON.stringify(data);
                
                Clientes.update(
                  {
                    firstName: firstName,lastName: lastName,ciudad: ciudad,municipio: municipio, fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono,  },{ where:{
                        id: id_cliente
                    }})
                  .then((data_cli) => {
                    let data_set2 = JSON.stringify(data_cli);
                    resolve('Pedido registrado con éxito');
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
 PedidosUpd(id_pedido,id_cliente, firstName, lastName,  ciudad, municipio,fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago,   status_pago,   status_pedido, garrafones_prestamos, observacion, garrafon19L,botella1L, garrafon11L, botella5L, id_usuario) {
    return new Promise((resolve, reject) => {
      let garrafon19L_ = JSON.stringify(garrafon19L);
      let botella1L_ = JSON.stringify(botella1L);
      let garrafon11L_ = JSON.stringify(garrafon11L);
      let botella5L_ = JSON.stringify(botella5L);
      Pedidos.update(
        {
          chofer: chofer,monto_total: total_total_inp,metodo_pago: metodo_pago,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario,garrafon19L: garrafon19L_, botella1L: botella1L_,garrafon11L: garrafon11L_, botella5L: botella5L_, clienteId: id_cliente}, { where:{
            id: id_pedido
        }})
        .then((data) => {
          let data_set = JSON.stringify(data);
          console.log('Aqui el contador')
          Clientes.update(
                        {
                          firstName: firstName,lastName: lastName,ciudad: ciudad,municipio:municipio, fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono,  },{ where:{
                              id: id_cliente
                          }})
                        .then((data_cli) => {
                          let data_set2 = JSON.stringify(data_cli);
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
                })
              })
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
          console.log(data_set)
          resolve("Se actualizó el estado con éxito");
            
          //console.log(planes);
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
     //Personal
     savePersonal(firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo) {
      return new Promise((resolve, reject) => {
        Personal.create(
          {
            name: firstName, lastName: lastName, direccion: direccion,cargo: cargo, salario: salario, telefono: telefono,  sucursal: sucursal, correo: email, fecha_ingreso: fecha_ingreso, vehiculoId: vehiculo})
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
            name: firstName, lastName: lastName, direccion: direccion,cargo: cargo, salario: salario, telefono: telefono,  sucursal: sucursal, correo: email, fecha_ingreso: fecha_ingreso, vehiculoId: vehiculo}, {where:{
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
            matricula: matricula, marca: marca, modelo: modelo, anio: anio, status: status, sucursal: sucursal, tipo:tipo, capacidad:capacidad,})
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
            matricula: matricula, marca: marca, modelo: modelo, anio: anio, status: status, sucursal: sucursal, tipo:tipo, capacidad:capacidad,}, {where:{
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
};
