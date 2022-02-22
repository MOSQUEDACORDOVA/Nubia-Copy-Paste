const { DataTypes } = require('sequelize');
const db28 = require('../../config/dbPY28');
// PRECIO DE AEROCOIN
const AeroCoin = db28.define('aerocoin', {
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