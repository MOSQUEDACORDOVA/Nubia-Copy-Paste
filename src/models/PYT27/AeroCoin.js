const { DataTypes } = require('sequelize');
const db27 = require('../../config/dbPY27');
// PRECIO DE AEROCOIN
const AeroCoin = db27.define('aerocoin', {
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