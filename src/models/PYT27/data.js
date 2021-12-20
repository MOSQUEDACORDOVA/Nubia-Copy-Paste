const { Op, where } = require("sequelize");
const db27 = require("../../config/dbPY27");
const bcrypt = require("bcrypt-nodejs");
const Usuarios = require("../../models/PYT27/Usuarios");
const MPagos = require("../../models/PYT27/MetodosPago");
const Pays = require("../../models/PYT27/Payments");
const depositosaeros = require("../../models/PYT27/DepositosAero");
const MetodosRetiros = require("../../models/PYT27/Retreats");
const AeroCoin = require("../../models/PYT27/AeroCoin");

module.exports = {
    // REGISTRO DE USUARIOS
    RegUser(fname, lname, bdate, gender, dtype, numdoc, nationality, country, city, phone, address, username, email, password) {
        return new Promise((resolve, reject) => {
        Usuarios.create({first_name: fname, last_name: lname, date_of_birth: bdate, gender: gender, doc_type: dtype, num_document: numdoc, nationality: nationality, country: country, city: city, phone: phone, address: address, username: username, email: email, password: password, type_user: 'Inversionista' })
          .then((data) => {
              let data_set = JSON.stringify(data);
              resolve('Usuario registrado con éxito');
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
    // ACTUALIZAR PERFIL DE USUARIO
    UpdateProfileUser(id, firstName, lastName, dateOfBirth, gender, typedoc, num_doc, nationality, country, city, phone, address, username, email, status) {
      return new Promise((resolve, reject) => {
        Usuarios.update({
          first_name: firstName, last_name: lastName, date_of_birth: dateOfBirth, gender: gender, doc_type: typedoc, num_document: num_doc, nationality: nationality, country: country, city: city, phone: phone, address: address, username: username, email: email, status: status
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            resolve(data_s);
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
    // OBTENER INFORMACIÓN DE USUARIO
    GetUserInfo(id) {
      return new Promise((resolve, reject) => {
        Usuarios.findAll({ where: {id: id }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve(data_s);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // OBTENER DEPOSITO
    GetDepositUsers(id) {
      return new Promise((resolve, reject) => {
        depositosaeros.findOne({ where: { id: id }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            resolve(data_s);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // VERIFICAR CUENTA DE USUARIO
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
        }})
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
        }})
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
    // CREAR METODO DE PAGO, RETIRO EN BNB
    AddBNB(code_wallet) {
      return new Promise((resolve, reject) => {
        MPagos.create({ transaction_type: 'BNB', code_wallet: code_wallet })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de pago (PAGO EN BNB) registrado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR METODO DE PAGO, RETIRO EN USDT
    AddUSDT(code_wallet) {
      return new Promise((resolve, reject) => {
        MPagos.create({ transaction_type: 'USDT', code_wallet: code_wallet })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de pago (PAGO EN USDT) registrado con éxito');
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
    // OBTENER CUENTAS PARA PAGAR EN BNB CLIENTES
    GetBNB() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          status: 'Habilitado',
          transaction_type: 'BNB'
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
    // OBTENER CUENTAS PARA PAGAR EN USDT CLIENTES
    GetUSDT() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          status: 'Habilitado',
          transaction_type: 'USDT'
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
    // OBTENER CUENTAS PARA RETIRO EN BNB ADMIN
    GetBNBAdmin() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          transaction_type: 'BNB'
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
    // OBTENER CUENTAS PARA RETIRO EN USDT ADMIN
    GetUSDTAdmin() {
      return new Promise((resolve, reject) => {
        MPagos.findAll({where: {
          transaction_type: 'USDT'
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
    // ACTUALIZAR METODOS DE PAGO BTC, USDT, BNB
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
    // DAR AEROCOINS A USUARIO
    GiveCoinsToUser(id, amount) {
        return new Promise((resolve, reject) => {
          Usuarios.update({
            avalible_balance: amount,
          }, { where: {
            id: id
          }})
            .then((data) => {
              let data_s = JSON.stringify(data);
              console.log(data_s)
              resolve('MONEDAS AÑADIDAS SATISFACTORIAMENTE');
            })
            .catch((err) => {
              reject(err)
            });
        });
    },
    // OBTENER TODOS LOS DEPOSITOS PENSDIENTES BTC
    GetAllPendingDepositsAero(){
      return new Promise((resolve, reject) => {
        depositosaeros.findAll({where: {
          transaction_type: {
            [Op.or]: ['BTC', 'BNB', 'USDT'], 
          }, status: 'No verificado'},
          include:[
          {association: depositosaeros.MetodosPagos },
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
    // OBTENER TODOS LOS DEPOSITOS DE USUARIOS
    GetAllDepositsUser(id){
      return new Promise((resolve, reject) => {
        depositosaeros.findAll({where:{usuarioId: id},
          include:[
            {association:depositosaeros.MetodosPagos },
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
    // OBTENER DEPOSITOS DE USUARIOS BTC AERO
    GetDepositsBTCAero(id){
      return new Promise((resolve, reject) => {
        depositosaeros.findAll({where:{transaction_type: 'BTC', usuarioId: id},
          include:[
          {association:depositosaeros.MetodosPagos },
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
    // OBTENER DEPOSITOS AEROCOINS DE USUARIOS
    GetDepositsAeroBTC(id){
      return new Promise((resolve, reject) => {
        depositosaeros.findAll({where:{usuarioId: id},
          include:[
          {association: depositosaeros.MetodosPagos },
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
    // OBTENER AEROCOINS DE USUARIOS
    GetCoinsAeroBTC(id){
      return new Promise((resolve, reject) => {
        depositosaeros.findAll({where:{status: 'Aprobado', usuarioId: id},
          include:[
          {association: depositosaeros.MetodosPagos },
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
    // OBTENER BALANCE DE USUARIOS AEROCOIN
    GetBalanceCoinsUser(id){
      return new Promise((resolve, reject) => {
        Usuarios.findAll({where:{id: id}})
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
    GetAllPendingDepositsBTCAero(){
      return new Promise((resolve, reject) => {
        depositosaeros.findAll({where: {transaction_type: 'BTC', status: 'No verificado'},
          include:[
          {association:depositosaeros.MetodosPagos },
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
    // OBTENER TODOS LOS DEPOSITOS REALIZADOS BTC AEROCOINS
    GetAllCompleteDepositsAero(){
      return new Promise((resolve, reject) => {
        depositosaeros.findAll({where: {
          transaction_type: {
            [Op.ne]: 'Transferencia Bancaria',
            [Op.ne]: 'Pago Movil',
            [Op.ne]: 'Billetera Digital',
          }, status: {
            [Op.ne]: 'No verificado'
          }},
          include:[
          {association: depositosaeros.MetodosPagos },
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
    // APROBAR DEPOSITOS
    UpdateDepositsAero(id, activated){
      return new Promise((resolve, reject) => {
        depositosaeros.update({
          status: 'Aprobado',
          activatedAt: activated,
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data)[0];
            console.log(data_s)
            console.log("DEPOSITO APROBADO")
            resolve(data_s);
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // RECHAZAR DEPOSITOS
    RejectDeposit(id){
      return new Promise((resolve, reject) => {
        depositosaeros.update({
          status: 'Rechazado',
        }, { where: {
          id: id
        }})
          .then((data) => {
            let data_s = JSON.stringify(data);
            console.log(data_s)
            console.log("DEPOSITO RECHAZADO")
            resolve(data_s);
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
    // CREAR METODO DE RETIRO, RETIRO EN BNB
    AddRetreatsBNB(code_wallet, uId) {
      return new Promise((resolve, reject) => {
        MetodosRetiros.create({ transaction_type: 'BNB', code_wallet: code_wallet, usuarioId: uId })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de retiro (RETIRO EN BNB) registrado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // CREAR METODO DE RETIRO, RETIRO EN USDT
    AddRetreatsUSDT(code_wallet, uId) {
      return new Promise((resolve, reject) => {
        MetodosRetiros.create({ transaction_type: 'USDT', code_wallet: code_wallet, usuarioId: uId })
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Nuevo metodo de retiro (RETIRO EN USDT) registrado con éxito');
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
    UpdateRetreatsBTC(id, ttype, code_wallet){
      return new Promise((resolve, reject) => {
        MetodosRetiros.update({
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
    // OBTENER METODOS DE RETIROS DE USUARIOS BNB
    GetMRetreatsBNB(id){
      return new Promise((resolve, reject) => {
        MetodosRetiros.findAll({where:{transaction_type: 'BNB', usuarioId: id},
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
    // OBTENER METODOS DE RETIROS DE USUARIOS BNB
    GetMRetreatsUSDT(id){
      return new Promise((resolve, reject) => {
        MetodosRetiros.findAll({where:{transaction_type: 'USDT', usuarioId: id},
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
    // CONTROL AEROCOIN TH PRECIO ADMIN - USUARIOS
    GetControlAeroCoin() {
        return new Promise((resolve, reject) => {
          AeroCoin.findAll()
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
    // CONTROL AEROCOIN TH PRECIO ADMIN
    ControlAeroCoin(price) {
        return new Promise((resolve, reject) => {
        AeroCoin.create({ price: price })
            .then((data) => {
                let data_set = JSON.stringify(data);
                resolve('Datos agregados satisfactoriamente');
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    // ACTUALIZAR PRECIO AEROCOIN ADMIN
    UpdatePriceAeroCoin(id, price) {
      return new Promise((resolve, reject) => {
        AeroCoin.update(
          {
            price: price
          }, { where:{
              id: id
          }})
          .then((data) => {
            let data_set = JSON.stringify(data);
            resolve('Precio de AeroCoin actualizado con éxito');
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    // COMPRAR AEROCOINS USUARIOS
    BuyAeroCoin(name, dni, email, amountCoin, amount, refs, idmethod, userid) {
      return new Promise((resolve, reject) => {
        depositosaeros.create({ name: name, dni: dni, email: email, amountAero: amountCoin, price: amount, num_reference: refs, metodosPagoId: idmethod, usuarioId: userid })
        .then((data) => {
          console.log("DATOS AEROCOIN")
          let data_set = JSON.stringify(data);
          resolve(data_set);
        })
        .catch((err) => {
          console.log(err)
          console.log("ERROR AEROCOIN")
          reject(err);
        });
      });
    },
}