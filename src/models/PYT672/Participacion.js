const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
const Grupos = require('./Grupos');
const Matriculas = require('./Matriculas');

// PARTICIPACION
const Participacion = db672.define('participaciones', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	porcentaje: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	n_leccion: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
});

Participacion.Grupos = Participacion.belongsTo(Grupos);
Participacion.Matriculas = Participacion.belongsTo(Matriculas);
module.exports = Participacion;