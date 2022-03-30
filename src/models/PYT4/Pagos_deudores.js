const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Pedidos = require("./Pedidos");
const Personal = require("./Personal");
const P_deudores = db.define('p_deudores', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	fecha_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	modo_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	monto: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});

P_deudores.Pedidos= P_deudores.belongsTo(Pedidos);
P_deudores.Personal= P_deudores.belongsTo(Personal);

module.exports = P_deudores;

