const { Op, where } = require("sequelize");
const db24 = require("../../config/dbPY24");
const bcrypt = require("bcrypt-nodejs");
const Usuarios = require("../../models/PYT24/Usuarios");

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
}