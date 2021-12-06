const { DataTypes } = require('sequelize');
const db672 = require('../../config/dbPY672');
// PRECIO DE AEROCOIN
const Grupos = db672.define('grupos', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	lecciones_semanales: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	dia_horario: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	fecha_inicio: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	/*fecha_finalizacion: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},*/
	estado: {
		type: DataTypes.STRING(200),
		allowNull: false,
		defaultValue: 'En Apertura'
	},
});

module.exports = Grupos;