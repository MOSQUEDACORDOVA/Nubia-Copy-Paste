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
		type: DataTypes.STRING(30),
		allowNull: false,
	},
	earnings: {
		type: DataTypes.STRING(250),
		allowNull: false,
	},
});

Referidos.Usuarios = Referidos.belongsTo(Usuarios);
module.exports = Referidos;