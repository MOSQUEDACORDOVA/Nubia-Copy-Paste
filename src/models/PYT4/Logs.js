const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const logsUse = db.define('logsUse', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	id_user: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	type: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	tfunction: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	description: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
});


module.exports = logsUse;

