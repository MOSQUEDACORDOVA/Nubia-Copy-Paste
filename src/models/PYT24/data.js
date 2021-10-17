const { Op, where } = require("sequelize");
const db24 = require("../../config/dbPY24");
const bcrypt = require("bcrypt-nodejs");
const Usuarios = require("../../models/PYT24/Usuarios");
const TH = require("../../models/PYT24/th");
const Maquinas = require("../../models/PYT24/Maquinasth");
const Paquetes = require("../../models/PYT24/Packages");

module.exports = {
    //USUARIO
    RegUser(username, email, password) {
        return new Promise((resolve, reject) => {
        Usuarios.create({ username: username, email: email, password: password, type_user: 'Inversionista' })
            .then((data) => {
                let data_set = JSON.stringify(data);
                resolve('Usuario registrado con éxito');
            })
            .catch((err) => {
                reject(err)
            });
        });
    },
    // AÑADIR MAQUINA DE MINADO
    AddMachineTH(amount) {
      return new Promise((resolve, reject) => {
        Maquinas.create({ th_capacity: amount, sold_out: 0, avalible: amount })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Maquina de minado registrada con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODAS LAS MAQUINAS DE MINADO
    GetMachineTH() {
      return new Promise((resolve, reject) => {
        Maquinas.findAll()
            .then((data) => {
              let data_p = JSON.stringify(data);
              console.log(data)
              resolve(data_p);
            })
            .catch((err) => {
              reject(err)
            });
      });
    },
    // CONTROL DE TH PRECIO, % DE MANTENIMIENTO, % DE ERROR, GANANCIAS POR REFERIDOS, SALDO MINIMO DE RETIRO
    ControlTH(price, maintance, error, earnings, minwithd) {
        return new Promise((resolve, reject) => {
        TH.create({ price: price, percentage_maintance: maintance, percentage_error: error, ref_earnings: earnings, min_withdrawal: minwithd })
            .then((data) => {
                let data_set = JSON.stringify(data);
                resolve('Datos agregados satisfactoriamente');
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    // MOSTRAR DATOS GUARDADOS, CONTROL DE TH PRECIO, % DE MANTENIMIENTO, % DE ERROR, GANANCIAS POR REFERIDOS, SALDO MINIMO DE RETIRO
    GetControlTH(){
        return new Promise((resolve, reject) => {
          TH.findAll()
            .then((data) => {
              let data_p = JSON.stringify(data);
              console.log(data)
              resolve(data_p);
            })
            .catch((err) => {
              reject(err)
            });
        });
    },
    // ACTUALIZAR PRECIO TH
    UpdatePriceTH(price) {
        return new Promise((resolve, reject) => {
          TH.update(
            {
              price: price
            }, { where:{
                id: 3
            }})
            .then((data) => {
              let data_set = JSON.stringify(data);
              resolve('Precio de TH actualizado con éxito');
            })
            .catch((err) => {
              reject(err)
            });
        });
    },
    // ACTUALIZAR PORCENTAJE DE MANTENIMIENTO
    UpdateMaintance(maintance) {
        return new Promise((resolve, reject) => {
          TH.update(
            {
              percentage_maintance: maintance
            }, { where:{
                id: 3
            }})
            .then((data) => {
              let data_set = JSON.stringify(data);
              resolve('Porcentaje de Mantenimiento actualizado con éxito');
            })
            .catch((err) => {
              reject(err)
            });
        });
    },
    // ACTUALIZAR PORCENTAJE DE ERROR
    UpdateError(error) {
        return new Promise((resolve, reject) => {
          TH.update(
            {
              percentage_error: error
            }, { where:{
                id: 3
            }})
            .then((data) => {
              let data_set = JSON.stringify(data);
              resolve('Porcentaje de Error actualizado con éxito');
            })
            .catch((err) => {
              reject(err)
            });
        });
    },
    // ACTUALIZAR GANANCIAS POR REFERIDOS
    UpdateRefEarnings(earnings) {
        return new Promise((resolve, reject) => {
          TH.update(
            {
              ref_earnings: earnings
            }, { where:{
                id: 3
              }})
              .then((data) => {
              let data_set = JSON.stringify(data);
              resolve('Ganancias por referidos actualizado con exito');
            })
            .catch((err) => {
              reject(err)
            });
        });
      },
    // ACTUALIZAR SALDO MINIMO DE RETIRO
    UpdateMinWithdrawal(minwithd) {
      return new Promise((resolve, reject) => {
        TH.update(
          {
            min_withdrawal: minwithd
          }, { where:{
                id: 3
          }})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Saldo Minimo de Retiro actualizado con exito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR PAQUETES
    CreatePackages(name, price, duration, amount, maintance) {
        return new Promise((resolve, reject) => {
        Paquetes.create({ name: name, price: price, duration: duration, amount_th: amount, maintance_charge: maintance })
            .then((data) => {
                let data_set = JSON.stringify(data);
                resolve('Datos agregados satisfactoriamente');
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    // OBTENER TODOS LOS PAQUETES
    GetPackages() {
      return new Promise((resolve, reject) => {
        Paquetes.findAll()
          .then((data) => {
            let data_p = JSON.stringify(data);
            console.log(data)
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
}