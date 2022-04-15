const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Grupos = require('./Grupos');
const Matriculas = require('./Matriculas');

// NOTAS
const Notas = db672.define('notas', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nota: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	n_leccion: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	nivel: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	commentProfForm: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	commentAdminForm: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	

});

Notas.Grupos = Notas.belongsTo(Grupos);
Notas.Matriculas = Notas.belongsTo(Matriculas);
module.exports = Notas;