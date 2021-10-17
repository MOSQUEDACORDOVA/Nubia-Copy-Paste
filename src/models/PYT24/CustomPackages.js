const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
// PAQUETES
const PAQUETESPERSONALIZADOS = db24.define('paquetes_personalizados', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
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
    }
});

module.exports = PAQUETESPERSONALIZADOS;