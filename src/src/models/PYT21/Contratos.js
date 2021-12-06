const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY21');
// CONTRATOS
const Contratos = db24.define('contratos', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	duration: {
		type: DataTypes.INTEGER(100),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La duración del paquete es obligatoria'
			}
		}
	},
    min_earnings: {
        type: DataTypes.INTEGER(255),
        allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El valor mínimo de ganancias es obligatorio'
			}
		}
    },
    max_earnings: {
        type: DataTypes.INTEGER(255),
        allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El valor máximo de ganancias es obligatorio'
			}
		}
    },
    bond: {
        type: DataTypes.INTEGER(255),
        allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El bono de contrato es obligatorio'
			}
		}
    },
});

module.exports = Contratos;