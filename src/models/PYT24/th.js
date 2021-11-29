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
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	percentage_maintance: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	percentage_error: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
    ref_earnings: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
	min_withdrawal: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
});

module.exports = TH;