const { Op, where } = require("sequelize");
const db = require("../../config/db");
const bcrypt = require("bcrypt-nodejs");
const Usuarios = require("../../models/PYT4/Usuarios");
const Clientes = require("../../models/PYT4/Clientes");
const Pedidos = require("../../models/PYT4/Pedidos");
const Productos_pedidos = require("../../models/PYT4/Productos_pedidos");


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
  registrar_cliente(firstName,lastName,ciudad,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,sucursal, email) {
    return new Promise((resolve, reject) => {
      Clientes.create(
        {
          firstName: firstName,lastName: lastName,ciudad: ciudad,fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono, nombre_familiar_1:nombre_familiar_1,  apellido_familiar_1:apellido_familiar_1,       telefono_familiar_1:telefono_familiar_1,  nombre_familiar_2:nombre_familiar_2,  apellido_familiar_2:apellido_familiar_2,       telefono_familiar_2:telefono_familiar_2,tipo:tipo_cliente, fecha_ultimo_pedido: fecha_ultimo_pedido,   utimos_botellones: utimos_botellones,  email:email , nuevo:cliente_nuevo ,sucursal: sucursal,})
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

  ClientesAll(){
    return new Promise((resolve, reject) => {
      Clientes.findAll({order: [
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
   PedidosReg(id_cliente, firstName, lastName,  ciudad, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, productos, monto_total, status_pago,   status_pedido, garrafones_prestamos, observacion, id_usuario) {
    return new Promise((resolve, reject) => {
      console.log(productos.length)
      let products = JSON.stringify(productos);
      console.log(id_cliente) 
      Pedidos.create(
        {
          chofer: chofer,productos: products,monto_total: monto_total,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario, clienteId: id_cliente})
        .then((data) => {
          let data_set = JSON.stringify(data);
          console.log(data_set)
          console.log(data.id)
          for (let i = 0; i < productos.length; i++) {
            Productos_pedidos.create(
              {
                product: productos[i].product ,cantidad_producto: productos[i].cantidad_producto,metodo_pago: productos[i].metodo_pago,monto_producto: productos[i].monto_producto,tipo_venta: productos[i].tipo_venta, pedidoId: data.id },)
              .then((data_prod) => {
               console.log(" se guardo bien")
               console.log(" se guardo bien")
               if (i == productos.length-1) {
                
                Clientes.update(
                  {
                    firstName: firstName,lastName: lastName,ciudad: ciudad,fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono,  },{ where:{
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
              }
              })
              .catch((err) => {
                reject(err)
              });
            
          }
          
            
          //console.log(planes);
        })
        .catch((err) => {
          reject(err)
        });
    });
  },
 PedidosUpd(id_pedido, id_cliente, firstName, lastName,  ciudad, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, productos, monto_total, status_pago,   status_pedido, garrafones_prestamos, observacion, id_usuario) {
    return new Promise((resolve, reject) => {
     
      let products = JSON.stringify(productos);
      
      Pedidos.update(
        {
          chofer: chofer,productos: products,monto_total: monto_total,status_pago: status_pago,status_pedido: status_pedido,garrafones_prestamos: garrafones_prestamos,observacion: observacion,usuarioId: id_usuario, clienteId: id_cliente}, { where:{
            id: id_pedido
        }})
        .then((data) => {
          let data_set = JSON.stringify(data);
          console.log(data_set)
          Productos_pedidos.findAll({ where:{
            pedidoId: id_pedido
        }}).then(function(count) {
          console.log('Aqui el contador')

          if (productos.length  > count.length) {
            for (let i = 0; i < productos.length; i++) {
              if (typeof count[i] == "undefined" ) {
                
              }else{
                Productos_pedidos.update(
                {
                  product: productos[i].product ,cantidad_producto: productos[i].cantidad_producto,metodo_pago: productos[i].metodo_pago,monto_producto: productos[i].monto_producto,tipo_venta: productos[i].tipo_venta, pedidoId: parseInt(id_pedido) },{ where:{
                    id: count[i].id
                }})
                .catch((err) => {
                  console.log(err)
                  //reject(err)
                });
              }
              
              console.log(i)
              
              if (i == count.length ) {
               
                
                Productos_pedidos.create(
                  {
                    product: productos[i].product ,cantidad_producto: productos[i].cantidad_producto,metodo_pago: productos[i].metodo_pago,monto_producto: productos[i].monto_producto,tipo_venta: productos[i].tipo_venta, pedidoId: id_pedido}).then((es)=>{
                     
                      

                      Clientes.update(
                        {
                          firstName: firstName,lastName: lastName,ciudad: ciudad,fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono,  },{ where:{
                              id: id_cliente
                          }})
                        .then((data_cli) => {
                          let data_set2 = JSON.stringify(data_cli);
                          console.log(" secreo")
                          console.log(es.id)
                          resolve(es.id);
                          //console.log(planes);
                        })
                        .catch((err) => {                      
                          reject(err)
                        });
                    }).catch((err) => {
                      console.log(err)
                      //reject(err)
                    });
              }
            
              
            }
          }else{
            for (let i = 0; i < productos.length; i++) {
              //console.log(count[i].id)
              Productos_pedidos.update(
                {
                  product: productos[i].product ,cantidad_producto: productos[i].cantidad_producto,metodo_pago: productos[i].metodo_pago,monto_producto: productos[i].monto_producto,tipo_venta: productos[i].tipo_venta, pedidoId: id_pedido },{ where:{
                    id: count[i].id
                }})
                .then((data_prod) => {
                 console.log(" se guardo bien")
                 if (i == productos.length-1) {
                  Clientes.update(
                    {
                      firstName: firstName,lastName: lastName,ciudad: ciudad,fraccionamiento: fraccionamiento,coto: coto,casa: casa, calle: calle, avenida: avenida,referencia:referencia,telefono:telefono,  },{ where:{
                          id: id_cliente
                      }})
                    .then((data_cli) => {
                      let data_set2 = JSON.stringify(data_cli);
                      console.log(" se actualizo  bien el cliente")
                      resolve('Pedido actualizado con éxito');
                      //console.log(planes);
                    })
                    .catch((err) => {                      
                      reject(err)
                    });
                }

                })
                .catch((err) => {
                  console.log(err)
                  //reject(err)
                });
              
            }
          }
          
    

          }).catch((err) => {
            reject(err)
          });
   
            
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
        { model: Productos_pedidos,as:'Productos_' }
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
        { model: Productos_pedidos,as:'Productos_' }
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
  
};
