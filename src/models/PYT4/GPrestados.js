const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Clientes = require('./Clientes')
const Personal = require('./Personal')
const GPrestados = db.define('gprestados', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	fecha_ingreso: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	cantidad: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	devueltos: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	status_pedido: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	fecha_devolucion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});


GPrestados.Clientes= GPrestados.belongsTo(Clientes);
GPrestados.Personal= GPrestados.belongsTo(Personal);
module.exports = GPrestados;

