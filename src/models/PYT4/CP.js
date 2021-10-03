const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const CP = db.define('cp', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	cp: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	asentamiento: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	municipio: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
});

module.exports = CP;

