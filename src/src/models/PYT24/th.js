const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
// CONTROL DE TH PRECIO, % DE MANTENIMIENTO, % DE ERROR, GANANCIAS POR REFERIDOS, SALDO MINIMO DE RETIRO
const TH = db24.define('ths', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	price: {
		type: DataTypes.INTEGER(255),
		allowNull: false,
	},
	percentage_maintance: {
		type: DataTypes.INTEGER(255),
		allowNull: false,
	},
	percentage_error: {
		type: DataTypes.INTEGER(255),
		allowNull: false,
	},
    ref_earnings: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
		defaultValue: 0
    },
	min_withdrawal: {
		type: DataTypes.INTEGER(255),
		allowNull: false
	}
});

module.exports = TH;