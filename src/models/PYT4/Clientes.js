const { DataTypes } = require('sequelize');
const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const CoP = require("../../models/PYT4/CP");
const Etiquetas = require("../../models/PYT4/Etiquetas");
const Clientes = db.define('clientes', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	firstName: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	lastName: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	ciudad: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	estado: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	municipio: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	fraccionamiento: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	coto: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	casa: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	calle: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	avenida: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	cuponera: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	telefono: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	nombre_familiar_1: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	apellido_familiar_1: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: ""
	},
	telefono_familiar_1: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	nombre_familiar_2: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	apellido_familiar_2: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	telefono_familiar_2: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	fecha_ultimo_pedido: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	utimos_botellones: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	email: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	nuevo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	sucursal: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	referencia: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	referido_de: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	cantidad_referidos: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	monto_nuevo: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	enabled: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 1
	},
	titulo: {
		type: DataTypes.STRING(2),
		allowNull: true,
		defaultValue: 'A'
	},



});

Clientes.CoP= Clientes.belongsTo(CoP);
Clientes.Etiquetas= Clientes.belongsTo(Etiquetas);
module.exports = Clientes;

