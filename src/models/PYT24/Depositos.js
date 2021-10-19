const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
const Usuarios = require('../../models/PYT24/Usuarios');
const Paquetes = require('../../models/PYT24/Packages');
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
	email: {
		type: DataTypes.STRING(100),
		allowNull: true,
		validate: {
			isEmail: {
				msg: 'Agrega un correo válido'
			},
		}
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
		type: DataTypes.INTEGER,
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
});


module.exports = Depositos;