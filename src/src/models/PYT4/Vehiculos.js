const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');

const Vehiculos = db.define('vehiculos', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	matricula: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	marca: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	modelo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	anio: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	capacidad: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	status: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	sucursal: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});




module.exports = Vehiculos;

