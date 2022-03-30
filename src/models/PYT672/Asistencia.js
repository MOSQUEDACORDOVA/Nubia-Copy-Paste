const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Grupos = require('../../models/PYT672/Grupos');
const Matriculas = require('../../models/PYT672/Matriculas');

// ASISTENCIAS
const Asistencia = db672.define('asistencias', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	n_leccion: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	h_e: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue: '-'
	},
	h_s: {
		type: DataTypes.STRING(255),
		allowNull: true,
		defaultValue:'-'
	},
});

Asistencia.Grupos = Asistencia.belongsTo(Grupos);
Asistencia.Matriculas = Asistencia.belongsTo(Matriculas);
module.exports = Asistencia;