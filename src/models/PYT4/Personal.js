const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');

const Personal = db.define('personal', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	fecha_ingreso: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	name: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	lastName: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	cargo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	salario: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	telefono: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	correo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	direccion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	sucursal: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});




module.exports = Personal;

