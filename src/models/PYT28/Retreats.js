const { DataTypes } = require('sequelize');
const db28 = require('../../config/dbPY28');
const Usuarios = require('../../models/PYT28/Usuarios');

// METODOS DE RETIRO USUARIOS
const MetodosRetiros = db28.define('metodos_retiros', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	transaction_type: {
		type: DataTypes.STRING(30),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El tipo de transación es obligatorio'
			}
		}
	},
	full_name: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
    dni: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    bank_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    type_account: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    num_account: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    code_wallet: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    digital_wallet_email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
			isEmail: {
				msg: 'Agrega un correo válido'
			},
        }
    },
});

MetodosRetiros.Usuarios = MetodosRetiros.belongsTo(Usuarios);
module.exports = MetodosRetiros;