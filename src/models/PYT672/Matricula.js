const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Estudiantes = require('../../models/PYT672/Estudiantes');
const Grupos = require('../../models/PYT672/Grupos');

// MATRICULA
const Matricula = db672.define('matriculas', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
});

module.exports = Matricula;