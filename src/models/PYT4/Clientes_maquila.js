const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const CoP = require("./CP");
//const Etiquetas = require("../../models/PYT4/Etiquetas");
const Clientes_maquila = db.define('clientes_maquila', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	phone: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	placa: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	vehiculo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	email: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

});

//Clientes_maquila.CoP= Clientes.belongsTo(CoP);
module.exports = Clientes_maquila;

