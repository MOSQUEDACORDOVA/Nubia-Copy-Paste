const { DataTypes } = require('sequelize');
const dbPasarela = require('../../config/dbPasarela');
// PRECIO DE AEROCOIN
const AeroCoin = dbPasarela.define('aerocoin', {
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