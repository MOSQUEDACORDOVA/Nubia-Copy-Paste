const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const Usuarios = require("./Usuarios");
const Personal = require("./Personal");
const Sucursales = require("./Sucursales");
const Gastos = db.define('gastos', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	monto: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	fecha: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	observacion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
});

Gastos.Usuarios= Gastos.belongsTo(Usuarios);
Gastos.Personal= Gastos.belongsTo(Personal);
Gastos.Sucursales= Gastos.belongsTo(Sucursales);

module.exports = Gastos;

