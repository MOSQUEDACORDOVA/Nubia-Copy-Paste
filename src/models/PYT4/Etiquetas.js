const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Etiquetas = db.define('etiquetas', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	etiquetas: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	color: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
});

module.exports = Etiquetas;

