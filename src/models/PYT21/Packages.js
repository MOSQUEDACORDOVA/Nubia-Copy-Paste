const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY21');
// PAQUETES
const PAQUETES = db24.define('paquetes', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING(30),
		allowNull: true,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El precio del paquete es obligatorip'
			}
		}
	},
	duration: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La duración del paquete es obligatoria'
			}
		}
	},
    amount_th: {
        type: DataTypes.INTEGER,
        allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La cantidad de TH es obligatoria'
			}
		}
    },
    maintance_charge: {
        type: DataTypes.INTEGER,
        allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El porcentaje de coste de mantenimiento es obligatorio'
			}
		}
    },
});

module.exports = PAQUETES;