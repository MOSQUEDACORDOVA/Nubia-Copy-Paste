const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');

// ESTUDIANTES
const EstadoGrupos = db672.define('estados-grupos', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	estado: {
		type: DataTypes.STRING(200),
		allowNull: false,
	}
});

module.exports = EstadoGrupos;