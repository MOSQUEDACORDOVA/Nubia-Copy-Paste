const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Cupones = require('./Cupones')
const Clientes = require('./Clientes')
const Used_cupons = db.define('used_cupons', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	fecha_uso: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	usado_por: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
});

Used_cupons.Cupones= Used_cupons.belongsTo(Cupones);
Used_cupons.Clientes= Used_cupons.belongsTo(Clientes);

module.exports = Used_cupons;

