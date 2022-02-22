const { DataTypes } = require('sequelize');
const db28 = require('../../config/dbPY28');

const Pais = db28.define('paises', {
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