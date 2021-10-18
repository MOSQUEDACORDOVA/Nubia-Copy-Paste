const { Op, where } = require("sequelize");
const db24 = require("../../config/dbPY24");
const bcrypt = require("bcrypt-nodejs");
const Usuarios = require("../../models/PYT24/Usuarios");
const TH = require("../../models/PYT24/th");
const Maquinas = require("../../models/PYT24/Maquinasth");
const Paquetes = require("../../models/PYT24/Packages");
const MPagos = require("../../models/PYT24/MetodosPago");

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
    // CREAR METODO DE PAGO TRANSFERENCIA BANCARIA
    AddBank(fullname, dni, bank_name, type_account, num_account) {
      return new Promise((resolve, reject) => {
        MPagos.create({ transaction_type: 'Transferencia Bancaria', full_name: fullname, dni: dni, bank_name: bank_name, type_account: type_account, num_account: num_account })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de pago (trasnferencia Bancaria) registrado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR METODO DE PAGO, PAGO MOVIL
    AddPaym(fullname, dni, bank_name, phone) {
      return new Promise((resolve, reject) => {
        MPagos.create({ transaction_type: 'Pago Movil', full_name: fullname, dni: dni, bank_name: bank_name, phone: phone })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de pago (Pago Movil) registrado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR METODO DE PAGO, RETIRO EN BTC
    AddBTC(code_wallet) {
      return new Promise((resolve, reject) => {
        MPagos.create({ transaction_type: 'BTC', code_wallet: code_wallet })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de pago (RETIRO EN BTC) registrado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR METODO DE PAGO, BILLETERA DIGITAL
    AddDigitalWallet(email) {
      return new Promise((resolve, reject) => {
        MPagos.create({ transaction_type: 'Billetera Digital', digital_wallet_email: email })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de pago (BILLETERA DIGITAL) registrado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS METODOS DE PAGO
    GetAllPaym() {
      return new Promise((resolve, reject) => {
        MPagos.findAll()
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
    // OBTENER CUENTAS PARA TRANSFERENCIAS BANCARIAS
    GetBanks() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          transaction_type: 'Transferencia Bancaria'
        }})
          .then((data) => {
            let data_p = JSON.stringify(data);
            console.log("TRANSFERENCIASSSSS")
            console.log(data)
            console.log("TRANSFERENCIASSSSS")
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER CUENTAS PARA PAGO MOVIL
    GetPaym() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          transaction_type: 'Pago Movil'
        }})
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
    // OBTENER CUENTAS PARA RETIRO EN BTC
    GetBTC() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          transaction_type: 'BTC'
        }})
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
    // OBTENER CUENTAS PARA RETIRO EN BTC
    GetDigWallet() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          transaction_type: 'Billetera Digital'
        }})
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