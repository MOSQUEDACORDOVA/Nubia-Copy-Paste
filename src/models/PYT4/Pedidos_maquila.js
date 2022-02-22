const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Clientes_maquila = require("./Clientes_maquila");
const Usuarios = require("./Usuarios");
//const Personal = require("./Personal");
const Etiquetas = require("./Etiquetas");
const Pedidos_maquila = db.define('pedidos_maquila', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	monto_total: {
		type: DataTypes.FLOAT,
		allowNull: true,
	},
		fecha_pedido: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	metodo_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	status_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	status_pedido: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	motivo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	garrafones_prestamos: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	observacion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	rellenos: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	bwater: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	danados: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	deuda_anterior: {
		type: DataTypes.FLOAT,
		allowNull: true,
		defaultValue: 0
	},
	total_garrafones_pedido: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	total_monto_rellenos: {
		type: DataTypes.FLOAT,
		allowNull: true,
		defaultValue: 0
	},
	total_monto_bwater: {
		type: DataTypes.FLOAT,
		allowNull: true,
		defaultValue: 0
	},
	descuento: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},

});

Pedidos_maquila.Usuarios= Pedidos_maquila.belongsTo(Usuarios);
Pedidos_maquila.Clientes_maquila= Pedidos_maquila.belongsTo(Clientes_maquila);
//Pedidos.Personal= Pedidos.belongsTo(Personal);
//Pedidos.Etiquetas= Pedidos.belongsTo(Etiquetas);
//Pedidos.hasMany(Productos_pedidos, {as: 'Productos_'})

module.exports = Pedidos_maquila;

