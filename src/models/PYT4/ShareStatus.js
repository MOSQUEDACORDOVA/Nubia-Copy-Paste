const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const CompartirStatus = db.define('compartir_status', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	idPedido: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	CompartirStatus: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
});


module.exports = CompartirStatus;

