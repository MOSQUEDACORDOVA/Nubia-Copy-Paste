const { DataTypes } = require('sequelize');
const db27 = require('../../config/dbPY27');
// PRECIO DE BTC
const btc = db27.define('btcs', {
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

module.exports = btc;