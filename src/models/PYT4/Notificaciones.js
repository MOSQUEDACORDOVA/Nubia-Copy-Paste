const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Clientes = require ('./Clientes')
const Notificaciones = db.define('notificaciones', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	estado: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	descripcion: {
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
	destino: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},

	
	
});
Notificaciones.Clientes= Notificaciones.belongsTo(Clientes);
// Métodos personalizados
module.exports = Notificaciones;

