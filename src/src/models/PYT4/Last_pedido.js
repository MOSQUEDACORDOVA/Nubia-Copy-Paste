const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Clientes = require("./Clientes");
const Usuarios = require("./Usuarios");
const Personal = require("./Personal");
const Pedidos = require("./Pedidos");
const Last_pedido = db.define('last_pedido', {
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
	total_nv_pedido: {
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

Last_pedido.Usuarios= Last_pedido.belongsTo(Usuarios);
Last_pedido.Clientes= Last_pedido.belongsTo(Clientes);
Last_pedido.Personal= Last_pedido.belongsTo(Personal);
Last_pedido.Pedidos= Last_pedido.belongsTo(Pedidos);
//Pedidos.hasMany(Productos_pedidos, {as: 'Productos_'})

module.exports = Last_pedido;

