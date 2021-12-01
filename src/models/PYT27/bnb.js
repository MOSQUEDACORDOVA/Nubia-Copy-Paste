const { DataTypes } = require('sequelize');
const db27 = require('../../config/dbPY27');
// PRECIO DE BNB
const bnb = db27.define('bnbs', {
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

module.exports = bnb;