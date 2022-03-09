const { DataTypes } = require('sequelize');
const db28 = require('../../config/dbPY28');
const Pais = require('../PYT28/Pais');

const Estados = db28.define('estados', {
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