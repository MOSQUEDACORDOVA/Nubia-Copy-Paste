const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Clientes = require("../../models/PYT4/Clientes");
const Usuarios = require("../../models/PYT4/Usuarios");
const Productos_pedidos = require("../../models/PYT4/Productos_pedidos");
const Pedidos = db.define('pedidos', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	chofer: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	productos: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	monto_total: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	status_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	status_pedido: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	garrafones_prestamos: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	observacion: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},




});

Pedidos.Usuarios= Pedidos.belongsTo(Usuarios);
Pedidos.Clientes= Pedidos.belongsTo(Clientes);
Pedidos.hasMany(Productos_pedidos, {as: 'Productos_'})

module.exports = Pedidos;

