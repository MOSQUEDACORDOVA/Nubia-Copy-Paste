const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('../../models/PYT24/Usuarios');

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

Referidos.Usuarios = Referidos.hasOne(Usuarios);
module.exports = Referidos;