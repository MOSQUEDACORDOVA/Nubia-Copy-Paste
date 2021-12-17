const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Recarga = db.define('Recarga', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	recarga: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
});


module.exports = Recarga;

