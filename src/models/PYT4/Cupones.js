const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require ('./Usuarios')
const Cupones = db.define('cupones', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre_cupon: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	nombre_proveedor: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},	
	ws_proveedor: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	fecha_inicio: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	fecha_final: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	cantidad: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	cantidad_actual: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	categoria: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	especial: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},	
	img: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	
});
Cupones.Usuarios= Cupones.belongsTo(Usuarios);

// Métodos personalizados
module.exports = Cupones;

