const { Op, where } = require("sequelize");
const db21 = require("../../config/dbPY21");
const bcrypt = require("bcrypt-nodejs");

module.exports = {
    //USUARIO
    RegUser(username, email, password) {
        return new Promise((resolve, reject) => {
        Usuarios.create({ username: username, email: email, password: password })
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