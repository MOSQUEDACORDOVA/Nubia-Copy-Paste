const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');

// ESTUDIANTES
const TipoEstudiante = db672.define('tipo_estudiantes', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	tipo: {
		type: DataTypes.STRING(200),
		allowNull: false
	}
});

module.exports = TipoEstudiante;