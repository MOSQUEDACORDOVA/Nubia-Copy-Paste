const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY21');
const Usuarios = require('../../models/PYT21/Usuarios');
const Paquetes = require('../../models/PYT21/Packages');
const MetodosPagos = require('../../models/PYT21/MetodosPago');
// DEPOSITOS

const Depositos = db24.define('depositos', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	transaction_type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	dni: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	bank_name: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	num_account: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: 0
	},
	type_account: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	phone: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	code_wallet: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	digital_wallet_email: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	voucher: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	num_reference: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	status: {
		type: DataTypes.STRING(100),
		allowNull: false,
		defaultValue: 'No verificado'
	},
	activatedAt: {
		type: DataTypes.STRING(100),
		allowNull: true,
		defaultValue: null
	},
	culmination: {
		type: DataTypes.STRING(100),
		allowNull: true,
		defaultValue: null
	},
	earnings: {
		type: DataTypes.INTEGER(255),
		allowNull: true,
		defaultValue: 0
	}
});

Depositos.Paquetes = Depositos.belongsTo(Paquetes);
Depositos.MetodosPagos = Depositos.belongsTo(MetodosPagos);
module.exports = Depositos;