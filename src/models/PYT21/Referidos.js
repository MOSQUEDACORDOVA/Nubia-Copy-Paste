const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY21');
const bcrypt = require('bcrypt-nodejs');
//const Usuarios = require('../../models/PYT21/Usuarios');

// Referidos
const Referidos = db24.define('referidos', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	level: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	earnings: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
});

//Referidos.UsuarioReferido = Referidos.hasOne(Usuarios);
//Referidos.Usuarios = Referidos.hasOne(Usuarios);
module.exports = Referidos;