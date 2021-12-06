const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const Vehiculos = require('./Vehiculos')
const Clientes = require('./Clientes')
const GPrestados = require('./GPrestados')
const Pedidos = require('./Pedidos')
const Personal = require('./Personal')
const Carga_init = require('./Carga_init')
const Usuarios = require('./Usuarios')
const Last_pedido = require('./Last_pedido')
const Etiquetas = require('./Etiquetas')
const Sucursales = db.define('sucursales', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	direccion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	logitud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	latitud: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	telefono: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	gerente: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	telefono_gerente: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	id_gerente: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});

Sucursales.hasMany(Vehiculos, {as: 'Vehiculos'})
Sucursales.hasMany(Clientes, {as: 'Clientes'})
Sucursales.hasMany(GPrestados, {as: 'GPrestados'})
Sucursales.hasMany(Pedidos, {as: 'pedidos'})
Sucursales.hasMany(Personal, {as: 'Personal'})
Sucursales.hasMany(Carga_init, {as: 'Carga_init'})
Sucursales.hasMany(Usuarios, {as: 'Usuarios'})
Sucursales.hasMany(Last_pedido, {as: 'Last_pedido'})
Sucursales.hasMany(Etiquetas, {as: 'Etiquetas'})
module.exports = Sucursales;

