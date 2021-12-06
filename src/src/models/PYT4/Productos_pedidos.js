const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');

const Productos_pedidos = db.define('productos_pedidos', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	garrafon19L: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	botella1L: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	garrafon11L: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	botella5L: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
});


module.exports = Productos_pedidos;

