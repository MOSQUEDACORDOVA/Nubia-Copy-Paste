const { Op, where } = require("sequelize");
const db24 = require("../../config/dbPY24");
const bcrypt = require("bcrypt-nodejs");
const Usuarios = require("../../models/PYT24/Usuarios");
const TH = require("../../models/PYT24/th");
const Maquinas = require("../../models/PYT24/Maquinasth");
const Paquetes = require("../../models/PYT24/Packages");
const MPagos = require("../../models/PYT24/MetodosPago");
const Pays = require("../../models/PYT24/Payments");
const Depositos = require("../../models/PYT24/Depositos");
const MetodosRetiros = require("../../models/PYT24/Retreats");
const Referidos = require("../../models/PYT24/Referidos");

module.exports = {
    // REGISTRO DE USUARIOS
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
    // REGISTRO DE REFERIDOS
    RegReferUser(username, email, password) {
        return new Promise((resolve, reject) => {
        Usuarios.create({ username: username, email: email, password: password, type_user: 'Inversionista' })
          .then((data) => {
              let data_set = JSON.stringify(data);
              resolve(data_set);
          })
          .catch((err) => {
              reject(err)
          });
        });
    },
    // REFERIDOS USUARIO
    SearchUserRefer(code) {
        return new Promise((resolve, reject) => {
        Usuarios.findAll({ where: {
          refer_code: code
        }})
          .then((data) => {
              let data_set = JSON.stringify(data);
              resolve(data_set);
          })
          .catch((err) => {
              reject(err)
          });
        });
    },
    // CONVERITR USUARIO A VENDEDOR
    UserToSeller(id, refcode) {
        return new Promise((resolve, reject) => {
          Usuarios.update({
            type_user: 'Vendedor',
            refer_code: refcode
          }, { where: {
            id: id
          }})
            .then((data) => {
              let data_s = JSON.stringify(data);
              console.log(data_s)
              resolve('Permisos de vendedor añadidos a usuario satisfactoriamente');
            })
            .catch((err) => {
              reject(err)
            });
        });
    },
    // CONVERITR VENDEDOR A USUARIO
    SellerToUser(id) {
      return new Promise((resolve, reject) => {
        Usuarios.update({
          type_user: 'Inversionista',
          refer_code: null
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Permisos de vendedor removidos a usuario satisfactoriamente');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // SOLICITAR VERIFICACION DE CUENTA
    SolicitVerify(id, dni1, dni2) {
      return new Promise((resolve, reject) => {
        Usuarios.update({
          front_img_dni: dni1,
          back_img_dni: dni2,
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Datos de verificación agregados satisfactoriamente');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // VEERIFICAR CUENTA DE USUARIO
    VerifyUser(id) {
      return new Promise((resolve, reject) => {
        Usuarios.update({
          account_verified: 'Verificado'
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Cuenta de usuario verificada satisfactoriamente');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER CLIENTES VERIFICADOS
    GetAllVerifiedUsers() {
      return new Promise((resolve, reject) => {   
        Usuarios.findAll({ where: {
          account_verified: {
            [Op.eq]: 'Verificado',
          },
          type_user: {
            [Op.ne]: 'Administrador',
          },
        },
        include:[
          {association:Usuarios.Depositos},
        ],order: [
          ["id", "DESC"],
        ],})
        .then((data) => {
          let data_p = JSON.stringify(data);
          console.log(data)
          console.log("USUARIOS")
          resolve(data_p);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    // OBTENER CLIENTES NO VERIFICADOS
    GetAllUnVerifiedUsers() {
      return new Promise((resolve, reject) => {   
        Usuarios.findAll({ where: {
          account_verified: {
            [Op.eq]: 'No verificado',
          },
          type_user: {
            [Op.ne]: 'Administrador',
          },
        },
        include:[
          {association:Usuarios.Depositos},
        ],order: [
          ["id", "DESC"],
        ],})
        .then((data) => {
          let data_p = JSON.stringify(data);
          console.log(data)
          console.log("USUARIOS")
          resolve(data_p);
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
        MPagos.create({ transaction_type: 'Pago Movil', full_name: fullname, dni: dni, bank_name: bank_name, phone: phone})
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
        MPagos.findAll({ where: {status: 'Habilitado'}})
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
    // OBTENER CUENTAS PARA TRANSFERENCIAS BANCARIAS PARA CLIENTES
    GetBanks() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          status: 'Habilitado',
          transaction_type: 'Transferencia Bancaria'
        }})
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER CUENTAS PARA TRANSFERENCIAS BANCARIAS PARA ADMIN
    GetBanksAdmin() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          transaction_type: 'Transferencia Bancaria'
        }})
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER CUENTAS PARA PAGO MOVILPARA CLIENTES
    GetPaym() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          status: 'Habilitado',
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
    // OBTENER CUENTAS PARA PAGO MOVIL PARA ADMIN
    GetPaymAdmin() {
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
    // OBTENER CUENTAS PARA RETIRO EN BTC CLIENTES
    GetBTC() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          status: 'Habilitado',
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
    // OBTENER CUENTAS PARA RETIRO EN BTC ADMIN
    GetBTCAdmin() {
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
    // OBTENER CUENTAS PARA RETIRO EN BTC PARA CLIENTES
    GetDigWallet() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          status: 'Habilitado',
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
    // OBTENER CUENTAS PARA RETIRO EN BTC PARA ADMIN
    GetDigWalletAdmin() {
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
    // ACTUALIZAR METODOS DE PAGO TRASNFERENCIAS
    UpdatePayMethodTransf(id, ttype, name, dni, bank_name, type_account, num_account){
      return new Promise((resolve, reject) => {
        MPagos.update({
          transaction_type: ttype,
          full_name: name,
          dni: dni,
          bank_name: bank_name,
          type_account: type_account,
          num_account: num_account,
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Metodo actualizado');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ACTUALIZAR METODOS DE PAGO PAGO MOVIL
    UpdatePayMethodPaym(id, ttype, name, dni, bank_name, phone,){
      return new Promise((resolve, reject) => {
        MPagos.update({
          transaction_type: ttype,
          full_name: name,
          dni: dni,
          bank_name: bank_name,
          phone: phone,
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Metodo actualizado');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ACTUALIZAR METODOS DE PAGO BTC
    UpdatePayMethodBTC(id, ttype, code_wallet){
      return new Promise((resolve, reject) => {
        MPagos.update({
          transaction_type: ttype,
          code_wallet: code_wallet
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Metodo actualizado');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ACTUALIZAR METODOS DE PAGO BILLETERA
    UpdatePayMethodDWallet(id, ttype, email_wallet){
      return new Promise((resolve, reject) => {
        MPagos.update({
          transaction_type: ttype,
          digital_wallet_email: email_wallet
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Metodo actualizado');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // HABILITAR / DESHABILITAR METODOS DE PAGO
    UpdateStatusPayMethod(id, status){
      return new Promise((resolve, reject) => {
        MPagos.update({
          status: status,
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Estatus actualizado');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ELIMINAR METODOS DE PAGO
    DeletePayMethod(id){
      return new Promise((resolve, reject) => {
        MPagos.destroy({where:{
          id: id
        }
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve('data_p');
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
    // ELIMINAR MAQUINA DE MINADO
    DeleteMachineTH(id) {
      return new Promise((resolve, reject) => {
        Maquinas.destroy({where:{
          id: id
        }
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve('data_p');
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
    // ACTUALIZAR MAQUINAS DE MINADO
    UpdateMachineTH(id, sold, aval) {
      return new Promise((resolve, reject) => {
        Maquinas.update({
          sold_out: sold,
          avalible: aval,
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data)[0];
            console.log(data_s)
            resolve('DATOS DE MAQUINA ACTUALIZADOS !!');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR DEPOSITO
    CreateDeposits(ttype, name, dni, email, amount, bank_name, num_account, type_account, phone, code_wallet, digital_wallet_email, voucher, num_reference, id_pack, id_method, id_user) {
      console.log(id_pack)
      console.log(id_user)
      console.log("IOIDDDDDADASDAD")
        return new Promise((resolve, reject) => {
          Depositos.create({ transaction_type: ttype, name: name, dni: dni, email: email, amount: amount, bank_name: bank_name, num_account: num_account, type_account: type_account, phone: phone, code_walle: code_wallet, digital_wallet_email: digital_wallet_email, voucher: voucher, num_reference: num_reference, paqueteId: id_pack, metodosPagoId: id_method, usuarioId: id_user })
            .then((data) => {
                let data_set = JSON.stringify(data);
                resolve(data_set);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    // OBTENER TODOS LOS DEPOSITOS PENSDIENTES TRANSFERENCIAS
    GetAllPendingDepositsTransf(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where: {transaction_type: 'Transferencia Bancaria', status: 'No verificado'},
          include:[
          {association:Depositos.Paquetes},
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS DEPOSITOS PENSDIENTES PAGO MOVIL
    GetAllPendingDepositsPaym(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where: {transaction_type: 'Pago Movil', status: 'No verificado'},
          include:[
          {association:Depositos.Paquetes},
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS DEPOSITOS PENSDIENTES BTC
    GetAllPendingDepositsBTC(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where: {transaction_type: 'BTC', status: 'No verificado'},
          include:[
          {association:Depositos.Paquetes},
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS DEPOSITOS PENSDIENTES BILLETERA DIGITAL
    GetAllPendingDepositsWallet(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where: {transaction_type: 'Billetera Digital', status: 'No verificado'},
          include:[
          {association:Depositos.Paquetes},
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS DEPOSITOS REALIZADOS TRANSFERENCIAS
    GetAllCompleteDepositsTransf(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where: {transaction_type: 'Transferencia Bancaria', status: 'Aprobado'},
          include:[
          {association:Depositos.Paquetes},
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS DEPOSITOS REALIZADOS PAGO MOVIL
    GetAllCompleteDepositsPaym(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where: {transaction_type: 'Pago Movil', status: 'Aprobado'},
          include:[
          {association:Depositos.Paquetes},
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS DEPOSITOS REALIZADOS BTC
    GetAllCompleteDepositsBTC(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where: {transaction_type: 'BTC', status: 'Aprobado'},
          include:[
          {association:Depositos.Paquetes},
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS DEPOSITOS REALIZADOS BILLETERA DIGITAL
    GetAllCompleteDepositsWallet(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where: {transaction_type: 'Billetera Digital', status: 'Aprobado'},
          include:[
          {association:Depositos.Paquetes},
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER CAPITAL INVERTIDO DE TODOS LOS DEPOSITOS
    GetAllDepositsBoardUser(id) {
      return new Promise((resolve, reject) => {
        Depositos.findAll({where: {status: {
          [Op.ne]: 'No verificado'
        }, usuarioId: id}})
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS DEPOSITOS DE USUARIOS CON PAQUETES
    GetAllDepositsUser(id){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where:{usuarioId: id},
          include:[
            {association:Depositos.Paquetes },
          ],order: [
            ["id", "DESC"],
          ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS DEPOSITOS DE USUARIOS CON PAQUETES
    GetAllDepositsAdmin(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where:{status: {
          [Op.ne]: 'No verificado'
        }},
          include:[
            {association:Depositos.Paquetes },
          ],order: [
            ["id", "DESC"],
          ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER DEPOSITOS DE USUARIOS BILLETERA DIGITAL
    GetDepositsTransf(id){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where:{transaction_type: 'Transferencia Bancaria', usuarioId: id},
          include:[
          {association:Depositos.Paquetes },
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER DEPOSITOS DE USUARIOS PAGO MOVIL
    GetDepositsPaym(id){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where:{transaction_type: 'Pago Movil', usuarioId: id},
          include:[
          {association:Depositos.Paquetes },
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER DEPOSITOS DE USUARIOS BTC
    GetDepositsBTC(id){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where:{transaction_type: 'BTC', usuarioId: id},
          include:[
          {association:Depositos.Paquetes },
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER DEPOSITOS DE USUARIOS BILLETERA DIGITAL
    GetDepositsWallet(id){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where:{transaction_type: 'Billetera Digital', usuarioId: id},
          include:[
          {association:Depositos.Paquetes },
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER DEPOSITOS DE USUARIOS TRANSFERENCIAS ADMIN
    GetDepositsTransfAdmin(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where:{transaction_type: 'Transferencia Bancaria'},
          include:[
          {association:Depositos.Paquetes },
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER DEPOSITOS DE USUARIOS PAGO MOVIL ADMIN
    GetDepositsPaymAdmin(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where:{transaction_type: 'Pago Movil'},
          include:[
          {association:Depositos.Paquetes },
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER DEPOSITOS DE USUARIOS BTC ADMIN
    GetDepositsBTCAdmin(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where:{transaction_type: 'BTC'},
          include:[
          {association:Depositos.Paquetes },
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER DEPOSITOS DE USUARIOS BILLETERA DIGITAL ADMIN
    GetDepositsWalletAdmin(){
      return new Promise((resolve, reject) => {
        Depositos.findAll({where:{transaction_type: 'Billetera Digital'},
          include:[
          {association:Depositos.Paquetes },
          {association:Depositos.MetodosPagos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CULMINAR DEPOSITOS
    CulminateDeposits(id){
      return new Promise((resolve, reject) => {
        Depositos.update({
          status: 'Finalizado',
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data)[0];
            console.log(data_s)
            resolve('DEPOSITO FINALIZADO !!');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // APROBAR DEPOSITOS
    UpdateDeposits(id, activated, culminated){
      return new Promise((resolve, reject) => {
        Depositos.update({
          status: 'Aprobado',
          activatedAt: activated,
          culmination: culminated,
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data)[0];
            console.log(data_s)
            resolve('DEPOSITO APROBADO !!');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR METODO DE RETIRO TRANSFERENCIA BANCARIA
    AddRetreatsBank(fullname, dni, bank_name, type_account, num_account, uId) {
      return new Promise((resolve, reject) => {
        MetodosRetiros.create({ transaction_type: 'Transferencia Bancaria', full_name: fullname, dni: dni, bank_name: bank_name, type_account: type_account, num_account: num_account, usuarioId: uId})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de retiro (trasnferencia Bancaria) registrado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR METODO DE RETIRO, PAGO MOVIL
    AddRetreatsPaym(fullname, dni, bank_name, phone, uId) {
      return new Promise((resolve, reject) => {
        MetodosRetiros.create({ transaction_type: 'Pago Movil', full_name: fullname, dni: dni, bank_name: bank_name, phone: phone, usuarioId: uId})
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve('Nuevo metodo de retiro (Pago Movil) registrado con éxito');
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    // CREAR METODO DE RETIRO, RETIRO EN BTC
    AddRetreatsBTC(code_wallet, uId) {
      return new Promise((resolve, reject) => {
        MetodosRetiros.create({ transaction_type: 'BTC', code_wallet: code_wallet, usuarioId: uId })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de retiro (RETIRO EN BTC) registrado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR METODO DE RETIRO, BILLETERA DIGITAL
    AddRetreatsDigitalWallet(email, uId) {
      return new Promise((resolve, reject) => {
        MetodosRetiros.create({ transaction_type: 'Billetera Digital', digital_wallet_email: email, usuarioId: uId })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de retiro (BILLETERA DIGITAL) registrado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ELIMINAR METODOS DE RETIRO
    DeleteMRetreats(id){
      return new Promise((resolve, reject) => {
        MetodosRetiros.destroy({where:{
          id: id
        }
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve('data_p');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ACTUALIZAR METODOS DE RETIRO TRASNFERENCIAS
    UpdateRetreatsTransf(id, name, dni, bank_name, type_account, num_account){
      return new Promise((resolve, reject) => {
        MetodosRetiros.update({
          full_name: name,
          dni: dni,
          bank_name: bank_name,
          type_account: type_account,
          num_account: num_account,
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Metodo actualizado');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ACTUALIZAR METODOS DE RETIRO PAGO MOVIL
    UpdateRetreatsPaym(id, name, dni, bank_name, phone,){
      return new Promise((resolve, reject) => {
        MetodosRetiros.update({
          full_name: name,
          dni: dni,
          bank_name: bank_name,
          phone: phone,
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Metodo actualizado');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ACTUALIZAR METODOS DE RETIRO BTC
    UpdateRetreatsBTC(id, code_wallet){
      return new Promise((resolve, reject) => {
        MetodosRetiros.update({
          code_wallet: code_wallet
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Metodo actualizado');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ACTUALIZAR METODOS DE RETIRO BILLETERA
    UpdateRetreatsDWallet(id, email_wallet){
      return new Promise((resolve, reject) => {
        MetodosRetiros.update({
          digital_wallet_email: email_wallet
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve('Metodo actualizado');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER METODOS DE RETIROS DE USUARIOS TRANSFERENCIAS
    GetMRetreatsTransf(id){
      return new Promise((resolve, reject) => {
        MetodosRetiros.findAll({where:{transaction_type: 'Transferencia Bancaria', usuarioId: id},
          include:[
          {association:MetodosRetiros.Usuarios },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER METODOS DE RETIROS DE USUARIOS PAGO MOVIL
    GetMRetreatsPaym(id){
      return new Promise((resolve, reject) => {
        MetodosRetiros.findAll({where:{transaction_type: 'Pago Movil', usuarioId: id},
          include:[
          {association:MetodosRetiros.Usuarios },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER METODOS DE RETIROS DE USUARIOS BTC
    GetMRetreatsBTC(id){
      return new Promise((resolve, reject) => {
        MetodosRetiros.findAll({where:{transaction_type: 'BTC', usuarioId: id},
          include:[
          {association:MetodosRetiros.Usuarios },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER METODOS DE RETIROS DE USUARIOS BILLETERA DIGITAL
    GetMRetreatsWallet(id){
      return new Promise((resolve, reject) => {
        MetodosRetiros.findAll({where:{transaction_type: 'Billetera Digital', usuarioId: id},
          include:[
          {association:MetodosRetiros.Usuarios },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR PAGO (RETIRO) PARA USUARIO
    CreatePaymenthsUser(id, price, paqid, depid) {
      return new Promise((resolve, reject) => {
        Pays.create({ amount: price, usuarioId: id, paqueteId: paqid, depositoId: depid })
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
    // OBTENER RETIROS COMPLETADOS DE USUARIOS
    GetPaymenthsUser(id) {
      return new Promise((resolve, reject) => {
        Pays.findAll({where:{status: 'Pagado', usuarioId: id},
          include:[
          {association:Pays.Usuarios },
          {association:Pays.Paquetes },
          {association:Pays.MetodosRetiros },
          {association:Pays.Depositos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER RETIROS SOLICITADOS DE USUARIOS
    GetPendingPaymenthsUser(id) {
      return new Promise((resolve, reject) => {
        Pays.findAll({where:{ status: 'Pendiente', usuarioId: id },
          include:[
          {association:Pays.Usuarios },
          {association:Pays.Paquetes },
          {association:Pays.MetodosRetiros },
          {association:Pays.Depositos, where: {
            status: 'Finalizado'
          }},
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER PAGOS REALIZADOS DE USUARIOS ADMIN
    GetPaymenthsAdmin() {
      return new Promise((resolve, reject) => {
        Pays.findAll({where:{status: 'Pagado' },
          include:[
          {association:Pays.Usuarios },
          {association:Pays.Paquetes },
          {association:Pays.MetodosRetiros },
          {association:Pays.Depositos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER RETIROS SOLICITADOS DE USUARIOS ADMIN
    GetPendingPaymenthsAdmin() {
      return new Promise((resolve, reject) => {
        Pays.findAll({where:{status: 'Solicitado' },
          include:[
          {association:Pays.Usuarios },
          {association:Pays.Paquetes },
          {association:Pays.MetodosRetiros },
          {association:Pays.Depositos },
        ],order: [
          ["id", "DESC"],
        ],
        })
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve(data_p);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // SOLICITAR PAGO USUARIO
    SolicitPay(id) {
      return new Promise((resolve, reject) => {
        Pays.update(
          {
            status: 'Solicitado'
          }, { where:{
              id: id
          }})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Pago solicitado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // PAGAR A USUARIO
    PayUser(id, idMethod) {
      return new Promise((resolve, reject) => {
        Pays.update(
          {
            status: 'Pagado',
            metodosRetiroId: idMethod,
          }, { where:{
              id: id
          }})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Pago realizado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CONTROL DE TH PRECIO, % DE MANTENIMIENTO, % DE ERROR, GANANCIAS POR REFERIDOS, SALDO MINIMO DE RETIRO
    ControlTH(price, maintance, error, minwithd) {
        return new Promise((resolve, reject) => {
        TH.create({ price: price, percentage_maintance: maintance, percentage_error: error, min_withdrawal: minwithd })
            .then((data) => {
                let data_set = JSON.stringify(data);
                resolve('Datos agregados satisfactoriamente');
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    // MOSTRAR DATOS GUARDADOS, CONTROL DE TH PRECIO, % DE MANTENIMIENTO, % DE ERROR, SALDO MINIMO DE RETIRO
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
    UpdatePriceTH(id, price) {
        return new Promise((resolve, reject) => {
          TH.update(
            {
              price: price
            }, { where:{
                id: id
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
    UpdateMaintance(id, maintance) {
        return new Promise((resolve, reject) => {
          TH.update(
            {
              percentage_maintance: maintance
            }, { where:{
                id: id
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
    UpdateError(id, error) {
        return new Promise((resolve, reject) => {
          TH.update(
            {
              percentage_error: error
            }, { where:{
                id: id
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
    UpdateRefEarnings(id, earnings) {
        return new Promise((resolve, reject) => {
          TH.update(
            {
              ref_earnings: earnings
            }, { where:{
                id: id
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
    UpdateMinWithdrawal(id, minwithd) {
      return new Promise((resolve, reject) => {
        TH.update(
          {
            min_withdrawal: minwithd
          }, { where:{
                id: id
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
    // CREAR PAQUETES PERSONALIZADOS
    CreatePackagesPers(price, duration, amount, maintance) {
      return new Promise((resolve, reject) => {
        Paquetes.create({ price: price, duration: duration, amount_th: amount, maintance_charge: maintance })
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
    // ACTUALIZAR SALDO MINIMO DE RETIRO
    UpdatePackages(id, name, price, duration, amount, maintance) {
      return new Promise((resolve, reject) => {
      Paquetes.update(
          {
            name: name, price: price, duration: duration, amount_th: amount, maintance_charge: maintance
          }, { where:{
                id: id
          }})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Paquete actualizado con exito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // ELIMINAR PAQUETES
    DeletePackages(id){
      return new Promise((resolve, reject) => {
        Paquetes.destroy({where:{
          id: id
        }
        },)
          .then((data) => {
            let data_p = JSON.stringify(data);
            resolve('data_p');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER TODOS LOS PAQUETES
    GetPackages() {
      return new Promise((resolve, reject) => {
        Paquetes.findAll({
          where: {
            name: {
              [Op.ne]: null
            }
          }
        })
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