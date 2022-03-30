const { DataTypes } = require('sequelize');
const db27 = require('../../config/dbPY27');

const Pais = db27.define('paises', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	paisnombre: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
});

module.exports = Pais;