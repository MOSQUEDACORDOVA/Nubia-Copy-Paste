const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
// MAQUINAS DE MINADO
const Maquinas = db24.define('maquinas_ths', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	th_capacity: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	sold_out: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	avalible: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
});

module.exports = Maquinas;