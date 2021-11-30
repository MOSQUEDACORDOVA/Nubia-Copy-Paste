const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
// PRECIO DE AEROCOIN
const AeroCoin = db24.define('aerocoin', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	price: {
		type: DataTypes.FLOAT(3),
		allowNull: false,
	},
});

module.exports = AeroCoin;