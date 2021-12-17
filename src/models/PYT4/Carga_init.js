const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Clientes = require('./Clientes')
const Personal = require('./Personal')
const Recargas = require('./Recargas')
const Carga_Init = db.define('carga_Init', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	fecha_ingreso: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	cantidad_inicial: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	recarga: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	cantidad_final: {
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


Carga_Init.Clientes= Carga_Init.belongsTo(Clientes);
Carga_Init.Personal= Carga_Init.belongsTo(Personal);
Carga_Init.hasMany(Recargas, {as: 'Recargas'})
module.exports = Carga_Init;

