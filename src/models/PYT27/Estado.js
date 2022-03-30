const { DataTypes } = require('sequelize');
const db27 = require('../../config/dbPY27');
const Pais = require('../../models/PYT27/Pais');

const Estados = db27.define('estados', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	estadonombre: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
});

Estados.Pais = Estados.belongsTo(Pais);
module.exports = Estados;