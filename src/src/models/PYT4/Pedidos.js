const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Clientes = require("../../models/PYT4/Clientes");
const Usuarios = require("../../models/PYT4/Usuarios");
const Personal = require("../../models/PYT4/Personal");
const Etiquetas = require("../../models/PYT4/Etiquetas");
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
	monto_total: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	metodo_pago: {
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
		defaultValue: 0
	},
	observacion: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	garrafon19L: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	botella1L: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	garrafon11L: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	botella5L: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	danados: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	deuda_anterior: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	total_garrafones_pedido: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	total_refill_pedido: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	total_canje_pedido: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	total_nv_pedido: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	total_obsequio_pedido: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	descuento: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},

});

Pedidos.Usuarios= Pedidos.belongsTo(Usuarios);
Pedidos.Clientes= Pedidos.belongsTo(Clientes);
Pedidos.Personal= Pedidos.belongsTo(Personal);
Pedidos.Etiquetas= Pedidos.belongsTo(Etiquetas);
//Pedidos.hasMany(Productos_pedidos, {as: 'Productos_'})

module.exports = Pedidos;

