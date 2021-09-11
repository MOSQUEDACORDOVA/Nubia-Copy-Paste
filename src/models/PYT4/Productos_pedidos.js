const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');

const Productos_pedidos = db.define('productos_pedidos', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	product: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	cantidad_producto: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	metodo_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	monto_producto: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	tipo_venta: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},

});


module.exports = Productos_pedidos;

